using CryptoDashWeb.Core.Models.UserSettings;
using CryptoDashWeb.Data.Models;
using System.Diagnostics.CodeAnalysis;

namespace CryptoDashWeb.Core.Utils
{
    public static class Extensions
    {
        public static bool TryGetValue<T>(this IEnumerable<T> values, Func<T, bool> condition, [NotNullWhen(true)] out T? result)
        {
            result = values.FirstOrDefault(condition);
            return result != null;
        }

        public static bool TryParseUserSettingsKey(this string settingsKey, out int userId, out ToolCode? toolCode, out TileCode? tileCode, out SettingsCode settingsCode)
        {
            userId = default;
            toolCode = default;
            settingsCode = default;
            tileCode = default;
            if (string.IsNullOrEmpty(settingsKey)) return false;

            Span<Range> ranges = stackalloc Range[5];
            var span = settingsKey.AsSpan();
            var count = span.Split(ranges, '_');
            if (count != 4) return false;

            userId = int.TryParse(span[ranges[0]], out var id) ? id : default;
            toolCode = Enum.TryParse(span[ranges[1]], out ToolCode toolValue) ? toolValue : default;
            tileCode = Enum.TryParse(span[ranges[2]], out TileCode tileValue) ? tileValue : default;
            settingsCode = Enum.TryParse(span[ranges[3]], out SettingsCode settingsValue) ? settingsCode : default;
            return true;

            //var parts = settingsKey.Split('_');
            //if (parts.Length != 3) return false;

            //if (!int.TryParse(parts[0], out userId)) return false;
            //if (!Enum.TryParse(parts[1], out toolCode)) return false;
            //if (!Enum.TryParse(parts[2], out settingsCode)) return false;

            //return true;
        }
    }
}
