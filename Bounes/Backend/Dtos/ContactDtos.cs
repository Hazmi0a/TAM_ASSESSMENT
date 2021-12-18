using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Backend.Base;

namespace Backend.Dtos 
{
    public class PhoneNumberReadDto : BaseDto
    {
        public override int Id { get; set; }
        public string Number { get; set; }
    }
    public class PhoneNumberCreateDto
    {
        [Required]
        public string Number { get; set; }
    }

    public class ContactReadDto : BaseDto
    {
        public override int Id { get; set; }
        public string FirstName { get; set; }
        public string Lastname { get; set; }

        public List<string> PhoneNumbers { get; set; } = new();
    }
    public class ContactCreateDto 
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required]
        public List<string> PhoneNumbers { get; set; }
        [Required]
        public string UserId { get; set; }
    }
}