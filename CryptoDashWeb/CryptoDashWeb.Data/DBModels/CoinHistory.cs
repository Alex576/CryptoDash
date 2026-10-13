using CryptoDashWeb.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CryptoDashWeb.Data.DBModels
{
    public class CoinHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int ObjectId { get; set; }

        [ForeignKey(nameof(ObjectId))]
        public virtual ObjectEntity ObjectEntity { get; set; } = null!;

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public CoinPriceHistoryData HistoryData { get; set; } = null!;
    }
}
