using CryptoDashWeb.Core.Builders.Controls;
using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Form;
using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
using CryptoDashWeb.Core.Utils;
using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Data.Services;
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
        private readonly TileCode _tileCode;
        private readonly ObjectContextService _objectContextService;
        private readonly ClassContextService _classContextService;

        public DashboardItemFormBuilder(List<FormControlData> formControlDatas, TileCode tileCode, ObjectContextService objectContextService, ClassContextService classContextService)
        {
            _formControlDatas = formControlDatas;
            _tileCode = tileCode;
            _objectContextService = objectContextService;
            _classContextService = classContextService;
        }

        public async Task<FormModel> GetForm(DashboardItemLayout data)
        {
            var form = new FormModel() { TileCode = _tileCode };
            foreach (var controlData in _formControlDatas)
            {
                var control = await GetControl(controlData);
                control.Value = GetControlValue(control, controlData, data);
                form.Controls.Add(control);

            }
            return form;
        }

        protected override async Task<List<Item>> GetComboItems(FormControlData controlData)
        {
            return controlData.TileItemCode switch
            {
                TileItemCode.Class => (await _classContextService.GetAll()).Select(x => new Item() { Id = x.Id, Name = x.Name }).ToList(),
                TileItemCode.Object => (await _objectContextService.GetAll()).Select(x => new Item() { Id = x.Id, Name = x.Name }).ToList(),
                TileItemCode.Currency => (await _objectContextService.GetByClass((int)ClassCode.Currency)).Select(x => new Item() { Id = x.Id, Name = x.Name }).ToList(),
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
                TileItemCode.Class => data.ClassCodes,
                TileItemCode.Object => data.ObjCodes,
                TileItemCode.DashboardType => data.Type,
                _ => null
            };
        }

        public void UpdateData(FormValues formValues, DashboardItemLayout data)
        {
            var controlIds = _formControlDatas.Select(ItemCodeHelper.GetItemCode).ToList();
            data.ObjCodes.Clear();
            foreach (var formValue in formValues.Controls)
            {
                //if (!formValue.Updated.HasValue || !formValue.Updated.Value)
                //    continue;

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
                case TileItemCode.Class when value.TryParseValue(out List<int> classes):
                    data.ClassCodes = classes;
                    break;
                case TileItemCode.Object when value.TryParseValue(out List<int> objs):
                    data.ObjCodes.AddRange(objs);
                    break;
                case TileItemCode.Currency when value.TryParseValue(out int obj):
                    data.ObjCodes.Add(obj);
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
