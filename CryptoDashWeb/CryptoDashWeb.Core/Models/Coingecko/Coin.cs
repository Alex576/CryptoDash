using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Coingecko
{
    public class Coin
    {
        public string Id { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public Dictionary<string, string> Platforms { get; set; }
    }
}
