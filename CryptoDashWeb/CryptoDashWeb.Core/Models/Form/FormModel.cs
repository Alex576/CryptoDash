using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Form
{
    public class FormModel
    {
        public List<FormControl> Controls { get; set; } = [];
        public TileCode TileCode { get; set; }
        public List<FormActionCode> Actions { get; set; } = [];
    }
}
