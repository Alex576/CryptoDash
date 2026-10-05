using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Models
{
    public class FormEditorModel
    {
        public FormValues? FormValues { get; set; }
        public TileCode TileCode { get; set; }
        public string ItemId { get; set; }
    }
}
