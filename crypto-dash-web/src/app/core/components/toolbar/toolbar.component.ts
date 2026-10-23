import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { SidePanelType } from '../../models/side-panel/side-panel-type';
import { TileCode } from '../../models/tile-code';
import { NavigationService } from '../../services/navigation.service';
import { SidePanelService } from '../../services/side-panel.service';
import { ProfileComponent } from '../avatar/profile.component';
import { NotificationsComponent } from '../side-panel/notifications/notifications.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, ProfileComponent, MatButtonModule, MatIcon]
})
export class ToolbarComponent {
  private readonly navigationService = inject(NavigationService);
  private readonly sidePanelService = inject(SidePanelService);

  onLogout(): void {
    this.navigationService.navigateToLoginPage();
  }

  onOpenNotifications(): void {
    this.sidePanelService.openSidePanel({
      type: SidePanelType.Notifications,
      componentType: NotificationsComponent,
      tileCode: TileCode.None,
      data: undefined,
      header: 'Notifications'
    });
  }
}
