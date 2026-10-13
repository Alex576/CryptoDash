using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Builders.Layouts
{
    public class DashboardItemLayoutBuilder : BaseLayoutBuilder
    {
        public List<FormControlData> GetControls()
        {
            var controls = new List<FormControlData>
            {
                GetControlData("Form.Control.Name", TileItemCode.Name, ControlType.Input, [ControlState.Editable, ControlState.Required]),
                GetControlData("Form.Control.DashboardType", TileItemCode.DashboardType, ControlType.Combo, [ControlState.Editable, ControlState.Required]),
                GetControlData("Form.Control.DataView", TileItemCode.DataView, ControlType.Combo, [ControlState.Editable, ControlState.Required]),
                GetControlData("Form.Control.Class", TileItemCode.Class, ControlType.Combo, [ControlState.Editable, ControlState.AllowMultiselect]),
                GetControlData("Form.Control.Coin", TileItemCode.Object, ControlType.Combo, [ControlState.Editable, ControlState.AllowMultiselect], new ControlMasterData() {ClassCodes = [(int)ClassCode.Coin]}),
                GetControlData("Form.Control.Currency", TileItemCode.Object, ControlType.Combo, [ControlState.Editable, ControlState.Required], new ControlMasterData() {ClassCodes = [(int)ClassCode.Currency]})
            };

            return controls;
        }


    }
}
