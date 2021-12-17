using AutoMapper;
using Backend.Dtos;
using Backend.Models;

namespace Backend.Profiles
{
    public class UserProfile : Profile
    {

        public UserProfile()
        {
            // Source -> Target
            // for User
            CreateMap<User, UserReadDto>();
            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<User, UserUpdateDto>();
            CreateMap<User, UserLoginDto>();
            CreateMap<UserReadDto, UserLoginDto>();
        }
    }
}
