using System;
namespace Backend.Data
{
    public interface IAuthenticationRepo<Tmodel, Tclaim>
    {
        string Authenticate(Tmodel model, Tclaim claims);
        string JWTToken(string claimEmail, Tmodel model);
    }
}
