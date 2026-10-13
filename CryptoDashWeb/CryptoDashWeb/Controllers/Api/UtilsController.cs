using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Models.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CryptoDashWeb.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilsController : ControllerBase
    {
        private readonly ICoingeckoService _coingeckoService;

        public UtilsController(ICoingeckoService coingeckoService)
        {
            _coingeckoService = coingeckoService;
        }


        [HttpPost("[action]")]
        public async Task PullCoinList()
        {
            await _coingeckoService.PullCoinList();
        }

        [HttpPost("[action]")]
        public async Task PullCurrencies()
        {
            await _coingeckoService.PullCurrencies();
        }
    }
}
