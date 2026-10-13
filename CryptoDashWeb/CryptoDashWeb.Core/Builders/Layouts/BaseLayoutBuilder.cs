using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Core.Builders.Layouts
{
    public abstract class BaseLayoutBuilder
    {
        //public abstract List<FormControlData> GetFilters(ToolCode toolCode);

        protected FormControlData GetControlData(string name, TileItemCode tileItemCode, ControlType type, List<ControlState> states,
            ControlMasterData? controlMasterData = null, List<ControlDependency>? dependencies = null)
        {
            return new FormControlData()
            {
                Name = name,
                TileItemCode = tileItemCode,
                Type = type,
                States = states,
                ControlMasterData = controlMasterData ?? new(),
                Dependencies = dependencies ?? [],
            };
        }
    }
}
