using CryptoDashWeb.Data.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace CryptoDashWeb.Data.Utils
{
    public static class Extensions
    {
        public static bool TryParseValue<T>(this JToken? value, [NotNullWhen(true)] out T result)
        {
            if (value == null)
            {
                result = default;
                return false;
            }

            try
            {
                result = value.ToObject<T>();
                return result != null;
            }
            catch (Exception)
            {
                result = default;
                return false;
            }
        }
        public static bool TryParseValue(this JToken? value, Type dataType, [NotNullWhen(true)] out object result)
        {
            if (value == null)
            {
                result = default;
                return false;
            }

            try
            {
                result = value.ToObject(dataType);
                return result != null;
            }
            catch (Exception)
            {
                result = default;
                return false;
            }
        }

    }
}
