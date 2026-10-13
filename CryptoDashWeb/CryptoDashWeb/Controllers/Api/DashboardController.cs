using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Dashboard;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CryptoDashWeb.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpPost("[action]")]
        public async Task<List<FormControl>> GetDashboardFilters()
        {
            return await _dashboardService.GetDashboardFilters();
        }

        [HttpGet("[action]")]
        public async Task<DashboardLayout> GetDashboardLayout()
        {
            return await _dashboardService.GetDashboardLayout();
        }

        [HttpPost("[action]")]
        public async Task<DashboardItemData> GetDashboardData(GetDashboardData model)
        {
            return await _dashboardService.GetDashboardData(model.Range, model.ItemId);
        }


    }
}
