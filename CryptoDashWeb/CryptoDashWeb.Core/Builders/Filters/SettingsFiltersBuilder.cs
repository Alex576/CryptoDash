using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Core.Builders.Filters
{
    public class SettingsFiltersBuilder : BaseFiltersBuilder<FiltersBuilderMockData>
    {
        public SettingsFiltersBuilder(List<FormControlData> formControlDatas) : base(formControlDatas)
        {

        }

        protected override List<Item> GetComboItems(FormControlData controlData)
        {
            return controlData.TileItemCode switch
            {
                TileItemCode.Tool => Enum.GetValues<ToolCode>().Select(x => new Item() { Id = (int)x, Name = x.ToString() }).ToList(),
                _ => throw new NotImplementedException(),
            };
        }

        protected override object GetValue(FormControl control, FormControlData controlData, FiltersBuilderMockData data)
        {
            return null;
        }
    }
}
