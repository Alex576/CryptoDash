using CryptoDashWeb.Core.Builders.Controls;
using CryptoDashWeb.Core.Models;
using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Form;
using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
using CryptoDashWeb.Core.Models.Settings.LayoutEntities;
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
    public class DashboardItemFormBuilder : BaseControlBuilder<DashboardItemLayoutEx>
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

        public async Task<FormModel> GetForm(DashboardItemLayoutEx data)
        {
            await data.Initialize(_objectContextService);
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
                TileItemCode.Object => (await _objectContextService.GetByClass(controlData.ControlMasterData.ClassCodes)).Select(x => new Item() { Id = x.Id, Name = x.Name }).ToList(),
                //TileItemCode.Currency => (await _objectContextService.GetByClass((int)ClassCode.Currency)).Select(x => new Item() { Id = x.Id, Name = x.Name }).ToList(),
                TileItemCode.DashboardType => GetItemsByEnum<DashboardType>(),
                TileItemCode.DataView => GetItemsByEnum<DashboardDataView>(),
                _ => []
            };
        }

        private static List<Item> GetItemsByEnum<T>() where T : struct, Enum =>
            Enum.GetValues<T>().Select(x => new Item() { Id = Convert.ToInt32(x), Name = x.ToString() }).ToList();

        protected override object? GetValue(FormControl control, FormControlData controlData, DashboardItemLayoutEx data)
        {
            return controlData.TileItemCode switch
            {
                TileItemCode.Name => data.Name,
                TileItemCode.Class => data.ClassCodes,
                TileItemCode.Object => GetControlObjectValue(controlData, data),
                TileItemCode.DashboardType => data.Type,
                TileItemCode.DataView => data.DataView,
                _ => null
            };
        }

        private object? GetControlObjectValue(FormControlData controlData, DashboardItemLayoutEx data)
        {
            if (controlData.Type == ControlType.Combo)
            {
                if (controlData.States.Contains(ControlState.AllowMultiselect))
                    return data.Objects.IntersectBy(controlData.ControlMasterData.ClassCodes, x => (int)x.ClassCode).Select(x => x.Id).ToList();
                else
                    return data.Objects.IntersectBy(controlData.ControlMasterData.ClassCodes, x => (int)x.ClassCode).FirstOrDefault()?.Id;
            }
            return data.Objects.IntersectBy(controlData.ControlMasterData.ClassCodes, x => (int)x.ClassCode).FirstOrDefault()?.Id;
        }

        public async Task UpdateData(FormValues formValues, DashboardItemLayoutEx data)
        {
            await data.Initialize(_objectContextService);

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
                await UpdateDataByControlValue(data, controlData, formValue.Value);
            }
            data.UpdateVariableValues();
        }

        protected override async Task UpdateDataByControlValue(DashboardItemLayoutEx data, FormControlData controlData, JToken? value)
        {
            switch (controlData.TileItemCode)
            {
                case TileItemCode.Name when value.TryParseValue(out string name):
                    data.Name = name;
                    break;
                case TileItemCode.Class when value.TryParseValue(out List<int> classes):
                    data.ClassCodes = classes;
                    break;
                case TileItemCode.Object when controlData.Type == ControlType.Combo:
                    {
                        if (controlData.States.Contains(ControlState.AllowMultiselect))
                        {
                            if (value.TryParseValue(out List<int> objs))
                                data.SetObjects(await _objectContextService.Get(objs));
                        }
                        else if (value.TryParseValue(out int obj))
                            data.SetObjects(await _objectContextService.Get(obj));
                    }
                    break;
                case TileItemCode.DashboardType when value.TryParseValue(out DashboardType dashboardType):
                    data.Type = dashboardType;
                    break;
                case TileItemCode.DataView when value.TryParseValue(out DashboardDataView dashboardDataView):
                    data.DataView = dashboardDataView;
                    break;
                default:
                    break;
            }
        }
    }
}
