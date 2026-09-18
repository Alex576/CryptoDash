namespace CryptoDashWeb.Core.Models.Controls.Settings
{
    public class ComboSettings : ControlSettings
    {
        public bool AllowMultiple { get; set; }
        public List<Item> Items { get; set; }
    }
}
