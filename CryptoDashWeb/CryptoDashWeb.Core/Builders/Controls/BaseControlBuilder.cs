using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Controls.Settings;
using Newtonsoft.Json.Linq;

namespace CryptoDashWeb.Core.Builders.Controls
{
    public abstract class BaseControlBuilder<TData> where TData : class
    {
        private string GetControlId(FormControlData controlData, int index = 0) => $"{controlData.TileItemCode}_${index}";
        protected FormControl GetControl(FormControlData controlData, int index = 0)
        {
            var control = new FormControl
            {
                Id = GetControlId(controlData, index),
                Name = controlData.Name,
                TileItemCode = controlData.TileItemCode,
                Settings = GetControlSettings(controlData),
                Type = controlData.Type,
            };
            return control;
        }

        private ControlSettings GetControlSettings(FormControlData controlData)
        {
            var settings = controlData.Type switch
            {
                ControlType.Combo => GetComboSettings(controlData),
                ControlType.Input => new InputSettings(),
                ControlType.Toggle => throw new NotImplementedException(),
                _ => throw new NotImplementedException(),
            };
            settings.Required = IsRequired(controlData);
            settings.Editable = IsEditable(controlData);
            return settings;
        }

        private ControlSettings GetComboSettings(FormControlData controlData)
        {
            var settings = new ComboSettings
            {
                AllowMultiple = IsAllowMultiple(controlData),
                Items = GetComboItems(controlData)
            };
            return settings;
        }
        protected abstract List<Item> GetComboItems(FormControlData controlData);

        protected abstract object GetValue(FormControl control, FormControlData controlData, TData data);
        protected JToken? GetControlValue(FormControl control, FormControlData controlData, TData data)
        {
            var value = GetValue(control, controlData, data);
            if (value != null)
                return JToken.FromObject(value);

            if (IsSelectFirstValueIfEmpty(controlData))
            {
                value = GetFirstValue(control);
                return value == null ? null : JToken.FromObject(value);
            }

            return null;

            object? GetFirstValue(FormControl control)
            {
                if (control.Settings is ComboSettings comboSettings)
                {
                    if (comboSettings.AllowMultiple)
                    {
                        return comboSettings.Items.Count > 0 ? new List<int> { comboSettings.Items.First().Id } : GetDefaultControlValue(control);
                    }
                    else
                    {
                        return comboSettings.Items.Count > 0 ? comboSettings.Items.First().Id : GetDefaultControlValue(control);
                    }
                }

                return null;
            }
        }

        private object? GetDefaultControlValue(FormControl control)
        {
            return control.TileItemCode switch
            {
                _ => GetDefaultControlValueByType(control),
            };
        }

        private object? GetDefaultControlValueByType(FormControl control)
        {
            return control.Type switch
            {
                ControlType.Combo when control.Settings is ComboSettings comboSettings => comboSettings.AllowMultiple ? new List<int>() : null,
                ControlType.Input => null,
                ControlType.Toggle => false,
                _ => throw new NotImplementedException(),
            };
        }

        protected bool IsRequired(FormControlData controlData) => controlData.States.Contains(ControlState.Required);
        protected bool IsEditable(FormControlData controlData) => controlData.States.Contains(ControlState.Editable);
        protected bool IsAllowMultiple(FormControlData controlData) => controlData.States.Contains(ControlState.AllowMultiple);
        protected bool IsSelectFirstValueIfEmpty(FormControlData controlData) => controlData.States.Contains(ControlState.SelectFirstValueIfEmpty);

    }
}
