using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Data.Models
{
    public class UserNotificationHistoryEntity
    {
        public NotificationStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Title { get; set; }
        public string? Message { get; set; }
        public bool? IsRead { get; set; }
    }
}
