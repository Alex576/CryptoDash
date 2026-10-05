import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { AvatarComponent } from 'ngx-avatar-2';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [AvatarComponent, MatFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  private readonly toolbarService = inject(ToolbarService);

  get userName(): string {
    return this.toolbarService.currentUser?.email ?? 'Error';
  }

}
