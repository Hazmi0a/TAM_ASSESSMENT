using System;
using System.Threading.Tasks;
using Backend.Models;
using static Backend.Services.EmailService;

namespace Backend.Interfaces
{
    public interface ISendService
    {
        Task<bool> SendEmailApplicationTemplateGrid(string toEmail, string subject = "Successful Submission Email");
        Task<bool> SendRestPasswordEmailTemplate(string toEmail, string restToken, string subject = "Forget Password Email");
        Task<bool> SendVerificationEmailTemplate(string toEmail, string token, string subject = "Email Verification");
        bool IsValidEmail(string email);
    }
}
