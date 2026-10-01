using CryptoDashWeb.Core.Builders.Controls;
using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Form;
using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
using CryptoDashWeb.Core.Utils;
using CryptoDashWeb.Data.Utils;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Builders.Forms
{
    public class DashboardItemFormBuilder : BaseControlBuilder<DashboardItemLayout>
    {
        private List<FormControlData> _formControlDatas;

        public DashboardItemFormBuilder(List<FormControlData> formControlDatas)
        {
            _formControlDatas = formControlDatas;
        }

        public FormModel GetForm(DashboardItemLayout data)
        {
            var form = new FormModel();
            foreach (var controlData in _formControlDatas)
            {
                var control = GetControl(controlData);
                control.Value = GetControlValue(control, controlData, data);
                form.Controls.Add(control);

            }
            return form;
        }

        protected override List<Item> GetComboItems(FormControlData controlData)
        {
            return controlData.TileItemCode switch
            {
                TileItemCode.Classes => throw new NotImplementedException(),
                TileItemCode.Objects => throw new NotImplementedException(),
                TileItemCode.DashboardType => GetItemsByEnum<DashboardType>(),
                _ => []
            };
        }

        private static List<Item> GetItemsByEnum<T>() where T : struct, Enum =>
            Enum.GetValues<T>().Select(x => new Item() { Id = Convert.ToInt32(x), Name = x.ToString() }).ToList();

        protected override object? GetValue(FormControl control, FormControlData controlData, DashboardItemLayout data)
        {
            return controlData.TileItemCode switch
            {
                TileItemCode.Name => data.Name,
                TileItemCode.Classes => throw new NotImplementedException(),
                TileItemCode.Objects => throw new NotImplementedException(),
                TileItemCode.DashboardType => data.Type,
                _ => null
            };
        }

        public void UpdateData(FormValues formValues, DashboardItemLayout data)
        {
            var controlIds = _formControlDatas.Select(ItemCodeHelper.GetItemCode).ToList();
            foreach (var formValue in formValues.Controls)
            {
                if (!formValue.Updated.HasValue || !formValue.Updated.Value)
                    continue;

                var controlIndex = controlIds.FindIndex(x => x == formValue.Id);
                if (controlIndex < 0)
                {
                    continue;
                }
                var controlData = _formControlDatas[controlIndex];
                UpdateDataByControlValue(data, controlData, formValue.Value);
            }
        }

        protected override void UpdateDataByControlValue(DashboardItemLayout data, FormControlData controlData, JToken? value)
        {
            switch (controlData.TileItemCode)
            {
                case TileItemCode.Id:
                    break;
                case TileItemCode.Tool:
                    break;
                case TileItemCode.TileItem:
                    break;
                case TileItemCode.State:
                    break;
                case TileItemCode.Name when value.TryParseValue(out string name):
                    data.Name = name;
                    break;
                case TileItemCode.Classes:
                    break;
                case TileItemCode.Objects:
                    break;
                case TileItemCode.DashboardType when value.TryParseValue(out DashboardType dashboardType):
                    data.Type = dashboardType;
                    break;
                default:
                    break;
            }
        }
    }
}
