using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Data.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Settings.LayoutEntities
{
    public class DashboardItemLayoutEx : DashboardItemLayout
    {
        public List<ObjectModel> Objects { get; set; }

        public DashboardItemLayoutEx(DashboardItemLayout item) : base(item)
        {
        }

        public async Task Initialize(ObjectContextService _objContext)
        {
            if (Objects == null)
            {
                Objects = await _objContext.Get(ObjCodes);
            }
        }

        public void SetObjects(ObjectModel obj) => SetObjects([obj]);

        public void SetObjects(List<ObjectModel> objects)
        {
            var classCodes = objects.Select(x => x.ClassCode).ToHashSet();
            Objects.RemoveAll(o => classCodes.Contains(o.ClassCode));
            Objects.AddRange(objects);
        }

        public void UpdateVariableValues()
        {
            ObjCodes = Objects.Select(x => x.Id).ToList();
        }

        public async Task UpdateVariableDataEx(ObjectContextService objContext)
        {
            Objects = await objContext.Get(ObjCodes);
        }
    }
}
