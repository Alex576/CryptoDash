import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { NavigationService } from '../../services/navigation.service';
import { ProfileComponent } from '../avatar/profile.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, ProfileComponent, MatButtonModule, MatIcon]
})
export class ToolbarComponent {
  // private readonly toolbarService = inject(ToolbarService);
  private readonly navigationService = inject(NavigationService);

  onLogout(): void {
    this.navigationService.navigateToLoginPage();
  }
}
