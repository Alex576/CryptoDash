using CryptoDashWeb.Core.Builders.Controls;
using CryptoDashWeb.Core.Models.Controls;
using Newtonsoft.Json.Linq;

namespace CryptoDashWeb.Core.Builders.Filters
{
    public abstract class BaseFiltersBuilder<TData> : BaseControlBuilder<TData> where TData : class
    {
        private List<FormControlData> _formControlDatas;

        public BaseFiltersBuilder(List<FormControlData> formControlDatas)
        {
            _formControlDatas = formControlDatas;
        }

        public List<FormControl> GetFilters(TData data)
        {
            var filters = new List<FormControl>();
            for (int i = 0; i < _formControlDatas.Count; i++)
            {
                var controlData = _formControlDatas[i];
                var control = GetControl(controlData, i);
                control.Value = GetControlValue(control, controlData, data);
                filters.Add(control);
            }

            return filters;
        }
    }
}