using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Coingecko
{
    public class CoinPriceHistory
    {
        [JsonProperty("prices")]
        [JsonConverter(typeof(UnixMillisToDateTimeDictionaryConverter))]
        public Dictionary<long, float> Prices { get; set; } = [];

        [JsonProperty("market_caps")]
        [JsonConverter(typeof(UnixMillisToDateTimeDictionaryConverter))]
        public Dictionary<long, float> MarketCaps { get; set; } = [];

        [JsonProperty("total_volumes")]
        [JsonConverter(typeof(UnixMillisToDateTimeDictionaryConverter))]
        public Dictionary<long, float> TotalVolumes { get; set; } = [];
    }
}
