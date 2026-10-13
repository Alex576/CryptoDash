namespace CryptoDashWeb.Core.Models.Controls.Settings
{
    public class ComboSettings : ControlSettings
    {
        public bool AllowMultiselect { get; set; }
        public List<Item> Items { get; set; }
    }
}
