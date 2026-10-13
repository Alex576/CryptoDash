using System.ComponentModel.DataAnnotations;

namespace CryptoDashWeb.Data.Models
{
    public enum ClassCode
    {
        //Object = 1,
        SupportedCurrency = 2,
        Coin = 3,
        Currency = 4,
    }

    public class ClassModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }
}
