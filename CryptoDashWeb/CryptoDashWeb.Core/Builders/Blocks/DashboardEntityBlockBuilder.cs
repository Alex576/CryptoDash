using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
using CryptoDashWeb.Core.Models.Settings.LayoutEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Builders.Blocks
{
    public class DashboardEntityBlockBuilder
    {
        private readonly DashboardLayoutEntity _layout;

        public DashboardEntityBlockBuilder(DashboardLayoutEntity layout)
        {
            _layout = layout;
        }

        public ILayoutEntity BuildBlocks()
        {
            var blocks = new DashboardSettingsEntity();
            foreach (var item in _layout.Items)
            {
                var block = new DashboardItem()
                {
                    Id = item.Id,
                    Name = item.Name,
                    Type = item.Type,
                    Options = new DashboardItemOptions()
                    {

                        X = item.X,
                        Y = item.Y,
                        Cols = item.Width,
                        Rows = item.Height,
                    }
                };
                blocks.Items.Add(block);
            }
            return blocks;

        }
    }
}
