using CryptoDashWeb.Core.Models.Settings.LayoutEntities;
using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Core.Models.Settings
{
    public class LayoutEntity
    {
        public TileCode TileCode { get; set; }
        public TileTypeCode TileType { get; set; }
        public ILayoutEntity Data { get; set; }

        public LayoutEntity(TileCode tileCode, TileTypeCode tileType, ILayoutEntity data)
        {
            TileCode = tileCode;
            TileType = tileType;
            Data = data;
        }
    }
}
