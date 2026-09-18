using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Core.Builders.Layouts
{
    public abstract class BaseLayoutBuilder
    {
        public abstract List<FormControlData> GetFilters(ToolCode toolCode);

        protected FormControlData CrateFormControl(string name, TileItemCode tileItemCode, ControlType type, List<ControlState> states) => new FormControlData()
        {
            Name = name,
            Type = type,
            States = states,
            TileItemCode = tileItemCode,
        };
    }
}
