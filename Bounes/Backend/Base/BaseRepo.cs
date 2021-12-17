using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using System.Linq.Expressions;
using Backend.Utils;

namespace Backend.Base
{
    public class BaseRepo<TModel> : IRepository<TModel>
       where TModel : class
    {
        protected readonly AppDbContext _context;
        //private readonly DbSet<TModel> _table;

        public BaseRepo(AppDbContext context)
        {
            _context = context;
            //_table = _context.Set<TModel>();
        }
        public virtual Response<TModel> Create(TModel model)
        {
            /*if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            _context.Set<TModel>().Add(model);*/

            try
            {
                _context.Set<TModel>().Add(model);
                return new Response<TModel>(model);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new Response<TModel>($"An error occurred when saving: {ex.Message}");
            }
        }

        public virtual async Task<Response<TModel>> CreateAsync(TModel model)
        {
            /* if (model == null)
             {
                 throw new ArgumentNullException(nameof(model));
             }
             await _context.Set<TModel>().AddAsync(model);
             await Task.CompletedTask;*/

            try
            {
                await _context.Set<TModel>().AddAsync(model);
                return new Response<TModel>(model);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                System.Console.WriteLine($"ERROR MESSAGE: {ex.Message}");
                return new Response<TModel>($"An error occurred when saving: {ex.Message}");
            }
        }
        public virtual Response<TModel> CreateRange(IEnumerable<TModel> models)
        {
            try
            {
                _context.Set<TModel>().AddRange(models);
                return new Response<TModel>(models);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new Response<TModel>($"An error occurred when saving: {ex.Message}");
            }
        }
        public virtual async Task<Response<TModel>> CreateRangeAsync(IEnumerable<TModel> models)
        {
            try
            {
                await _context.Set<TModel>().AddRangeAsync(models);
                return new Response<TModel>(models);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new Response<TModel>($"An error occurred when saving: {ex.Message}");
            }
        }

        public virtual Response<TModel> Delete(TModel model)
        {
            /* if (model == null)
            {
                 throw new ArgumentNullException(nameof(model));
             }
             _context.Set<TModel>().Remove(model);*/
            try
            {
                _context.Set<TModel>().Remove(model);
                return new Response<TModel>(model);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new Response<TModel>($"An error occurred when deleting: {ex.Message}");
            }
        }

        public virtual async Task<Response<TModel>> DeleteAsync(TModel model)
        {
            /* if (model == null)
             {
                 throw new ArgumentNullException(nameof(model));
             }
             _context.Set<TModel>().Remove(model);
             await Task.CompletedTask;*/
            try
            {
                _context.Set<TModel>().Remove(model);
                await Task.CompletedTask;
                return new Response<TModel>(model);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new Response<TModel>($"An error occurred when deleting: {ex.Message}");
            }
        }

        public virtual Response<TModel> DeleteRange(IEnumerable<TModel> models)
        {
            try
            {
                _context.Set<TModel>().RemoveRange(models);
                return new Response<TModel>(models);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new Response<TModel>($"An error occurred when deleting: {ex.Message}");
            }
        }

        public virtual async Task<Response<TModel>> DeleteRangeAsync(IEnumerable<TModel> models)
        {
            try
            {
                _context.Set<TModel>().RemoveRange(models);
                await Task.CompletedTask;
                return new Response<TModel>(models);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new Response<TModel>($"An error occurred when deleting: {ex.Message}");
            }
        }
        public virtual Response<TModel> Find(Expression<Func<TModel, bool>> predicate)
        {
            try
            {
                var result = _context.Set<TModel>().Where(predicate).ToList();
                return new Response<TModel>(result);
            }
            catch (Exception ex)
            {
                return new Response<TModel>($"An error occurred when searching: {ex.Message}");
            }
        }
        public virtual async Task<Response<TModel>> FindAsync(Expression<Func<TModel, bool>> predicate)
        {
            try
            {
                var result = await _context.Set<TModel>().Where(predicate).ToListAsync();
                if (result.Count == 0)
                {
                    return new Response<TModel>("Not Found");
                }
                return new Response<TModel>(result);
            }
            catch (Exception ex)
            {
                return new Response<TModel>($"An error occurred when searching: {ex.Message}");
            }
        }

        public async Task<Response<TModel>> FindSingleAsync(Expression<Func<TModel, bool>> predicate)
        {
            try
            {
                var result = await _context.Set<TModel>().Where(predicate).FirstAsync();
                if (result == null)
                {
                    return new Response<TModel>("Not Found");
                }
                return new Response<TModel>(result);
            }
            catch (Exception ex)
            {
                return new Response<TModel>($"An error occurred when searching: {ex.Message}");
            }
        }

        // TODO: add response as signture & try catch
        public virtual IEnumerable<TModel> GetAll()
        {
            return _context.Set<TModel>().ToList();
        }

        public virtual IEnumerable<TModel> GetAll(int pageIndex, int pageSize = 20)
        {
            try
            {
                return _context.Set<TModel>()
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                return null;
            }
        }

        // TODO: add response as signture & try catch
        public virtual async Task<IEnumerable<TModel>> GetAllAsync()
        {
            return await _context.Set<TModel>().ToListAsync();
        }

        public virtual async Task<Response<TModel>> GetAllAsync(int pageIndex, int pageSize = 20)
        {
            try
            {
                var result = await _context.Set<TModel>()
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
                if (result.Count == 0)
                {
                    return new Response<TModel>(Strings.NoResouces);
                }
                return new Response<TModel>(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        // TODO: add response as signture & try catch
        public virtual TModel GetById(int id)
        {
            return _context.Set<TModel>().Find(id);
        }
        // TODO: add response as signture & try catch
        public TModel GetById(Guid id)
        {
            return _context.Set<TModel>().Find(id);
        }
        // TODO: add response as signture & try catch
        public virtual async Task<Response<TModel>> GetByIdAsync(int id)
        {
            var model = await _context.Set<TModel>().FindAsync(id);
            if (model == null)
            {
                return new Response<TModel>("Resource Not Found");
            }

            return new Response<TModel>(model);
        }
        // TODO: add response as signture & try catch
        public virtual async Task<Response<TModel>> GetByIdAsync(Guid id)
        {
            var model = await _context.Set<TModel>().FindAsync(id);
            if (model == null)
            {
                return new Response<TModel>("Resource Not Found");
            }

            return new Response<TModel>(model);
        }
        // TODO: add response as signture & try catch
        public virtual int GetCount()
        {
            return _context.Set<TModel>().ToList().Count;
        }
        // TODO: add response as signture & try catch
        public virtual async Task<int> GetCountAsync()
        {
            var list = await _context.Set<TModel>().ToListAsync();
            return list.Count;
        }

        public virtual bool SaveChanges()
        {
            //if saved return true
            return _context.SaveChanges() >= 0;
        }

        public virtual async Task<bool> SaveChangesAsync()
        {
            //if saved return true
            return await _context.SaveChangesAsync() >= 0;
        }

        public virtual Response<TModel> Update(TModel model)
        {
            try
            {
                return new Response<TModel>(model);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new Response<TModel>($"An error occurred when updating: {ex.Message}");
            }
        }

        public virtual async Task<Response<TModel>> UpdateAsync(TModel model)
        {
            try
            {
                await Task.CompletedTask;
                return new Response<TModel>(model);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new Response<TModel>($"An error occurred when updating: {ex.Message}");
            }
        }
    }
}
