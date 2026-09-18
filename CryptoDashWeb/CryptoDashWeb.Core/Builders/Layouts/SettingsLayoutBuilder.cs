using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Core.Builders.Layouts
{
    public class SettingsLayoutBuilder : BaseLayoutBuilder
    {
        public override List<FormControlData> GetFilters(ToolCode toolCode)
        {
            var filters = new List<FormControlData>();

            filters.Add(CrateFormControl("Control.Name.Tool", TileItemCode.Tool, ControlType.Combo, [ControlState.Editable, ControlState.Required, ControlState.SelectFirstValueIfEmpty]));
            return filters;
        }
    }
}
