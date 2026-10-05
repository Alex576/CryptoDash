using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Builders.Layouts
{
    public class DashboardItemLayoutBuilder
    {
        public List<FormControlData> GetControls()
        {
            var controls = new List<FormControlData>();
            controls.Add(GetControlData("Form.Control.Name", TileItemCode.Name, ControlType.Input, [ControlState.Editable, ControlState.Required]));
            controls.Add(GetControlData("Form.Control.DashboardType", TileItemCode.DashboardType, ControlType.Combo, [ControlState.Editable, ControlState.Required]));

            return controls;
        }

        private FormControlData GetControlData(string name, TileItemCode tileItemCode, ControlType type, List<ControlState> states, List<ControlDependency>? dependencies = null)
        {
            return new FormControlData()
            {
                Name = name,
                TileItemCode = tileItemCode,
                Type = type,
                States = states,
                Dependencies = dependencies ?? [],
            };
        }
    }
}
