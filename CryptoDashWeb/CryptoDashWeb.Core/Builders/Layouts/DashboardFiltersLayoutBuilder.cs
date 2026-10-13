using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Builders.Layouts
{
    public class DashboardFiltersLayoutBuilder : BaseLayoutBuilder
    {
        public List<FormControlData> GetFilters()
        {
            var filters = new List<FormControlData>();

            filters.Add(GetControlData("Form.Control.DateRange", TileItemCode.DateRange, ControlType.DateRange, [ControlState.Editable, ControlState.Required]));
            return filters;
        }
    }
}
