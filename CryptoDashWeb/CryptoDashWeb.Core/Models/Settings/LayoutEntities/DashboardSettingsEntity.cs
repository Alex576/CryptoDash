using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CryptoDashWeb.Core.Models.Settings.LayoutEntities
{
    public class DashboardSettingsEntity : ILayoutEntity
    {
        public List<DashboardItem> Items { get; set; } = [];
        
    }
}
