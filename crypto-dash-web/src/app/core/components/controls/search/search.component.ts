import { ChangeDetectionStrategy, Component, effect, ElementRef, output, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, filter, pairwise, startWith } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  // readonly value = input<string>();

  readonly onSearchTextChanged = output<string>();
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  protected readonly formControl: FormControl<string> = new FormControl('', { updateOn: 'change' });

  constructor() {
    // effect(() => {
    //   const value = this.value();
    //   this.formControl.setValue(value, { emitEvent: false });
    // });
    effect(() => this.searchInput()?.nativeElement?.focus());
    this.formControl.valueChanges.pipe(
      startWith(''),
      pairwise(),
      debounceTime(400),
      filter(([prev, curr]) => prev != curr),
      takeUntilDestroyed(),
    )
      .subscribe({ next: ([_, searchValue]) => this.onSearchTextChanged.emit(searchValue) });
  }
}
