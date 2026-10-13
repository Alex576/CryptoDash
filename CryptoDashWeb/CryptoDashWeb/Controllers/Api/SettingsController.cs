using CryptoDashWeb.Core.Models.Form;
using CryptoDashWeb.Core.Models.OperationResult;
using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Core.Models.Settings.LayoutEntities;
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
            return await _service.GetFilters(toolCode);
        }

        [HttpPost("[action]")]
        public async Task<LayoutsModel> GetLayout(GetSettingsLayoutModel model)
        {
            return await _service.GetLayout(model.FilterValues);
        }

        [HttpPost("[action]")]
        public async Task<FormModel> GetForm(GetFormEditorModel model)
        {
            return await _service.GetForm(model.TileCode, model.ItemId);
        }

        [HttpPost("[action]")]
        public async Task<FormModel> UpdateForm(FormEditorModel model)
        {
            return await _service.UpdateForm(model.TileCode, model.ItemId, model.FormValues);
        }

        [HttpPost("[action]")]
        public async Task<OperationResult> SaveForm(FormEditorModel model)
        {
            return await _service.SaveForm(model.TileCode, model.ItemId, model.FormValues);
        }

        [HttpPost("[action]")]
        public async Task<FormModel> RemoveItem(GetFormEditorModel model)
        {
            return await _service.RemoveItem(model.TileCode, model.ItemId);
        }

        [HttpPost("[action]")]
        public async Task SaveDashboardItem(DashboardItemChangesModel model)
        {
            await _service.SaveDashboardItem(model.TileCode, model.Changes);
        }
    }
}
