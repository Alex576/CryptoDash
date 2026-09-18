using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace CryptoDashWeb.Core.Converters
{
    public abstract class DefaultConverter<TData> : JsonConverter<TData>
    {
        public override void WriteJson(JsonWriter writer, TData? value, JsonSerializer serializer)
        {
            if (value == null)
            {
                writer.WriteNull();
                return;
            }
            writer.WriteStartObject();

            var properties = value.GetType().GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
            foreach (var prop in properties)
            {
                if (prop.GetCustomAttributes(typeof(JsonIgnoreAttribute), true).Any())
                    continue;
                var propName = serializer.ContractResolver is DefaultContractResolver resolver ? resolver.GetResolvedPropertyName(prop.Name) : prop.Name;
                writer.WritePropertyName(propName);
                serializer.Serialize(writer, prop.GetValue(value));
            }
            writer.WriteEndObject();
        }

        protected T GetValue<T>(string fieldName, JObject jsonObj)
        {
            var result = jsonObj.TryGetValue(fieldName, StringComparison.Ordinal, out var value) ? value.ToObject<T>() : default;
            return result == null ? throw new InvalidOperationException($"Failed to get {fieldName} value from json object") : result;
        }
    }
}
