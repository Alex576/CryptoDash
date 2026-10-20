using CryptoDashWeb.Core.Models.Settings.LayoutEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.UserSettings
{
    public class DashboardLayoutUserSettings : BaseUserSettings
    {
        public Dictionary<string, DashboardItemOptions> Items { get; set; } = [];
    }
}
