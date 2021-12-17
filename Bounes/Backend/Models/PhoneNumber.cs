using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class PhoneNumber : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Number { get; set; }
        public int ContactId {get; set;}
        public Contact Contact {get; set;}
        
    }
}