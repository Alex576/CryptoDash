using CryptoDashWeb.Data.DBContext;
using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Data.Services
{
    public class CoinHistoryContext : CryptoDashContextServiceBase
    {
        public CoinHistoryContext(CryptoDashContext context) : base(context)
        {
        }

        public async Task<List<CoinHistoryModel>> GetCoinHistory(DateTime from, DateTime to, int coinId)
        {
            return await _context.CoinHistories.Where(x => x.ObjectId == coinId && x.Date >= from && x.Date <= to).Select(x => new CoinHistoryModel(x)).ToListAsync();
        }

        public async Task Save(List<CoinHistoryModel> coinHistoryModels, DateTime from, DateTime to)
        {
            var objIds = coinHistoryModels.Select(x => x.ObjectId).Distinct().ToList();
            var savedEntities = await _context.CoinHistories.Where(x => objIds.Contains(x.ObjectId) && x.Date >= from && x.Date <= to).ToDictionaryAsync(x => x.Date, x => x);
            var insert = new List<CoinHistory>();
            var update = new List<CoinHistory>();
            foreach (var coinHistoryModel in coinHistoryModels)
            {
                if (savedEntities.TryGetValue(coinHistoryModel.Date, out var savedHistory))
                {
                    savedHistory.HistoryData = coinHistoryModel.HistoryData;
                    update.Add(savedHistory);
                }
                else
                {
                    insert.Add(new CoinHistory()
                    {
                        ObjectId = coinHistoryModel.ObjectId,
                        Date = coinHistoryModel.Date,
                        HistoryData = coinHistoryModel.HistoryData,
                    });
                }
            }
            _context.CoinHistories.AddRange(insert);
            _context.CoinHistories.UpdateRange(update);
            await _context.SaveChangesAsync();
            //var ids = new List<int>(coinHistoryModels.Count);

            //var objectIds = new List<int>(coinHistoryModels.Count);
            //var dateTimes = new List<DateTime>(coinHistoryModels.Count);
            //var historyData = new List<CoinPriceHistoryData>(coinHistoryModels.Count);
            //foreach (var data in coinHistoryModels)
            //{
            //    //ids.Add(data.Id);
            //    objectIds.Add(data.ObjectId);
            //    dateTimes.Add(data.Date);
            //    historyData.Add(data.HistoryData);
            //}
            ////var = entities.Select(x => x.Id).ToList();
            //var tableEntity = GetTable(typeof(CoinHistory));
            //var tableName = GetTableName(tableEntity);
            ////var idColumnName = GetColumnName(tableEntity, nameof(CoinHistory.Id));
            //var objectColumnName = GetColumnName(tableEntity, nameof(CoinHistory.ObjectId));
            //var dateColumnName = GetColumnName(tableEntity, nameof(CoinHistory.Date));

            //var entityType = _context.Model.FindEntityType(typeof(CoinHistory));
            //// 4. НАВИГАЦИЯ: Находим Owned-сущность, скрытую за .ToJson()
            //var navigation = entityType.FindNavigation(nameof(CoinHistory.HistoryData));
            //var ownedEntityType = navigation?.TargetEntityType;
            //// 5. ИМЯ JSON-КОЛОНКИ: В последних EF Core метод не требует параметров!
            //string historyDataColumnName = ownedEntityType?.GetContainerColumnName() ?? "history_data";

            //var sql = $@"
            //    INSERT INTO {tableName} ({objectColumnName}, {dateColumnName}, {historyDataColumnName})
            //    SELECT * FROM UNNEST({{0}}, {{1}}, {{2}}) 
            //    ON CONFLICT ({objectColumnName}) 
            //    DO UPDATE SET {historyDataColumnName} = EXCLUDED.{historyDataColumnName};
            //    ";
            //await _context.Database.ExecuteSqlRawAsync(sql, objectIds, dateTimes, historyData);// todo fix!!!!!!!!

            //var entities = coinHistoryModels.Select(x => new CoinHistory() { Id = x.Id, Date = x.Date, ObjectId = x.ObjectId, HistoryData = x.HistoryData }).ToList();
            //await _context.BulkInsertOrUpdateAsync(entities);
        }
    }
}
