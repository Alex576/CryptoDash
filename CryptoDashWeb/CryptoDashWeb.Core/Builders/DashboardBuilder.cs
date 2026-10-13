using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Dashboard;
using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
using CryptoDashWeb.Core.Models.Settings.LayoutEntities;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Data.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Builders
{
    public class DashboardBuilder
    {
        private readonly DashboardLayoutEntity _layout;

        public DashboardBuilder(DashboardLayoutEntity layout)
        {
            _layout = layout;
        }

        public List<DashboardItem> GetItems()
        {
            var items = new List<DashboardItem>();
            foreach (var item in _layout.Items)
            {
                var block = new DashboardItem()
                {
                    Id = item.Id,
                    Name = item.Name,
                    Type = item.Type,
                    Options = new DashboardItemOptions()
                    {
                        X = item.X,
                        Y = item.Y,
                        Cols = item.Width,
                        Rows = item.Height,
                    }
                };
                items.Add(block);
            }
            return items;

        }

        public async Task<DashboardItemData> GetDashboardData(DateRange range, DashboardItemLayout item, ObjectContextService objectContext,
            CoinHistoryContext coinHistoryContext, ICoingeckoService coingeckoService)
        {
            var data = new DashboardItemData();
            var objects = await objectContext.Get(item.ObjCodes);
            var currencyId = new Lazy<int>(() => objects.First(x => x.ClassCode == (int)ClassCode.Currency).Id);
            foreach (var coin in objects.Where(x => x.ClassCode == (int)ClassCode.Coin))
            {
                var histories = (await coinHistoryContext.GetCoinHistory(range.From, range.To, coin.Id)).OrderBy(x => x.Date).ToList();
                if (histories.Count > 0)
                {
                    var missingRanges = new List<DateRange>();
                    for (int i = 0; i < histories.Count - 1; i++)
                    {
                        var currentDate = histories[i].Date;
                        var nextDate = histories[i + 1].Date;
                        if ((nextDate - currentDate).TotalDays == 1)
                            nextDate = histories[i].Date;
                        else
                            missingRanges.Add(new DateRange(currentDate.AddDays(1), nextDate.AddDays(-1)));
                    }
                    await Parallel.ForEachAsync(missingRanges, new ParallelOptions() { MaxDegreeOfParallelism = 2 }, async (range, token) =>
                    {
                        histories.AddRange(await PullCoinHistoryData(range, coinHistoryContext, coingeckoService, currencyId.Value, coin));
                    });
                }
                else
                {
                    histories.AddRange(await PullCoinHistoryData(range, coinHistoryContext, coingeckoService, currencyId.Value, coin));
                }
                var series = new Series
                {
                    Type = "bar",
                    XKey = "date",
                    YKey = "coin"
                };
                data.Series.Add(series);

                foreach (var history in histories.OrderBy(x => x.Date))
                {
                    data.Data.Add(new Dictionary<string, object>() { { "date", history.Date }, { "coin", history.HistoryData.Prices.Values.First() } });
                }
            }
            return data;
        }

        private async Task<List<CoinHistoryModel>> PullCoinHistoryData(DateRange range, CoinHistoryContext coinHistoryContext, ICoingeckoService coingeckoService, int currencyId, ObjectModel coin)
        {
            var coinHistory = await coingeckoService.GetCoinHistory(coin.Id, currencyId, range.From, range.To);
            var historyModels = new List<CoinHistoryModel>();
            foreach (var price in coinHistory.Prices)
            {
                var historyData = new CoinPriceHistoryData();
                historyData.Prices.Add(price.Key, price.Value);
                if (coinHistory.MarketCaps.TryGetValue(price.Key, out var marketValue))
                    historyData.MarketCaps.Add(price.Key, marketValue);
                if (coinHistory.TotalVolumes.TryGetValue(price.Key, out var totalVolumeValue))
                    historyData.TotalVolumes.Add(price.Key, totalVolumeValue);
                historyModels.Add(new CoinHistoryModel()
                {
                    Date = DateTimeOffset.FromUnixTimeMilliseconds(price.Key).UtcDateTime,
                    ObjectId = coin.Id,
                    HistoryData = historyData
                });
            }
            await coinHistoryContext.Save(historyModels, range.From, range.To);
            return historyModels;
        }
    }
}
