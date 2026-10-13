using CryptoDashWeb.Core.Models.Coingecko;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Data.Services;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Web;

namespace CryptoDashWeb.Core.Services
{
    public class CoingeckoService : ICoingeckoService
    {
        private readonly ObjectContextService _objectContext;
        private readonly CoingeckoModel _coinheckoOptions;

        public CoingeckoService(ObjectContextService objectContext, IOptions<CoingeckoModel> coinheckoOptions)
        {
            _objectContext = objectContext;
            _coinheckoOptions = coinheckoOptions.Value;
        }
        private record QueryParam(string Name, string Value);
        private string GetUrl(string url, params QueryParam[] queryParams)
        {
            var uriBuilder = new UriBuilder(url);
            var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            query["x_cg_demo_api_key"] = _coinheckoOptions.Key;
            foreach (var param in queryParams)
                query[param.Name] = param.Value;

            uriBuilder.Query = query.ToString();
            return uriBuilder.ToString();
        }

        public async Task PullCoinList()
        {
            var client = new HttpClient();
            using var request = new HttpRequestMessage(HttpMethod.Get, GetUrl("https://api.coingecko.com/api/v3/coins/list"));

            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                using var stream = await response.Content.ReadAsStreamAsync();
                using var streamReader = new StreamReader(stream);
                using var reader = new JsonTextReader(streamReader);
                var serializer = new JsonSerializer();
                var coinList = serializer.Deserialize<List<Coin>>(reader) ?? [];
                var oldData = await _objectContext.GetDictByName(coinList.Select(x => x.Id).ToList());

                var coinEntities = coinList.Select(x => new ObjectEntity()
                {
                    Id = oldData.TryGetValue(x.Id, out var data) ? data.Id : 0,
                    Name = x.Id,
                    DisplayName = x.Name,
                    ClassCode = (int)ClassCode.Coin,
                });
                await _objectContext.Save(coinEntities);
            }
        }

        public async Task PullCurrencies()
        {
            var client = new HttpClient();
            using var request = new HttpRequestMessage(HttpMethod.Get, GetUrl("https://api.coingecko.com/api/v3/simple/supported_vs_currencies"));

            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                using var stream = await response.Content.ReadAsStreamAsync();
                using var streamReader = new StreamReader(stream);
                using var reader = new JsonTextReader(streamReader);
                var serializer = new JsonSerializer();
                var currencyList = serializer.Deserialize<List<string>>(reader) ?? [];
                var oldData = await _objectContext.GetDictByName(currencyList);
                var currencyEntities = currencyList.Select(x => new ObjectEntity()
                {
                    Id = oldData.TryGetValue(x, out var data) ? data.Id : 0,
                    Name = x,
                    DisplayName = x,
                    ClassCode = (int)ClassCode.Currency,
                });
                await _objectContext.Save(currencyEntities);
            }
        }

        public async Task<CoinPriceHistory> GetCoinHistory(int coinId, int currencyId, DateTime from, DateTime to)
        {
            var coin = await _objectContext.Get(coinId);
            var currency = await _objectContext.Get(currencyId);
            var client = new HttpClient();

            var query = GetUrl(
                $"https://api.coingecko.com/api/v3/coins/{coin.Name}/market_chart/range",
                new QueryParam("vs_currency", currency.Name),
                new QueryParam("from", from.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)),
                new QueryParam("to", to.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture))
                );
            using var request = new HttpRequestMessage(HttpMethod.Get, query);
            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                using var stream = await response.Content.ReadAsStreamAsync();
                using var streamReader = new StreamReader(stream);
                using var reader = new JsonTextReader(streamReader);
                var serializer = new JsonSerializer();
                return serializer.Deserialize<CoinPriceHistory>(reader) ?? new();
            }
            return new();
        }
    }
}
