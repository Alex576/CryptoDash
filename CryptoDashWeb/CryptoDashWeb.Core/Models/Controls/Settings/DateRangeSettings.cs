using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Controls.Settings
{
    public class DateRangeSettings : ControlSettings
    {
        public DateTime Min { get; set; }
        public DateTime Max { get; set; }
    }
}
