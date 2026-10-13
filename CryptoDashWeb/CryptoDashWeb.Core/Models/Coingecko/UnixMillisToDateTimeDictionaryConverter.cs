using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Coingecko
{
    public class UnixMillisToDateTimeDictionaryConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(Dictionary<long, float>);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var dictionary = new Dictionary<long, float>();
            var token = JToken.Load(reader);

            if (token.Type == JTokenType.Array)
            {
                foreach (var item in token)
                {
                    if (item is JArray point && point.Count >= 2)
                    {
                        long ms = point[0].Value<long>();
                        //DateTime dateTime = DateTimeOffset.FromUnixTimeMilliseconds(ms).UtcDateTime;

                        float price = point[1].Value<float>();

                        dictionary[ms] = price;
                        //dictionary[dateTime] = price;
                    }
                }
            }

            return dictionary;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}
