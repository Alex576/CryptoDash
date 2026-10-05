using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Settings.LayoutEntities;

namespace CryptoDashWeb.Core.Models.Settings.LayoutDBEntities
{
    /// <summary>
    /// Stored in DB
    /// </summary>
    public class FormLayoutEntity
    {
        public List<FormControlData> Controls { get; set; } = [];
    }
}
