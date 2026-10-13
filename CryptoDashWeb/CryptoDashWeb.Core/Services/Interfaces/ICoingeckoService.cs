using CryptoDashWeb.Core.Models.Coingecko;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Services.Interfaces
{
    public interface ICoingeckoService
    {
        Task<CoinPriceHistory> GetCoinHistory(int coinId, int currencyId, DateTime from, DateTime to);
        Task PullCoinList();
        Task PullCurrencies();
    }
}
