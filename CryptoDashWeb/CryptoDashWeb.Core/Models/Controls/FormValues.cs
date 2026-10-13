using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Data.Utils;
using System.Diagnostics.CodeAnalysis;

namespace CryptoDashWeb.Core.Models.Controls
{
    public class FormValues
    {
        public List<FormControlValue> Controls { get; set; } = [];

        public bool TryGetValue<T>(string controlId, [NotNullWhen(true)] out T value)
        {
            var control = Controls.FirstOrDefault(x => x.Id == controlId);
            if (control == null)
            {
                value = default;
                return false;
            }
            return control.Value.TryParseValue(out value);
        }
    }
}
