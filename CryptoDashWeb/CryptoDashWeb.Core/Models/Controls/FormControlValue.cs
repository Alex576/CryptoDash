using Newtonsoft.Json.Linq;

namespace CryptoDashWeb.Core.Models.Controls
{
    public class FormControlValue
    {
        public string Id { get; set; }
        public JToken? Value { get; set; }
        public bool? Updated { get; set; }
    }
}