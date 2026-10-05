using CryptoDashWeb.Core.Models.Form;
using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Models;
using CryptoDashWeb.Models.Settings;
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

        [HttpPost("[action]")]
        public async Task<LayoutsModel> GetLayout(GetSettingsLayoutModel model)
        {
            return await _service.GetLayout(model.ToolCode);
        }

        [HttpPost("[action]")]
        public async Task<FormModel> GetForm(FormEditorModel model)
        {
            return await _service.GetForm(model.TileCode, model.ItemId);
        }
        
        [HttpPost("[action]")]
        public async Task<FormModel> UpdateForm(FormEditorModel model)
        {
            return await _service.UpdateForm(model.TileCode, model.ItemId, model.FormValues);
        }
        
        [HttpPost("[action]")]
        public async Task<FormModel> RemoveItem(FormEditorModel model)
        {
            return await _service.GetForm(model.TileCode, model.ItemId);
        }
    }
}
