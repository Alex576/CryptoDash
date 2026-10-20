using CryptoDashWeb.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.UserSettings
{
    public class LastSessionUserSettings : BaseUserSettings
    {
        public ToolCode ToolCode { get; set; }
    }
}
