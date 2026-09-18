using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace CryptoDashWeb.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService _service;

        public SettingsController(ISettingsService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]
        public async Task<SettingsFilters> GetFilters(ToolCode toolCode)
        {
            return _service.GetFilters(toolCode);
        }
    }
}
