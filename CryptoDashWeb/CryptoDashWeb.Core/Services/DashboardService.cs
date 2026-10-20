using CryptoDashWeb.Core.Builders;
using CryptoDashWeb.Core.Builders.Blocks;
using CryptoDashWeb.Core.Builders.Filters;
using CryptoDashWeb.Core.Builders.Layouts;
using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Dashboard;
using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
using CryptoDashWeb.Core.Models.UserSettings;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Data.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly LayoutContextService _layoutContext;
        private readonly ObjectContextService _objectContextService;
        private readonly CoinHistoryContext _coinHistoryContext;
        private readonly ICoingeckoService _coingeckoService;
        private readonly IUserSettingsService _userSettingsService;

        public DashboardService(LayoutContextService layoutContext, ObjectContextService objectContextService, CoinHistoryContext coinHistoryContext,
            ICoingeckoService coingeckoService, IUserSettingsService userSettingsService)
        {
            _layoutContext = layoutContext;
            _objectContextService = objectContextService;
            _coinHistoryContext = coinHistoryContext;
            _coingeckoService = coingeckoService;
            _userSettingsService = userSettingsService;
        }

        public async Task<DashboardLayout> GetDashboardLayout()
        {
            var dashboardLayout = await _layoutContext.GetLayout<DashboardLayoutEntity>((int)TileCode.DashboardDashboard);
            var builder = new DashboardBuilder(dashboardLayout.Layout);

            return new DashboardLayout()
            {
                Items = builder.GetItems(),
            };
        }

        public async Task<DashboardItemData> GetDashboardData(FormValues filtersValues, string id)
        {
            if (!filtersValues.TryGetValue("DateRangeFilter", out DateRange dateRange))
                return new DashboardItemData() { LoadError = true };

            var dashboardLayout = await _layoutContext.GetLayout<DashboardLayoutEntity>((int)TileCode.DashboardDashboard);
            var dashboardItem = dashboardLayout.Layout.Items.FirstOrDefault(x => x.Id == id) ?? throw new ArgumentException($"Dashboard not found with id = {id}");
            var builder = new DashboardBuilder(dashboardLayout.Layout);
            return await builder.GetDashboardData(dateRange, dashboardItem, _objectContextService, _coinHistoryContext, _coingeckoService);
        }

        public async Task<List<FormControl>> GetDashboardFilters()
        {
            var layout = new DashboardFiltersLayoutBuilder().GetFilters();
            var builder = new DashboardFiltersBuilder(layout);
            var userSettings = await _userSettingsService.GetUserSettings(SettingsCode.DashboardFilters, ToolCode.Dashboard, null);
            var filters = userSettings is FilterUserSettings userFilterssData ? userFilterssData.FiltersValues : [];
            return await builder.GetFilters(filters);
        }
    }
}
