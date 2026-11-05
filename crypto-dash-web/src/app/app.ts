import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ThemeSwitcherService } from './core/services/theme-switcher.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('crypto-dash-web');
  private readonly darkThemeName = 'dark-theme';
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly themeSwitchService = inject(ThemeSwitcherService);

  constructor() {
    // this.translate.addLangs([Language.RU]);
    this.iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
    this.iconRegistry.addSvgIconSetInNamespace(
      'dash',
      this.sanitizer.bypassSecurityTrustResourceUrl('chart-previews.svg'),
    );
    this.themeSwitchService.init();
  }
}
