using System;
using System.IO;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Backend.Services
{
    public interface IEmailService
    {
        void Send(string to);
    }

    public class EmailService : ISendService
    {
        private const string templatePath = @"Templates/{0}.html";
        private  string sendGridApplicationTemplate = "";
        private  string sendGridRestPasswordTemplate = "";
        private  string sendGridNewRegisterTemplate = "";
        private readonly SMTPConfigModel _smtpConfig;
        private readonly ILogger<SMTPConfigModel> _logger;
        private readonly IConfiguration _config;
        //private readonly const string = ""
        public EmailService(IOptions<SMTPConfigModel> smtpConfig, ILogger<SMTPConfigModel> logger, IConfiguration config)
        {
            _smtpConfig = smtpConfig.Value;
            _logger = logger;
            _config = config;

            sendGridApplicationTemplate = _config["SendGridTemplates:SendGridApplicationTemplate"];
            sendGridRestPasswordTemplate = _config["SendGridTemplates:SendGridRestPasswordTemplate"];
            sendGridNewRegisterTemplate = _config["SendGridTemplates:SendGridNewRegisterTemplate"];
        }


        private async Task<bool> SendEmailGrid(string toEmail)
        {
            try
            {

                var apiKey = _config["SENDGRID_API_KEY"];
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress("email@test.com", "title");
                var subject = "Successful Submission";
                var to = new EmailAddress(toEmail);
                var plainTextContent = "and easy to do anywhere, even with C#";
                var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var response = await client.SendEmailAsync(msg);
                if (!response.IsSuccessStatusCode)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not send email; ", ex.Message);
                return false;
            }
        }
        public async Task<bool> SendEmailApplicationTemplateGrid(string toEmail, string subject = "Successful Submission Email")
        {
            try
            {
                var apiKey = _config["SENDGRID_API_KEY"];
                var client = new SendGridClient(apiKey);
                var msg = new SendGridMessage();
                msg.SetFrom(new EmailAddress("email@test.com"));
                msg.AddTo(new EmailAddress(toEmail));
                msg.SetTemplateId(sendGridApplicationTemplate);

                ApplicationSubmissionEmail dynamicTemplateData = new() {Subject=subject};
                msg.SetTemplateData(dynamicTemplateData);

                var response = await client.SendEmailAsync(msg);
                if (!response.IsSuccessStatusCode)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not send email;", ex.Message);
                return false;
            }
        }
        public async Task<bool> SendRestPasswordEmailTemplate(string toEmail, string url, string subject = "Forget Password Email")
        {
            try
            {
                var apiKey = _config["SENDGRID_API_KEY"];
                var client = new SendGridClient(apiKey);
                var msg = new SendGridMessage();
                msg.SetFrom(new EmailAddress("email@test.com"));
                msg.AddTo(new EmailAddress(toEmail));
                msg.SetTemplateId(sendGridRestPasswordTemplate);

                ForgotPasswordTemp dynamicTemplateData = new() {Url= url, Subject=subject};
                msg.SetTemplateData(dynamicTemplateData);

                var response = await client.SendEmailAsync(msg);
                if (!response.IsSuccessStatusCode)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not send email;", ex.Message);
                return false;
            }
        }
        public async Task<bool> SendVerificationEmailTemplate(string toEmail, string url, string subject = "Verification Email")
        {
            try
            {
                var apiKey = _config["SENDGRID_API_KEY"];
                var client = new SendGridClient(apiKey);
                var msg = new SendGridMessage();
                msg.SetFrom(new EmailAddress("email@test.com"));
                msg.AddTo(new EmailAddress(toEmail));
                msg.SetTemplateId(sendGridNewRegisterTemplate);

                
                EmailVerificationTemp dynamicTemplateData = new() {Url= url, Subject=subject};
                msg.SetTemplateData(dynamicTemplateData);

                var response = await client.SendEmailAsync(msg);
                if (!response.IsSuccessStatusCode)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not send email;", ex.Message);
                return false;
            }
        }
        public bool IsValidEmail(string email)
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

        private class EmailVerificationTemp
        {
            [JsonProperty("Url")]
            public string Url { get; set; }
            [JsonProperty("Subject")]
            public string Subject { get; set; }

        }
        
        private class ForgotPasswordTemp
        {
            [JsonProperty("Url")]
            public string Url { get; set; }
            [JsonProperty("Subject")]
            public string Subject { get; set; }

        }
         private class ApplicationSubmissionEmail
    {
         [JsonProperty("Subject")]
            public string Subject { get; set; }
    }
    }

    
}