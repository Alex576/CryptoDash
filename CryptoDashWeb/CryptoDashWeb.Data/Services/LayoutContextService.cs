using CryptoDashWeb.Data.DBContext;
using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace CryptoDashWeb.Data.Services
{
    public class LayoutContextService : CryptoDashContextServiceBase
    {
        public LayoutContextService(CryptoDashContext context) : base(context)
        {
        }

        public async Task<LayoutModel<TData>> GetLayout<TData>(int tileCode) where TData : class
        {
            var layout = await _context.Layouts.FirstOrDefaultAsync(x => x.TileId == tileCode);
            return new LayoutModel<TData>(layout, tileCode);
        }

        public async Task SaveLayout(int tileCode, object layout)
        {
            var oldLayout = await _context.Layouts.FirstOrDefaultAsync(x => x.TileId == tileCode);
            if (oldLayout == null)
            {
                oldLayout = new Layout()
                {
                    TileId = tileCode,
                };
            }
            oldLayout.LayoutJson = JsonConvert.SerializeObject(layout);

            _context.Layouts.Update(oldLayout);
            await _context.SaveChangesAsync();
        }

    }
}
