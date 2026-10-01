using CryptoDashWeb.Data.DBModels;
using Newtonsoft.Json;

namespace CryptoDashWeb.Data.Models
{
    public class LayoutModel<TData> where TData : class
    {
        public int TileCode { get; set; }
        public TData Layout { get; set; }

        public LayoutModel(Layout? layout, int tileCode)
        {
            TileCode = tileCode;
            Layout = JsonConvert.DeserializeObject<TData>(layout?.LayoutJson ?? "") ?? Activator.CreateInstance<TData>();
        }
    }
}
