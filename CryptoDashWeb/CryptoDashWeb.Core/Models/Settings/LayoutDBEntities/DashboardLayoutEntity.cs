using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Settings.LayoutDBEntities
{
    /// <summary>
    /// Stored in DB
    /// </summary>
    public class DashboardLayoutEntity
    {
        public List<DashboardItemLayout> Items { get; set; } = [];
    }

    public class DashboardItemLayout
    {
        public string Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        public string Name { get; set; }
        public DashboardType Type { get; set; }
        public List<int> ObjCodes { get; set; } = [];
        public List<int> ClassCodes { get; set; } = [];


        public DashboardItemLayout(int id = 0, string name = "")
        {
            Id = id.ToString();
            Name = name;
        }

    }
}
