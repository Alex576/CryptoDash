using CryptoDashWeb.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CryptoDashWeb.Data.DBModels
{
    public class UserNotificationHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public UserNotificationHistoryEntity Data { get; set; }
        public bool IsRead { get; set; }
    }
}
