using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Services.Interfaces
{
    public interface IUserPreviewLayout
    {
        Task<List<FormControl>> GetFiltersPreview(ToolCode toolCode);
    }
}
