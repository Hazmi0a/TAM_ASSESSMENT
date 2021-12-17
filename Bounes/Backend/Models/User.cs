using System;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models
{
    public class User : IdentityUser
    {
        public bool ChangePassword { get; set; } = true;
    }
}
