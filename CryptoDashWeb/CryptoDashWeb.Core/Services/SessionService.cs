using CryptoDashWeb.Core.Services.Interfaces;

namespace CryptoDashWeb.Core.Services
{
    public class SessionService : ISessionService
    {
        public int CurrentUser { get; set; }
    }
}
