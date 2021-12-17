using System;
using Backend.Base;
using Backend.Models;

namespace Backend.Data
{
    public class UserRepo : BaseRepo<User>
    {
        public UserRepo(AppDbContext context) : base(context)
        {
        }
    }
}
