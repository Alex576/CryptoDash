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
    }
}
