using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Dashboard;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardItemData> GetDashboardData(DateRange dateRange, string id);
        Task<List<FormControl>> GetDashboardFilters();
        Task<DashboardLayout> GetDashboardLayout();
    }
}
