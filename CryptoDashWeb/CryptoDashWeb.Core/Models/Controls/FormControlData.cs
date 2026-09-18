namespace CryptoDashWeb.Core.Models.Controls
{
    public class FormControlData
    {
        public string Name { get; set; }
        public TileItemCode TileItemCode { get; set; }
        public ControlType Type { get; set; }
        public List<ControlState> States { get; set; } = [];

        public ControlMasterData ControlMasterData { get; set; } = new();

        public List<ControlDependency> Dependencies { get; set; } = [];

    }
}
