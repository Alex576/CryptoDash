using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Builders.Filters
{
    public class DashboardFiltersBuilder : BaseFiltersBuilder<DateRange>
    {
        public DashboardFiltersBuilder(List<FormControlData> formControlDatas) : base(formControlDatas)
        {
        }

        protected override string GetControlId(FormControlData controlData)
        {
            if (controlData.TileItemCode == TileItemCode.DateRange)
                return "DateRangeFilter";
            return base.GetControlId(controlData);
        }
        protected override Task<List<Item>> GetComboItems(FormControlData controlData)
        {
            throw new NotImplementedException();
        }

        protected override object? GetValue(FormControl control, FormControlData controlData, DateRange data)
        {
            return controlData.TileItemCode switch
            {
                TileItemCode.Object => throw new NotImplementedException(),
                TileItemCode.DateTime => throw new NotImplementedException(),
                TileItemCode.DateRange => data,
                _ => throw new NotImplementedException(),
            };
        }

        protected override void UpdateDataByControlValue(DateRange data, FormControlData controlData, JToken? value)
        {
            throw new NotImplementedException();
        }
    }
}
