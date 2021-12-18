using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Backend.Utils;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers 
{
   [Route("api/[controller]")]
    [ApiController]
    public class ContactsController: ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly ILogger<User> _logger;
        private readonly IUnitOfWork _uow;
        public ContactsController( IMapper mapper, ILogger<User> logger, IUnitOfWork uow)
        {
            _mapper = mapper;
            _logger = logger;
            _uow = uow;
        }

        // GET api/Model All Model
        // [Authorize]
        [HttpGet("userId/{userId}")]
        public async Task<ActionResult<IEnumerable<ContactReadDto>>> GetAllForUser(string userId)
        {
            _logger.LogInformation(LogEvents.ListResourses, Strings.ListingResources);
            var result = await _uow.Repo<Contact>().FindAsync(c => c.UserId == userId);
            if (!result.Success)
            {
                
            }
            if (result.Models.Count() == 0) _logger.LogInformation(LogEvents.ListResourses, Strings.NoResouces);
            List<ContactReadDto> readDtos = new();
            foreach (var contact in result.Models)
            {
                var contModel = _mapper.Map<ContactReadDto>(contact);
                var phoneResults = await _uow.Repo<PhoneNumber>().FindAsync(p => p.ContactId == contact.Id);
                List<string> phoneNumbers = new();
                foreach (var number in phoneResults.Models)
                {
                    contModel.PhoneNumbers.Add(number.Number);
                }
                readDtos.Add(contModel);
                
            }
            // make the repo get all usertypes to map it with Model 
            //Return a Maped the op to opDTO 
            return Ok(readDtos);
        }
        
        // GET api/Model/{id} One use with id
        //[Authorize]
        [HttpGet("{id}", Name = "[controller]/GetById")]
        public virtual async Task<ActionResult<ContactReadDto>> GetById(int id)
        {
            _logger.LogInformation(LogEvents.GetResourse, Strings.GettingResource(id), id);
            var result = await _uow.Repo<Contact>().GetByIdAsync(id);
            // if found return a user Dto
            if (!result.Success)
            {
                _logger.LogWarning(LogEvents.GetResourseNotFound, Strings.GettingResource(id, false), id);
                return NotFound();
            }

            var phoneNumbers = await _uow.Repo<PhoneNumber>().FindAsync(n => n.ContactId == id);
            if (!phoneNumbers.Success)
            {
                var readDtoWithoutNumbers = _mapper.Map<ContactReadDto>(result.Model);
                return Ok(readDtoWithoutNumbers);
            }
            List<string> numbers = new();
            foreach (var number in phoneNumbers.Models)
            {
                numbers.Add(number.Number);
            }
            // make the repo get user usertypes to map it with user 
            var readDto = _mapper.Map<ContactReadDto>(result.Model);
            readDto.PhoneNumbers = numbers;
            return Ok(readDto);
        }

        [HttpPost]
        public async Task<ActionResult> Create(ContactCreateDto contact)
        {
            _logger.LogInformation(LogEvents.CreateResourse, Strings.CreateResourse, contact);
            // Map user dto to use then create it in Db and save
            Contact newContact = new()
                {FirstName = contact.FirstName, Lastname = contact.Lastname, UserId = contact.UserId};
            try
            {
                var result = await _uow.Repo<Contact>().CreateAsync(newContact);
                if (!result.Success) return BadRequest(result.Message);
                await _uow.Repo<Contact>().SaveChangesAsync();
                
                foreach (var number in contact.PhoneNumbers)
                {
                    PhoneNumber newNumber = new() {Number = number, ContactId = result.Model.Id};
                    await _uow.Repo<PhoneNumber>().CreateAsync(newNumber);
                }
                await _uow.Repo<PhoneNumber>().SaveChangesAsync(); 
                // need to send new URI with response, so map user to TReadDto response 
                // then pass the id of it to nameof GetGroupById and pass it to response as well
                var ReadDto = _mapper.Map<ContactReadDto>(result.Model);
                // the route for the resource using the get by id action
                var route = this.ControllerContext.ActionDescriptor.ControllerName + "/GetById";
                return CreatedAtRoute(route, new { ReadDto.Id }, ReadDto);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error happend", ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPatch("{id}")]
        public virtual async Task<ActionResult> PartialUpdate(int id, JsonPatchDocument<ContactCreateDto> patchDoc)
        {
            _logger.LogInformation(LogEvents.UpdateResourse, Strings.UpdateResourse(id), id);
            var opModel = await _uow.Repo<Contact>().GetByIdAsync(id);
            if (opModel == null)
            {
                _logger.LogWarning(LogEvents.GetResourseNotFound, Strings.GettingResource(id, false), id);
                return NotFound();
            }

            // mapp TModel to user dto then try to apple the patch doc to it.
            var opToPatch = _mapper.Map<ContactCreateDto>(opModel);
            patchDoc.ApplyTo(opToPatch, ModelState);
            if (!TryValidateModel(opModel))
            {
                return ValidationProblem(ModelState);
            }

            // Map patched user to user which will update Db then save
            _mapper.Map(opToPatch, opModel);
            var result = await _uow.Repo<Contact>().UpdateAsync(opModel.Model);
            if (!result.Success) return BadRequest(result.Message);
            await _uow.Repo<Contact>().SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/s/{id}
        //[Authorize]
        [HttpDelete("{id}")]
        public virtual async Task<ActionResult> Delete(int id)
        {
            _logger.LogInformation(LogEvents.DeleteResourse, Strings.DeleteResourse(id), id);
            var result = await _uow.Repo<Contact>().GetByIdAsync(id);
            if (!result.Success)
            {
                _logger.LogWarning(LogEvents.GetResourseNotFound, Strings.GettingResource(id, false), id);
                return NotFound();
            }

            var resultDelete = await _uow.Repo<Contact>().DeleteAsync(result.Model);
            if (!resultDelete.Success) return BadRequest(resultDelete.Message);
            await _uow.Repo<Contact>().SaveChangesAsync();

            return NoContent();
        }
    }

}