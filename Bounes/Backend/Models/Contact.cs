using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Contacts")]
    public class Contact : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string Lastname { get; set; }

        public List<PhoneNumber> PhoneNumbers { get; set; }
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

    }
}