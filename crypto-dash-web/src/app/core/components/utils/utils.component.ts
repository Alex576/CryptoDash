import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';
import { UtilsService } from './utils.service';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss'],
  imports: [MatButtonModule],
  providers: [UtilsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilsComponent {
  private readonly service = inject(UtilsService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly isPullingCoinList = signal<boolean>(false);
  protected readonly isPullingCurrencies = signal<boolean>(false);
  constructor() { }

  pullCoinList(): void {
    this.isPullingCoinList.set(true);
    this.service.pullCoinList()
      .pipe(
        tap({ next: () => this.isPullingCoinList.set(false) }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  pullCurrencies(): void {
    this.isPullingCurrencies.set(true);
    this.service.pullCurrencies()
      .pipe(
        tap({ next: () => this.isPullingCurrencies.set(false) }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
