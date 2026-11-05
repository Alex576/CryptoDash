using CryptoDashWeb.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Notifications
{
    public class NotificationData
    {
        public int Id { get; set; }
        public NotificationStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Title { get; set; }
        public string? Message { get; set; }
        public bool? IsAlreadyRead { get; set; }
    }
}
