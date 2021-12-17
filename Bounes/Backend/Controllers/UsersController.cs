using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using AutoMapper;
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Backend.Models;
using Microsoft.Extensions.Configuration;
// using static Backend.Services.EmailService;
using System.Web;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ISendService _emailService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signinManager;
        private readonly IAuthRepo _authRepo;
        private readonly IMapper _mapper;
        private readonly ILogger<User> _logger;
        private readonly IUnitOfWork _uow;

        public UsersController(IConfiguration config, ISendService emailService, UserManager<User> userManager, SignInManager<User> signInManager, IAuthRepo authRepo, IMapper mapper, ILogger<User> logger, IUnitOfWork uow)
        {
            _config = config;
            _emailService = emailService;
            _userManager = userManager;
            _signinManager = signInManager;
            _authRepo = authRepo;
            _mapper = mapper;
            _logger = logger;
            _uow = uow;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(UserRegister register)
        {
            var checkIfEmail = IsValidEmail(register.Email);
            if (!checkIfEmail)
            {
                return BadRequest("Invalid email");
            }
            var doesExit = await _userManager.FindByEmailAsync(register.Email);
            if (doesExit != null)
            {
                return BadRequest("User is already registed");
            }

            // var doesExitPhone = await _uow.Repo<User>().FindAsync(u => u.PhoneNumber == register.PhoneNumber);

            // if (doesExitPhone.Success)
            // {
            //     return BadRequest("A User with this phone number is already registed");
            // }
            try
            {
                User user = new() { UserName = register.Email, Email = register.Email, PhoneNumber = register.PhoneNumber };

                var result = await _userManager.CreateAsync(user, register.Password);

                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
                var createdUser = await _userManager.FindByEmailAsync(user.Email);
                var verificationToken = await _userManager.GenerateEmailConfirmationTokenAsync(createdUser);


                ConfirmEmailDto dto = new() {Email=register.Email, Token=verificationToken} ;
                var confirmUrl = Url.Action("confirmEmail","users", dto, Request.Scheme);
                await _emailService.SendVerificationEmailTemplate(register.Email, confirmUrl);

                return Ok(new { Email = register.Email, PhoneNumber = register.PhoneNumber });

            }
            catch (Exception ex)
            {
                _logger.LogError("An Error Occurred while trying to register user. Message: {message}", ex.Message);
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpGet("confirmEmail")]
        public async Task<ActionResult> ConfirmEmail([FromQuery] ConfirmEmailDto confirmEmailDto) 
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(confirmEmailDto.Email);
                if (user != null)
                {
                    _logger.LogInformation("User with email: {0} is trying confirming his email ", user.Email);
                    var confirmEmail = await _userManager.ConfirmEmailAsync(user, confirmEmailDto.Token);
                    if(!confirmEmail.Succeeded)
                    {
                        List<IdentityError> errors = confirmEmail.Errors.ToList();
                        _logger.LogError("Not Confirmed. Error: {Error}", errors[0].Code);
                        return BadRequest("Invalid Token");
                    }

                    try
                    {
                        _logger.LogInformation("Email: {0} is Now Confirmed", user.Email);

                        return Ok();
                    }
                    catch (Exception ex)
                    {
                        _logger.LogInformation("Email: {0} is Now Confirmed", user.Email);
                        _logger.LogError("error in uri: {Error}", ex.Message);
                        return Ok();
                    }
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError("An Error occurred: ", ex.Message);
                return NotFound();
            }
        }

        [HttpPost("reconfirm")]
        public async Task<ActionResult> ReconfirmEmail(ReconfirmEmailDto reconfirmEmailDto) 
        {
            try
            {
                _logger.LogInformation(reconfirmEmailDto.Email);
                var user = await _userManager.FindByEmailAsync(reconfirmEmailDto.Email);
                if (user == null)
                {
                    return NotFound();
                }

                _logger.LogInformation("User with email: {0} is trying reconfirming his email ", user.Email);
                 var newToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                ConfirmEmailDto dto = new() {Email=reconfirmEmailDto.Email, Token=newToken};

                var confirmUrl = Url.Action("confirmEmail","users", dto, Request.Scheme);
                await _emailService.SendVerificationEmailTemplate(reconfirmEmailDto.Email, confirmUrl);
                 try
                 {
                     _logger.LogInformation("Email: {0} is Now Confirmed", user.Email);
                    return Ok();
                 }
                 catch (Exception ex)
                 {
                     _logger.LogInformation("Email: {0} is Now Confirmed", user.Email);
                     _logger.LogError("error in uri", ex.Message);
                      return Redirect("/");
                 }
            }
            catch (Exception ex)
            {
                _logger.LogError("An Error occured: ", ex.Message);
                return NotFound();
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLogin login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user != null)
            {
                //if (user.EmailConfirmed == false)
                //{
                //    _logger.LogError("user email is not verified. email: {email}", user.Email);
                //    return BadRequest("please verify you email");
                //}
                //sign in 
                var result = await _signinManager.PasswordSignInAsync(user, login.Password, false, false);

                if (result.Succeeded)
                {
                    var isCommittee = await _userManager.IsInRoleAsync(user, "Committee");

                    if (isCommittee)
                    {
                        if(user.ChangePassword)
                        {
                            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
                            _logger.LogInformation("User Committee with email: {0} has to change thier password ", user.Email);
                            return Ok(new { Email = user.Email, ResetToken = resetToken, Committee = isCommittee, ChangePassword = user.ChangePassword });
                        } else
                        {
                            var token = await _authRepo.GenerateToken(user);
                            _logger.LogInformation("User Admin with email: {0} is logged in ", user.Email);
                            return Ok(new { Email = user.Email, Token = token, Committee = isCommittee, ChangePassword = user.ChangePassword });
                        }
                    }
                    else
                    {
                        var token = await _authRepo.GenerateToken(user);
                        _logger.LogInformation("User with email: {0} is logged in ", user.Email);
                        return Ok(new { Email = user.Email, PhoneNumber = user.PhoneNumber, Token = token });
                    }
                }
                else
                {
                    return Unauthorized();
                }

             }
             return NotFound();



        }
        [HttpPost("forgotpassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        {   
             var isEmail = IsValidEmail(forgotPasswordDto.Email);
             if (!isEmail)
             {
                 return BadRequest("this is not an email address");
             }
            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
            if (user != null)
            {
                // send token in email 
                var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
                
                _logger.LogWarning("User reset Password request");
                PasswordRestDto dto = new() {Email= forgotPasswordDto.Email, Token= resetToken};
                 string urlString = _config["baseUrl"]+ $"newPassword?email={dto.Email}&token={dto.Token}" ;

                Uri url = new(urlString);
                await _emailService.SendRestPasswordEmailTemplate(forgotPasswordDto.Email , url.ToString());

                return Ok();
             }
            return Ok();
        }
        
        [HttpPost("restpassword")]
        public async Task<IActionResult> PasswordRest(PasswordRestDto passwordRestDto)
        {
            var user = await _userManager.FindByEmailAsync(passwordRestDto.Email);
            if (user != null)
            {   
                var tokenNormal = passwordRestDto.Token.Replace(" ","+");
                var resetToken = await _userManager.ResetPasswordAsync(user, tokenNormal, passwordRestDto.NewPassword);
                if (!resetToken.Succeeded)
                {
                    List<IdentityError> errors = resetToken.Errors.ToList();
                   _logger.LogError("error reseting password: ", errors[0].Code);
                    return BadRequest();
                }
                try
                {
                    user.EmailConfirmed = true;
                    user.ChangePassword = false;
                     var updateUser = await _userManager.UpdateAsync(user);
                     if (!updateUser.Succeeded)
                     {
                         List<IdentityError> errors = updateUser.Errors.ToList();
                         _logger.LogError("Couldn't confirm email: {error}", errors[0].Code);
                     }
                    _logger.LogInformation("User with email: {0} resetted his password ", user.Email);
                    Uri redirectUri = new(_config["baseUrl"]+"login");
                    return Ok(redirectUri.ToString());
                }
                catch (System.Exception)
                {
                    _logger.LogError("with converting string to url");
                   return Redirect("/");
                }
            }
            return Ok();
        }

        public class UserLogin
        {
            [Required]
            public string Email { get; set; }
            [Required]
            public string Password { get; set; }

        }
        public class UserRegister
        {
            [Required]
            public string Email { get; set; }
            [Required]
            public string Password { get; set; }
            [Required]
            public string PhoneNumber { get; set; }

        }

        private bool IsValidEmail(string email)
        {
            if (email.Trim().EndsWith("."))
            {
                return false; 
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }

    public class ForgotPasswordDto
    {
        [Required]
        public string Email { get; set; }
    } 
    public class PasswordRestDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required]
        public string Token { get; set; }
    }
    public class ConfirmEmailDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Token { get; set; }
    }
    public class ReconfirmEmailDto 
    {
        [Required]
        public string Email { get; set; }
    }
}