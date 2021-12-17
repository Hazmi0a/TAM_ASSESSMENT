using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Backend.Interfaces
{
    public interface IAuthRepo
    {
        Task<string> GenerateToken(IdentityUser user);
    }
}
