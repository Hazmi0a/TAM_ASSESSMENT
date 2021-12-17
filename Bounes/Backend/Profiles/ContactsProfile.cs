using AutoMapper;
using Backend.Models;
using Backend.Dtos;

namespace Backend.Profiles
{
    public class ContactsProfile : Profile
    {
        public ContactsProfile()
        {
            // Source -> Target
            // for PhoneNumber
            CreateMap<PhoneNumber, PhoneNumberReadDto>();
            // .ForMember(dto => dto.Contact, conf => conf.MapFrom(ol => ol.Contact.Name));
            // CreateMap<PhoneNumber, PhoneNumberListDto>();
            CreateMap<PhoneNumberCreateDto, PhoneNumber>();
            // CreateMap<PhoneNumberUpdateDto, PhoneNumber>();
            // CreateMap<PhoneNumber, PhoneNumberUpdateDto>();

            // for Contacts
            CreateMap<Contact, ContactReadDto>();
            CreateMap<ContactCreateDto, Contact>();
            // CreateMap<ContactUpdateDto, Contact>();
            // CreateMap<Contact, ContactUpdateDto>();

        }
    }

}