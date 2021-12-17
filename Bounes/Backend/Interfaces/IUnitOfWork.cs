using System;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<TModel> Repo<TModel>() where TModel : class;
        Task<bool> CompleteAsync();
        bool Complete();
    }

}