using CryptoDashWeb.Data.DBContext;
using CryptoDashWeb.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Data.Services
{
    public class ClassContextService : CryptoDashContextServiceBase
    {
        public ClassContextService(CryptoDashContext context) : base(context)
        {
        }

        public async Task<ClassModel> Get(int id)
        {
            var entity = await _context.ClassEntities.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null)
                return new();
            return new ClassModel() { Id = entity.Id, Name = entity.Name };
        }

        public async Task<List<ClassModel>> Get(List<int> ids)
        {
            return await _context.ClassEntities.AsNoTracking().Where(x => ids.Contains(x.Id)).Select(x => new ClassModel() { Id = x.Id, Name = x.Name }).ToListAsync();
        }

        public async Task<List<ClassModel>> GetAll()
        {
            return await _context.ClassEntities.AsNoTracking().Select(x => new ClassModel() { Id = x.Id, Name = x.Name }).ToListAsync();
        }

        public async Task<int> Save(ClassModel model)
        {
            _context.ClassEntities.Update(new DBModels.ClassEntity() { Id = model.Id, Name = model.Name });
            return await _context.SaveChangesAsync();
        }
    }
}
