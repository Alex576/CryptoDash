import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { BaseSidePanelComponent } from '../base-side-panel.component';
import { SidePanelViewComponent } from '../side-panel-view/side-panel-view.component';
import { NotificationCardComponent } from './notification-card/notification-card.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidePanelViewComponent, NotificationCardComponent]
})
export class NotificationsComponent extends BaseSidePanelComponent {
  private readonly service = inject(NotificationService);

  protected readonly notifications = this.service.notificationsData;

  protected override onClose(): void {
    this.service.readAllNotifications();
    super.onClose();
  }
}
