using CryptoDashWeb.Core.Builders.Blocks;
using CryptoDashWeb.Core.Builders.Filters;
using CryptoDashWeb.Core.Builders.Forms;
using CryptoDashWeb.Core.Builders.Layouts;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Form;
using CryptoDashWeb.Core.Models.OperationResult;
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
        private readonly ObjectContextService _objectContextService;
        private readonly ClassContextService _classContextService;

        public SettingsService(LayoutContextService layoutContext, TileItemContextService tileItemContext, ObjectContextService objectContextService,
            ClassContextService classContextService)
        {
            _layoutContext = layoutContext;
            _tileItemContext = tileItemContext;
            _objectContextService = objectContextService;
            _classContextService = classContextService;
        }

        public async Task<SettingsFilters> GetFilters(ToolCode toolCode)
        {
            var layoutBuilder = new SettingsLayoutBuilder();
            var builder = new SettingsFiltersBuilder(layoutBuilder.GetFilters(toolCode));
            var filters = await builder.GetFilters(new FiltersBuilderMockData());
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
                            var builder = new DashboardEntityBlockBuilder(layout.Layout);
                            settingsLayout.Items.Add(new LayoutEntity((TileCode)tile.Id, TileTypeCode.Dashboard, builder.BuildBlocks()));

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

        public async Task<FormModel> GetForm(TileCode tileCode, string? itemId)
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
                    var formBuilder = new DashboardItemFormBuilder(builder.GetControls(), tileCode, _objectContextService, _classContextService);
                    return await formBuilder.GetForm(new DashboardItemLayoutEx(item));
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

        public async Task<FormModel> UpdateForm(TileCode tileCode, string? itemId, FormValues formValues)
        {
            var tile = await _tileItemContext.Get(tileCode);
            if (tile == null)
                throw new Exception("Failed to get tile");

            switch ((TileTypeCode)tile.TypeCode)
            {
                case TileTypeCode.Dashboard:
                    var layout = await _layoutContext.GetLayout<DashboardLayoutEntity>((int)tileCode);
                    var item = string.IsNullOrEmpty(itemId) ? new() : layout.Layout.Items.FirstOrDefault(x => x.Id == itemId) ?? new DashboardItemLayout();
                    var dashboardItemEx = new DashboardItemLayoutEx(item);

                    var builder = new DashboardItemLayoutBuilder();
                    var formBuilder = new DashboardItemFormBuilder(builder.GetControls(), tileCode, _objectContextService, _classContextService);
                    await formBuilder.UpdateData(formValues, dashboardItemEx);
                    return await formBuilder.GetForm(dashboardItemEx);
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

        public async Task<OperationResult> SaveForm(TileCode tileCode, string? itemId, FormValues formValues)
        {
            var tile = await _tileItemContext.Get(tileCode);
            if (tile == null)
                throw new Exception("Failed to get tile");

            switch ((TileTypeCode)tile.TypeCode)
            {
                case TileTypeCode.Dashboard:
                    var layoutModel = await _layoutContext.GetLayout<DashboardLayoutEntity>((int)tileCode);
                    DashboardItemLayout item;
                    if (string.IsNullOrEmpty(itemId))
                        item = new DashboardItemLayout(layoutModel.Layout.Items.Count + 1);
                    else
                        item = layoutModel.Layout.Items.FirstOrDefault(x => x.Id == itemId) ?? new DashboardItemLayout(layoutModel.Layout.Items.Count + 1);

                    var builder = new DashboardItemLayoutBuilder();
                    var formBuilder = new DashboardItemFormBuilder(builder.GetControls(), tileCode, _objectContextService, _classContextService);
                    var dashboardItemEx = new DashboardItemLayoutEx(item);
                    await formBuilder.UpdateData(formValues, dashboardItemEx);
                    layoutModel.Layout.Items.RemoveAll(x => x.Id == itemId);
                    layoutModel.Layout.Items.Add(new DashboardItemLayout(dashboardItemEx));
                    var saveResult = await _layoutContext.SaveLayout((int)tileCode, layoutModel.Layout);
                    return new OperationResult(saveResult ? ResultCode.Success : ResultCode.Error);


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
            throw new NotImplementedException();
        }

        public Task<FormModel> RemoveItem(TileCode tileCode, string itemId)
        {
            throw new NotImplementedException();
        }

        public async Task SaveDashboardItem(TileCode tileCode, DashboardItemChanges model)
        {
            var layout = await _layoutContext.GetLayout<DashboardLayoutEntity>((int)tileCode);
            var changedItem = layout.Layout.Items.FirstOrDefault(x => x.Id == model.Id.ToString());
            if (changedItem == null)
                return;
            changedItem.X = model.X;
            changedItem.Y = model.Y;
            changedItem.Width = model.Cols;
            changedItem.Height = model.Rows;
            await _layoutContext.SaveLayout((int)tileCode, layout.Layout);
        }
    }
}
