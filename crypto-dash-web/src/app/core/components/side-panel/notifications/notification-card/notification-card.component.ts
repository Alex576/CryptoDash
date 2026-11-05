import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { NotificationData } from '../../../../models/notifications/notification-data';
import { NotificationStatus } from '../../../../models/notifications/notification-status';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardHeader, MatCardContent, MatCardTitle, MatCardSubtitle, DatePipe]
})
export class NotificationCardComponent {
  readonly item = input.required<NotificationData>();

  protected readonly title = computed<string>(() => this.item().title);
  protected readonly message = computed<string>(() => this.item().message);
  protected readonly isAlreadyRead = computed<boolean>(() => this.item().isAlreadyRead);
  protected readonly createdAt = computed<Date>(() => this.item().createdAt);

  protected readonly isSuccess = computed<boolean>(() => this.item().status === NotificationStatus.Success);
  protected readonly isWarning = computed<boolean>(() => this.item().status === NotificationStatus.Warning);
  protected readonly isError = computed<boolean>(() => this.item().status === NotificationStatus.Error);
}
