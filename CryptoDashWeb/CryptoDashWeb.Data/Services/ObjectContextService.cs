using CryptoDashWeb.Data.DBContext;
using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Data.Services
{
    public class ObjectContextService : CryptoDashContextServiceBase
    {
        public ObjectContextService(CryptoDashContext context) : base(context)
        {
        }

        public async Task<ObjectModel> Get(int id)
        {
            var entity = await _context.ObjectEntities.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null)
                return new();
            return new ObjectModel(entity);
        }

        public async Task<List<ObjectModel>> Get(List<int> ids)
        {
            return await _context.ObjectEntities.AsNoTracking().Where(x => ids.Contains(x.Id)).Select(x => new ObjectModel(x)).ToListAsync();
        }

        public async Task<List<ObjectModel>> GetAll()
        {
            return await _context.ObjectEntities.AsNoTracking().Select(x => new ObjectModel(x)).ToListAsync();
        }

        public async Task<List<ObjectModel>> GetByClass(int classCode)
        {
            return await _context.ObjectEntities.AsNoTracking().Where(x => x.ClassCode == classCode).Select(x => new ObjectModel(x)).ToListAsync();
        }

        public async Task<List<ObjectModel>> GetByClass(List<int> classCodes)
        {
            return await _context.ObjectEntities.AsNoTracking().Where(x => classCodes.Contains(x.ClassCode)).Select(x => new ObjectModel(x)).ToListAsync();
        }

        public async Task<Dictionary<string, ObjectModel>> GetDictByName(List<string> names)
        {
            return await _context.ObjectEntities.AsNoTracking().Where(x => names.Contains(x.Name)).Select(x => new ObjectModel(x)).ToDictionaryAsync(x => x.Name, x => x);
        }


        public async Task<int> Save(ObjectModel model)
        {
            _context.ObjectEntities.Update(new DBModels.ObjectEntity() { Id = model.Id, ClassCode = (int)model.ClassCode, DisplayName = model.DisplayName, Name = model.Name });
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Save(List<ObjectModel> models)
        {
            var entities = models.Select(model => new DBModels.ObjectEntity() { Id = model.Id, ClassCode = (int)model.ClassCode, DisplayName = model.DisplayName, Name = model.Name });
            return await Save(entities);
        }

        public async Task<int> Save(IEnumerable<ObjectEntity> entities)
        {
            await _context.BulkInsertOrUpdateAsync(entities);
            return await _context.SaveChangesAsync();
        }
    }
}
