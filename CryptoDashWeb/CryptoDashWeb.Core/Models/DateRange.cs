using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models
{
    public class DateRange
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }

        public DateRange(DateTime from, DateTime to)
        {
            From = from.ToUniversalTime();
            To = to.ToUniversalTime();
        }

        public int GetDays() => (To - From).Days + 1;

    }
}
