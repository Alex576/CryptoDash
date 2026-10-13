namespace CryptoDashWeb.Core.Models.Settings.LayoutEntities
{
    public class DashboardItemOptions
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Rows { get; set; }
        public int Cols { get; set; }
        public int? LayerIndex { get; set; }
        public bool? DragEnabled { get; set; }
        public bool? ResizeEnabled { get; set; }
        public bool? CompactEnabled { get; set; }
        public int? ItemAspectRatio { get; set; }
        public int? MaxItemRows { get; set; }
        public int? MinItemRows { get; set; }
        public int? MaxItemCols { get; set; }
        public int? MinItemCols { get; set; }
        public int? MinItemArea { get; set; }
        public int? MaxItemArea { get; set; }
    }
}