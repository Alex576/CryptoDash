using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Controls.Settings;
using CryptoDashWeb.Core.Utils;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace CryptoDashWeb.Core.Builders.Controls
{
    public abstract class BaseControlBuilder<TData> where TData : class
    {
        protected virtual string GetControlId(FormControlData controlData) => ItemCodeHelper.GetItemCode(controlData);
        protected async Task<FormControl> GetControl(FormControlData controlData)
        {
            var control = new FormControl
            {
                Id = GetControlId(controlData),
                Name = controlData.Name,
                TileItemCode = controlData.TileItemCode,
                Settings = await GetControlSettings(controlData),
                Type = controlData.Type,
            };
            return control;
        }

        private async Task<ControlSettings> GetControlSettings(FormControlData controlData)
        {
            var settings = controlData.Type switch
            {
                ControlType.Combo => await GetComboSettings(controlData),
                ControlType.Input => new InputSettings(),
                ControlType.DateRange => GetDateRangeSettings(),
                _ => throw new NotImplementedException(),
            };
            settings.Required = IsRequired(controlData);
            settings.Editable = IsEditable(controlData);
            return settings;
        }

        protected virtual DateRangeSettings GetDateRangeSettings()
        {
            return new DateRangeSettings();
        }

        private async Task<ControlSettings> GetComboSettings(FormControlData controlData)
        {
            var settings = new ComboSettings
            {
                AllowMultiselect = IsAllowMultiple(controlData),
                Items = OrderItems(await GetComboItems(controlData)),
            };
            return settings;
        }

        protected List<Item> OrderItems(List<Item> items)
        {
            return items
                .OrderBy(x => string.IsNullOrEmpty(x.GroupName))
                .ThenBy(x => x.GroupName)
                .ThenBy(x => x.Name)
                .ToList();
        }
        protected abstract Task<List<Item>> GetComboItems(FormControlData controlData);
        protected abstract Task UpdateDataByControlValue(TData data, FormControlData controlData, JToken? value);

        protected abstract object? GetValue(FormControl control, FormControlData controlData, TData data);
        protected JToken? GetControlValue(FormControl control, FormControlData controlData, TData data)
        {
            var value = GetValue(control, controlData, data);
            if (value != null)
                return JToken.FromObject(value, new Newtonsoft.Json.JsonSerializer() { ContractResolver = new CamelCasePropertyNamesContractResolver() });

            if (IsSelectFirstValueIfEmpty(controlData))
            {
                value = GetFirstValue(control);
                return value == null ? null : JToken.FromObject(value, new Newtonsoft.Json.JsonSerializer() { ContractResolver = new CamelCasePropertyNamesContractResolver() });
            }

            if (controlData.TileItemCode == Models.TileItemCode.DateRange)
            {
                return JToken.FromObject(new DateRange(new DateTime(DateTime.UtcNow.Year, 1, 1), new DateTime(DateTime.UtcNow.Year, 12, 31)));
            }

            return null;

            object? GetFirstValue(FormControl control)
            {
                if (control.Settings is ComboSettings comboSettings)
                {
                    if (comboSettings.AllowMultiselect)
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
                ControlType.Combo when control.Settings is ComboSettings comboSettings => comboSettings.AllowMultiselect ? new List<int>() : null,
                ControlType.Input => null,
                _ => throw new NotImplementedException(),
            };
        }

        protected bool IsRequired(FormControlData controlData) => controlData.States.Contains(ControlState.Required);
        protected bool IsEditable(FormControlData controlData) => controlData.States.Contains(ControlState.Editable);
        protected bool IsAllowMultiple(FormControlData controlData) => controlData.States.Contains(ControlState.AllowMultiselect);
        protected bool IsSelectFirstValueIfEmpty(FormControlData controlData) => controlData.States.Contains(ControlState.SelectFirstValueIfEmpty);

    }
}
