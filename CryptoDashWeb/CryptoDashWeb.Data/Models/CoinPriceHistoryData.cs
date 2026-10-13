namespace CryptoDashWeb.Data.Models
{
    public class CoinPriceHistoryData
    {
        public Dictionary<long, float> Prices { get; set; } = new();
        public Dictionary<long, float> MarketCaps { get; set; } = new();
        public Dictionary<long, float> TotalVolumes { get; set; } = new();
    }
}
