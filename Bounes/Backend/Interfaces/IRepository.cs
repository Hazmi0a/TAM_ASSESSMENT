using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Backend.Dtos;

namespace Backend.Interfaces
{
    public interface IRepository<TModel>
        where TModel : class
    {
        Task<bool> SaveChangesAsync();
        bool SaveChanges();
        Task<IEnumerable<TModel>> GetAllAsync();
        IEnumerable<TModel> GetAll();
        Task<Response<TModel>> GetAllAsync(int pageIndex, int pageSize);
        IEnumerable<TModel> GetAll(int pageIndex, int pageSize);
        Task<Response<TModel>> GetByIdAsync(int id);
        TModel GetById(int id);
        //Task<TModel> GetByIdAsync(Guid id);
        Task<Response<TModel>> GetByIdAsync(Guid id);
        TModel GetById(Guid id);
        Task<Response<TModel>> CreateAsync(TModel model);
        Task<Response<TModel>> CreateRangeAsync(IEnumerable<TModel> models);
        Response<TModel> Create(TModel model);
        Response<TModel> CreateRange(IEnumerable<TModel> models);
        Task<Response<TModel>> UpdateAsync(TModel model);
        Response<TModel> Update(TModel model);
        Task<Response<TModel>> DeleteAsync(TModel model);
        Task<Response<TModel>> DeleteRangeAsync(IEnumerable<TModel> models);
        Response<TModel> Delete(TModel model);
        Response<TModel> DeleteRange(IEnumerable<TModel> models);
        Task<int> GetCountAsync();
        int GetCount();
        Task<Response<TModel>> FindAsync(Expression<Func<TModel, bool>> predicate);
        Task<Response<TModel>> FindSingleAsync(Expression<Func<TModel, bool>> predicate);
        Response<TModel> Find(Expression<Func<TModel, bool>> predicate);
    }
}
