using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Controls.Settings;
using CryptoDashWeb.Data.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CryptoDashWeb.Core.Converters
{
    public class FormControlConverter : DefaultConverter<FormControl>
    {
        public override FormControl ReadJson(JsonReader reader, Type objectType, FormControl? existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            var jsonObj = JObject.Load(reader);
            var formControl = new FormControl
            {
                Id = GetValue<string>(nameof(FormControl.Id), jsonObj),
                Name = GetValue<string>(nameof(FormControl.Name), jsonObj),
                Type = GetValue<ControlType>(nameof(FormControl.Type), jsonObj),
                TileItemCode = GetValue<TileItemCode>(nameof(FormControl.TileItemCode), jsonObj),
                Value = GetValue<JToken?>(nameof(FormControl.Value), jsonObj)
            };

            formControl.Settings = formControl.Type switch
            {
                ControlType.Input => GetValue<InputSettings>(nameof(FormControl.Settings), jsonObj),
                ControlType.Combo => GetValue<ComboSettings>(nameof(FormControl.Settings), jsonObj),
                //ControlType.DateTime => GetValue<DateTimeControlSettings>(nameof(FormControl.Settings), jsonObj),
                //ControlType.Between => GetValue<BetweenControlSettings>(nameof(FormControl.Settings), jsonObj),
                _ => throw new NotImplementedException(),
            };

            return formControl;
        }
    }
}
