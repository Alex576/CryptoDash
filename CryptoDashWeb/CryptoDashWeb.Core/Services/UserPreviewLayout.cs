using CryptoDashWeb.Core.Builders.Previews;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Data.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Services
{
    public class UserPreviewLayout : IUserPreviewLayout
    {
        private readonly TileItemContextService _tileItemContextService;
        private readonly LayoutContextService _layoutContext;

        public UserPreviewLayout(TileItemContextService tileItemContextService, LayoutContextService layoutContext)
        {
            _tileItemContextService = tileItemContextService;
            _layoutContext = layoutContext;
        }

        public async Task<List<FormControl>> GetFiltersPreview(ToolCode toolCode)
        {
            var tile = await _tileItemContextService.GetFilterTile(toolCode);
            if (tile == null)
                throw new ArgumentNullException(nameof(tile));

            var filterLayout = await _layoutContext.GetLayout<FilterLayoutEntity>(tile.Id);
            var layoutBuilder = new PreviewFiltersLayoutBuilder(filterLayout.Layout.FiltersData);
            return await layoutBuilder.GetFilters(new Models.Settings.FiltersBuilderMockData());
        }
    }
}
