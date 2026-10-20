using CryptoDashWeb.Core.Models.Controls;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.UserSettings
{
    public class FilterUserSettings : BaseUserSettings
    {
        public List<FiltersUserSettingsData> FiltersValues { get; set; } = [];
    }

    public class FiltersUserSettingsData
    {
        public string Id { get; set; }
        public JToken? Value { get; set; }
    }
}
