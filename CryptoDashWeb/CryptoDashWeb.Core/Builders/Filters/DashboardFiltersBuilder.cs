using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Controls.Settings;
using CryptoDashWeb.Core.Models.UserSettings;
using CryptoDashWeb.Core.Utils;
using CryptoDashWeb.Data.Utils;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Builders.Filters
{
    public class DashboardFiltersBuilder : BaseFiltersBuilder<List<FiltersUserSettingsData>>
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

        protected override DateRangeSettings GetDateRangeSettings()
        {
            return new DateRangeSettings() { Max = new DateTime(DateTime.UtcNow.Year + 5, 12, 31), Min = new DateTime(DateTime.UtcNow.Year - 5, 1, 1) };
        }

        protected override Task<List<Item>> GetComboItems(FormControlData controlData)
        {
            throw new NotImplementedException();
        }

        protected override object? GetValue(FormControl control, FormControlData controlData, List<FiltersUserSettingsData> data)
        {
            if (!data.TryGetValue(x => x.Id == control.Id, out var userValue))
                return null;

            return controlData.TileItemCode switch
            {
                TileItemCode.Coin => throw new NotImplementedException(),
                TileItemCode.DateTime => throw new NotImplementedException(),
                TileItemCode.DateRange when userValue.Value.TryParseValue<DateRange>(out var range) => range,
                _ => null,
            };
        }

        protected override Task UpdateDataByControlValue(List<FiltersUserSettingsData> data, FormControlData controlData, JToken? value)
        {
            throw new NotImplementedException();
        }
    }
}
