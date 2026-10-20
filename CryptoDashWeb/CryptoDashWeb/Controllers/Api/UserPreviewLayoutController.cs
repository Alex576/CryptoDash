using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Models;
using CryptoDashWeb.Models.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CryptoDashWeb.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPreviewLayoutController : ControllerBase
    {
        private readonly IUserPreviewLayout _userPreviewLayout;

        public UserPreviewLayoutController(IUserPreviewLayout userPreviewLayout)
        {
            _userPreviewLayout = userPreviewLayout;
        }

        [HttpPost("[action]")]
        public async Task<List<FormControl>> GetFiltersPreview(UserPreviewModel model)
        {
            return await _userPreviewLayout.GetFiltersPreview(model.ToolCode);
        }
    }
}
