using CryptoDashWeb.Data.DBContext;
using CryptoDashWeb.Data.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CryptoDashWeb.Data.Services
{
    public abstract class CryptoDashContextServiceBase
    {
        protected readonly CryptoDashContext _context;

        public CryptoDashContextServiceBase(CryptoDashContext context)
        {
            _context = context;
        }

        protected IEntityType GetTable(Type tableType) =>
            _context.Model.FindEntityType(tableType) ?? throw new DataBaseException($"Not found table entity by type = {nameof(tableType)}");
        protected string GetTableName(IEntityType tableEntity) => $"{tableEntity.GetSchema()}.{tableEntity.GetTableName()}";

        protected string GetColumnName(IEntityType tableEntity, string propertyName) =>
            tableEntity.FindProperty(propertyName)?.GetColumnName() ?? throw new DataBaseException($"Not found property = {propertyName} in table = {tableEntity.GetTableName()}");
    }
}
