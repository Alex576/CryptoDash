import { Directive, effect, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appDynamicToolTip]',
  standalone: true,
  hostDirectives: [MatTooltip]
})
export class DynamicToolTipDirective implements OnInit, OnDestroy {
  readonly tooltipText = input.required<string>({ alias: 'appDynamicToolTip' });

  private readonly matTooltip = inject(MatTooltip);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  private readonly destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      this.matTooltip.message = this.tooltipText();
    });
  }

  ngOnInit(): void {
    this.updateTooltipVisibility();

    this.getResizeObservable()
      .pipe(
        debounceTime(50),
        takeUntil(this.destroy$)
      )
      .subscribe({ next: () => this.updateTooltipVisibility() });
  }

  private updateTooltipVisibility() {
    this.matTooltip.disabled = this.elementRef.nativeElement.scrollWidth <= this.elementRef.nativeElement.clientWidth;
  }

  private getResizeObservable(): Observable<ResizeObserverEntry[]> {
    return new Observable((sub) => {
      const resizeObs = new ResizeObserver((callback) => {
        sub.next(callback);
      });
      resizeObs.observe(this.elementRef.nativeElement);

      return () => resizeObs.disconnect();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
