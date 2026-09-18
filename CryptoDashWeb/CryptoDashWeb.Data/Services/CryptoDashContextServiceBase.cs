using CryptoDashWeb.Data.DBContext;

namespace CryptoDashWeb.Data.Services
{
    public abstract class CryptoDashContextServiceBase
    {
        protected readonly CryptoDashContext _context;

        public CryptoDashContextServiceBase(CryptoDashContext context)
        {
            _context = context;
        }
    }
}
