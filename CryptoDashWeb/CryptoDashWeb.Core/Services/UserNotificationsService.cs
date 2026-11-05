using CryptoDashWeb.Core.Models.Notifications;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Data.Services;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Services
{
    public class UserNotificationsService : IUserNotificationsService
    {
        private readonly IDatabase _redisDB;
        private readonly ISessionService _sessionService;
        private readonly UserNotificationHistoryContextService _userNotificationHistoryContext;

        public UserNotificationsService(IConnectionMultiplexer redis, ISessionService sessionService, UserNotificationHistoryContextService userNotificationHistoryContext)
        {
            _redisDB = redis.GetDatabase();
            _sessionService = sessionService;
            _userNotificationHistoryContext = userNotificationHistoryContext;
        }

        public async Task<List<NotificationData>> GetUserNotifications()//think about server - client sinhronization! and apply migration
        {
            var userId = _sessionService.CurrentUser;
            var redisKey = GetRedisKey(userId);
            var nowUnix = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            await _redisDB.SortedSetRemoveRangeByRankAsync(redisKey, 0, nowUnix);
            var notifications = await _redisDB.SortedSetRangeByRankAsync(redisKey);
            return notifications
                .Where(x => x.HasValue)
                .Select(x => JsonConvert.DeserializeObject<NotificationData>(x!))
                .Where(x => x != null).ToList()!;
        }

        public async Task SaveUserNotification(NotificationData notification)
        {
            var userId = _sessionService.CurrentUser;
            var notificationId = await _userNotificationHistoryContext.SaveUserNotification(userId, notification.Title, notification.Message, notification.Status, notification.IsAlreadyRead);
            notification.Id = notificationId;
            var redisKey = GetRedisKey(userId);

            var expiredAtUnix = DateTimeOffset.UtcNow.AddDays(14).ToUnixTimeSeconds();
            await _redisDB.SortedSetAddAsync(redisKey, JsonConvert.SerializeObject(notification), expiredAtUnix);
        }

        private string GetRedisKey(int userId) => $"notifications_set:{userId}";
    }
}
