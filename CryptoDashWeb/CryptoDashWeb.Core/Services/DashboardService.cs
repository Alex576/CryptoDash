using CryptoDashWeb.Core.Builders;
using CryptoDashWeb.Core.Builders.Blocks;
using CryptoDashWeb.Core.Builders.Filters;
using CryptoDashWeb.Core.Builders.Layouts;
using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Dashboard;
using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
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

        public DashboardService(LayoutContextService layoutContext, ObjectContextService objectContextService, CoinHistoryContext coinHistoryContext, ICoingeckoService coingeckoService)
        {
            _layoutContext = layoutContext;
            _objectContextService = objectContextService;
            _coinHistoryContext = coinHistoryContext;
            _coingeckoService = coingeckoService;
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

        public async Task<DashboardItemData> GetDashboardData(DateRange dateRange, string id)
        {
            var dashboardLayout = await _layoutContext.GetLayout<DashboardLayoutEntity>((int)TileCode.DashboardDashboard);
            var dashboardItem = dashboardLayout.Layout.Items.FirstOrDefault(x => x.Id == id) ?? throw new ArgumentException($"Dashboard not found with id = {id}");
            var builder = new DashboardBuilder(dashboardLayout.Layout);
            return await builder.GetDashboardData(dateRange, dashboardItem, _objectContextService, _coinHistoryContext, _coingeckoService);
        }

        public Task<List<FormControl>> GetDashboardFilters()
        {
            var layout = new DashboardFiltersLayoutBuilder().GetFilters();
            var builder = new DashboardFiltersBuilder(layout);
            return builder.GetFilters(new(new DateTime(DateTime.UtcNow.Year, 1, 1), new DateTime(DateTime.UtcNow.Year, 12, 31)));
        }
    }
}
