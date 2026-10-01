import { Component, inject, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('crypto-dash-web');
  private readonly darkThemeName = 'dark-theme';
  private readonly iconRegistry = inject(MatIconRegistry);

  constructor() {
    // this.translate.addLangs([Language.RU]);
    this.iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
    this.setTheme(this.darkThemeName);
  }

  private setTheme(themeName: string, saveTheme = true): void {
    // if (saveTheme) {
    //   this.storageService.saveValue(LocalStorageKeys.Theme, themeName);
    // }
    // document.body.dataset['agThemeMode'] = themeName;
    // document.body.classList.remove(...this.themeList);
    document.body.classList.add(themeName);
  }
}
