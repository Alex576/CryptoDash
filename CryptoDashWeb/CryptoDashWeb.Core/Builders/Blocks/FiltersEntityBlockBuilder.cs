using CryptoDashWeb.Core.Builders.Controls;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Utils;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Builders.Blocks
{
    public class FiltersEntityBlockBuilder
    {
        private readonly List<FormControlData> _data;

        public FiltersEntityBlockBuilder(List<FormControlData> data)
        {
            _data = data;
        }

        public List<FormControlDataEx> GetEntityControls()
        {
            var controls = new List<FormControlDataEx>(_data.Count);

            foreach (var control in _data)
            {
                controls.Add(new FormControlDataEx(control) { Id = ItemCodeHelper.GetItemCode(control) });
            }
            return controls;
        }
    }
}
