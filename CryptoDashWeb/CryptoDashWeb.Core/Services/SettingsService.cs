using CryptoDashWeb.Core.Builders.Filters;
using CryptoDashWeb.Core.Builders.Layouts;
using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Services
{
    public class SettingsService : ISettingsService
    {
        public SettingsFilters GetFilters(ToolCode toolCode)
        {
            var layoutBuilder = new SettingsLayoutBuilder();
            var builder = new SettingsFiltersBuilder(layoutBuilder.GetFilters(toolCode));
            var filters = builder.GetFilters(new FiltersBuilderMockData());
            return new SettingsFilters() { Filters = filters };
        }
    }
}
