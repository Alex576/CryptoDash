namespace CryptoDashWeb.Data.DBModels;

public partial class ObjectEntity
{
    public int Id { get; set; }

    public int ClassCode { get; set; }

    public string Name { get; set; } = null!;

    public string DisplayName { get; set; } = null!;

    public virtual ClassCode ClassCodeNavigation { get; set; } = null!;
}
