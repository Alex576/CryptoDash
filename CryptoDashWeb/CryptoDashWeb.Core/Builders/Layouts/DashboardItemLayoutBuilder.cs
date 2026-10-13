using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Builders.Layouts
{
    public class DashboardItemLayoutBuilder : BaseLayoutBuilder
    {
        public List<FormControlData> GetControls()
        {
            var controls = new List<FormControlData>();
            controls.Add(GetControlData("Form.Control.Name", TileItemCode.Name, ControlType.Input, [ControlState.Editable, ControlState.Required]));
            controls.Add(GetControlData("Form.Control.DashboardType", TileItemCode.DashboardType, ControlType.Combo, [ControlState.Editable, ControlState.Required]));
            controls.Add(GetControlData("Form.Control.DataView", TileItemCode.DataView, ControlType.Combo, [ControlState.Editable, ControlState.Required]));
            controls.Add(GetControlData("Form.Control.Class", TileItemCode.Class, ControlType.Combo, [ControlState.Editable, ControlState.AllowMultiselect]));
            controls.Add(GetControlData("Form.Control.Coin", TileItemCode.Coin, ControlType.Combo, [ControlState.Editable, ControlState.AllowMultiselect]));
            controls.Add(GetControlData("Form.Control.Currency", TileItemCode.Currency, ControlType.Combo, [ControlState.Editable, ControlState.Required]));

            return controls;
        }


    }
}
