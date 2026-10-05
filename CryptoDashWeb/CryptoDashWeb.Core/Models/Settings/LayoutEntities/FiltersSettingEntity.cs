using CryptoDashWeb.Core.Models.Controls;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Settings.LayoutEntities
{
    public class FiltersSettingEntity : ILayoutEntity
    {
        public List<FormControlDataEx> FiltersData { get; set; } = [];

    }
}
