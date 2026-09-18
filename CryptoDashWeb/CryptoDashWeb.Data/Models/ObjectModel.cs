using CryptoDashWeb.Data.DBModels;

namespace CryptoDashWeb.Data.Models
{
    public class ObjectModel
    {
        public int Id { get; set; }

        public int ClassCode { get; set; }

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public ObjectModel(int id, int classCode, string name, string displayName)
        {
            Id = id;
            ClassCode = classCode;
            Name = name;
            DisplayName = displayName;
        }

        public ObjectModel(ObjectEntity obj) : this(obj.Id, obj.ClassCode, obj.Name, obj.DisplayName) { }

    }
}
