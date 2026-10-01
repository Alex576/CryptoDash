using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Controls
{
    public class FormControlDataEx : FormControlData
    {
        public string Id { get; set; }
        public FormControlDataEx(FormControlData controlData)
        {
            Name = controlData.Name;
            TileItemCode = controlData.TileItemCode;
            Type = controlData.Type;
            States = controlData.States;
            ControlMasterData = controlData.ControlMasterData;
            Dependencies = controlData.Dependencies;
        }
    }
}
