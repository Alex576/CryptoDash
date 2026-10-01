using CryptoDashWeb.Data.DBContext;
using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CryptoDashWeb.Data.Services
{
    public class TileItemContextService : CryptoDashContextServiceBase
    {
        private readonly ILogger<TileItemContextService> _logger;

        public TileItemContextService(CryptoDashContext context, ILogger<TileItemContextService> logger) : base(context)
        {
            _logger = logger;
        }

        public async Task<Tile?> Get(TileCode tileCode)
        {
            var tile = await _context.Tiles.FirstOrDefaultAsync(x => x.Id == (int)tileCode);
            if (tile == null)
                _logger.LogError($"Failed to find Tile with id = {(int)tileCode}");
            return tile;
        }

        public async Task<Tile?> GetFilterTile(ToolCode toolCode)
        {
            var root = await _context.Tiles.FirstOrDefaultAsync(x => x.ToolCode == (int)toolCode);
            if (root == null)
            {
                _logger.LogError($"Failed to find Tile with tool = {toolCode}");
                return null;
            }
            return await _context.Tiles.FirstOrDefaultAsync(x => x.ParentId == root.Id && x.TypeCode == (int)TileTypeCode.Filter);
        }

        /// <summary>
        /// Result contains loaded Layout.
        /// </summary>
        /// <param name="toolCode"></param>
        /// <returns></returns>
        public async Task<List<Tile>> GetFullLayout(ToolCode toolCode)
        {
            var tableEntity = GetTable(typeof(Tile));
            var tableName = GetTableName(tableEntity);
            var toolCodeColumnName = GetColumnName(tableEntity, nameof(Tile.ToolCode));
            var parentIdColumnName = GetColumnName(tableEntity, nameof(Tile.ParentId));
            var idColumnName = GetColumnName(tableEntity, nameof(Tile.Id));

            var sql = $"""
                WITH RECURSIVE TileTree AS (
                    SELECT * FROM {tableName} 
                    WHERE {toolCodeColumnName} = {(int)toolCode}
            
                    UNION ALL
            
                    SELECT c.* FROM {tableName} c
                    INNER JOIN TileTree ct ON c.{parentIdColumnName} = ct.{idColumnName}
                    )
                SELECT * FROM TileTree
            """;
            return await _context.Tiles.FromSqlRaw(sql).Include(x => x.Layout).ToListAsync();
        }

        public async Task<Tile?> GetTile(ToolCode? toolCode, TileTypeCode tileTypeCode)
        {
            var tile = await _context.Tiles.FirstOrDefaultAsync(x => x.ToolCode == (int?)toolCode && x.TypeCode == (int)tileTypeCode);
            return tile;
        }
    }
}
