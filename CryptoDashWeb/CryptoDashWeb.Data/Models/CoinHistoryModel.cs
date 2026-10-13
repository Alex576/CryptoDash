using CryptoDashWeb.Data.DBModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CryptoDashWeb.Data.Models
{
    public class CoinHistoryModel
    {
        public int Id { get; set; }
        public int ObjectId { get; set; }
        public DateTime Date { get; set; }
        public CoinPriceHistoryData HistoryData { get; set; }
        public CoinHistoryModel()
        {

        }
        public CoinHistoryModel(CoinHistory data)
        {
            Id = data.Id;
            ObjectId = data.ObjectId;
            Date = data.Date;
            HistoryData = data.HistoryData;
        }
    }
}
