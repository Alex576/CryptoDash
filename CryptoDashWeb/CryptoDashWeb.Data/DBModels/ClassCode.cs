namespace CryptoDashWeb.Data.DBModels;

public partial class ClassCode
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<ObjectEntity> ObjectEntities { get; set; } = new List<ObjectEntity>();
}
