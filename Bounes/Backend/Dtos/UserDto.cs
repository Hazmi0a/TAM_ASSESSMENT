using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Models;

namespace Backend.Dtos
{
    public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class UserLoggedInDto
    {
        public UserReadDto User { get; set; }
        public string AuthToken { get; set; }
    }

    public class UserReadDto
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }

    }
    public class UserCreateDto
    {
        [Required]
        [StringLength(100)]
        public string Firstname { get; set; }
        [Required]
        [StringLength(100)]
        public string Lastname { get; set; }
        [Required]
        [StringLength(255)]
        public string Password { get; set; }
        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        public override string ToString()
        {
            return "F: " + Firstname + " L: " + Lastname + " E: " + Email;
        }

    }
    public class UserUpdateDto
    {
        [Required]
        [StringLength(100)]
        public string Firstname { get; set; }
        [Required]
        [StringLength(100)]
        public string Lastname { get; set; }
        [Required]
        [StringLength(255)]
        public string Password { get; set; }
        [Required]
        [StringLength(100)]
        public string Email { get; set; }

    }
}