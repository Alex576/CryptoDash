using CryptoDashWeb.Data.DBContext;
using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Data.Services
{
    public class UserNotificationHistoryContextService : CryptoDashContextServiceBase
    {
        public UserNotificationHistoryContextService(CryptoDashContext context) : base(context)
        {
        }

        public async Task<UserNotificationHistory?> GetUserNotificationHistory(int notificationId)
        {
            return await _context.UserNotificationHistories.FirstOrDefaultAsync(x => x.Id == notificationId);
        }

        public async Task<List<UserNotificationHistory>> GetUserNotificationHistoriesByUser(int userId)
        {
            return await _context.UserNotificationHistories.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<int> SaveUserNotification(int userId, string? title, string? message, NotificationStatus status, bool? isRead)
        {
            var entity = new UserNotificationHistory()
            {
                UserId = userId,
                IsRead = isRead ?? false,
                Data = new UserNotificationHistoryEntity()
                {
                    CreatedAt = DateTime.UtcNow,
                    Title = title,
                    Message = message,
                    Status = status,
                }
            };
            _context.UserNotificationHistories.Add(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }
    }
}
