using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Base;
using Backend.Interfaces;
using Backend.Models;

namespace Backend.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private Dictionary<string, dynamic> _repositories = new();


        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public bool Complete()
        {
            return _context.SaveChanges() >= 0;
        }

        public async Task<bool> CompleteAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }

        public IRepository<TModel> Repo<TModel>() where TModel : class
        {
            if (_repositories.ContainsKey(typeof(TModel).Name) == true)
            {
                return _repositories[typeof(TModel).Name] as IRepository<TModel>;
            }
            IRepository<TModel> repo = new BaseRepo<TModel>(_context);
            _repositories.Add(typeof(TModel).Name, repo);
            return repo;
        }
    }
}