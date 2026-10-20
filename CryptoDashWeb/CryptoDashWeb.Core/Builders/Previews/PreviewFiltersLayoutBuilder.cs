using CryptoDashWeb.Core.Builders.Controls;
using CryptoDashWeb.Core.Builders.Filters;
using CryptoDashWeb.Core.Builders.Layouts;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Settings;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Builders.Previews
{
    public class PreviewFiltersLayoutBuilder : BaseFiltersBuilder<FiltersBuilderMockData>
    {
        public PreviewFiltersLayoutBuilder(List<FormControlData> formControlDatas) : base(formControlDatas)
        {
        }

        protected override Task<List<Item>> GetComboItems(FormControlData controlData) => Task.FromResult(new List<Item>());

        protected override object? GetValue(FormControl control, FormControlData controlData, FiltersBuilderMockData data) => null;

        protected override Task UpdateDataByControlValue(FiltersBuilderMockData data, FormControlData controlData, JToken? value)
        {
            throw new NotImplementedException();
        }
    }
}
