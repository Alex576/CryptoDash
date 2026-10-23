import { computed, inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationData } from '../models/notifications/notification-data';
import { NotificationStatus } from '../models/notifications/notification-status';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly toast = inject(ToastrService);
  private readonly notifications = signal<NotificationData[]>([], { equal: () => false });

  readonly notificationsData = computed<NotificationData[]>(() => this.notifications());

  notify(message: string): void {
    this.showNotification(null, message, NotificationStatus.Success);
  }

  notifyError(message: string): void {
    this.showNotification(null, message, NotificationStatus.Error);
  }

  notifyWarning(message: string): void {
    this.showNotification(null, message, NotificationStatus.Warning);
  }

  readAllNotifications(): void {
    this.notifications.update(notifications => {
      notifications.forEach(x => x.isAlreadyRead = true);
      return notifications;
    });
  }

  private showNotification(title: string, message: string, status: NotificationStatus): void {
    const data: NotificationData = {
      id: this.notifications().length ? Math.max(... this.notifications().map(x => x.id)) + 1 : 0,
      title,
      message,
      status,
    };
    this.notifications.update(notifications => {
      notifications.push(data);
      return notifications;
    });
    if (status === NotificationStatus.Success) {
      this.toast.success(message, title);
    }
    else if (status === NotificationStatus.Warning) {
      this.toast.warning(message, title);
    } else if (status === NotificationStatus.Error) {
      this.toast.error(message, title);
    }
  }
}
