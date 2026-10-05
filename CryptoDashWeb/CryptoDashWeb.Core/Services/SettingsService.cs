using CryptoDashWeb.Core.Builders.Blocks;
using CryptoDashWeb.Core.Builders.Filters;
using CryptoDashWeb.Core.Builders.Forms;
using CryptoDashWeb.Core.Builders.Layouts;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Form;
using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
using CryptoDashWeb.Core.Models.Settings.LayoutEntities;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Data.Services;

namespace CryptoDashWeb.Core.Services
{
    public class SettingsService : ISettingsService
    {
        private readonly LayoutContextService _layoutContext;
        private readonly TileItemContextService _tileItemContext;

        public SettingsService(LayoutContextService layoutContext, TileItemContextService tileItemContext)
        {
            _layoutContext = layoutContext;
            _tileItemContext = tileItemContext;
        }

        public SettingsFilters GetFilters(ToolCode toolCode)
        {
            var layoutBuilder = new SettingsLayoutBuilder();
            var builder = new SettingsFiltersBuilder(layoutBuilder.GetFilters(toolCode));
            var filters = builder.GetFilters(new FiltersBuilderMockData());
            return new SettingsFilters() { Filters = filters };
        }

        public async Task<LayoutsModel> GetLayout(ToolCode toolCode)
        {
            var settingsLayout = new LayoutsModel();
            var layoutTiles = await _tileItemContext.GetFullLayout(toolCode);
            foreach (var tile in layoutTiles)
            {
                switch ((TileTypeCode)tile.TypeCode)
                {
                    case TileTypeCode.Dashboard:
                        {
                            var layout = await _layoutContext.GetLayout<DashboardLayoutEntity>(tile.Id);
                            var builder = new DashboardEntityBlockBuilder();
                            var entityBlock = new DashboardSettingsEntity();
                            settingsLayout.Items.Add(new LayoutEntity((TileCode)tile.Id, TileTypeCode.Dashboard, entityBlock));
                        }
                        break;
                    case TileTypeCode.Grid:
                        break;
                    case TileTypeCode.Form:
                        break;
                    case TileTypeCode.Filter:
                        {
                            var layout = await _layoutContext.GetLayout<FilterLayoutEntity>(tile.Id);
                            var builder = new FiltersEntityBlockBuilder(layout.Layout.FiltersData);
                            var entityBlock = new FiltersSettingEntity() { FiltersData = builder.GetEntityControls() };
                            settingsLayout.Items.Add(new LayoutEntity((TileCode)tile.Id, TileTypeCode.Filter, entityBlock));
                        }
                        break;
                    case TileTypeCode.Layout:
                        break;
                    default:
                        break;
                }
            }

            return settingsLayout;
        }

        public async Task<FormModel> GetForm(TileCode tileCode, string itemId)
        {
            var tile = await _tileItemContext.Get(tileCode);
            if (tile == null)
                throw new Exception("Failed to get form");

            switch ((TileTypeCode)tile.TypeCode)
            {
                case TileTypeCode.Dashboard:
                    var layout = await _layoutContext.GetLayout<DashboardLayoutEntity>((int)tileCode);
                    var item = layout.Layout.Items.FirstOrDefault(x => x.Id == itemId) ?? new DashboardItemLayout();
                    var builder = new DashboardItemLayoutBuilder();
                    var formBuilder = new DashboardItemFormBuilder(builder.GetControls());
                    return formBuilder.GetForm(item);
                case TileTypeCode.Grid:
                    break;
                case TileTypeCode.Form:
                    break;
                case TileTypeCode.Filter:
                    break;
                case TileTypeCode.Layout:
                    break;
                default:
                    break;
            }

            return new();
        }

        public async Task<FormModel> UpdateForm(TileCode tileCode, string itemId, FormValues formValues)
        {
            var tile = await _tileItemContext.Get(tileCode);
            if (tile == null)
                throw new Exception("Failed to get form");

            switch ((TileTypeCode)tile.TypeCode)
            {
                case TileTypeCode.Dashboard:
                    var layout = await _layoutContext.GetLayout<DashboardLayoutEntity>((int)tileCode);
                    var item = layout.Layout.Items.FirstOrDefault(x => x.Id == itemId) ?? new DashboardItemLayout();
                    var builder = new DashboardItemLayoutBuilder();
                    var formBuilder = new DashboardItemFormBuilder(builder.GetControls());
                    formBuilder.UpdateData(formValues, item);
                    return formBuilder.GetForm(item);
                case TileTypeCode.Grid:
                    break;
                case TileTypeCode.Form:
                    break;
                case TileTypeCode.Filter:
                    break;
                case TileTypeCode.Layout:
                    break;
                default:
                    break;
            }

            return new();
        }
    }
}
