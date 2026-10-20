import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ComboControlSettings } from '../../../../models/controls/combo-control-settings';
import { Item } from '../../../../models/controls/item';
import { Constants } from '../../../../utils/constants';
import { BaseControlComponent } from '../../base-control/base-control.component';
@Component({
  selector: 'app-base-select',
  template: ``,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class BaseSelectComponent<TData> extends BaseControlComponent<TData> {
  protected readonly searchText = signal<string>('');
  protected readonly isOpened = signal<boolean>(false);

  protected readonly noItemGroup = Constants.NO_ITEM_GROUP;
  protected readonly comboSettings = computed<ComboControlSettings>(() => this.settings() as ComboControlSettings);
  protected readonly items = computed<Item[]>(() => this.comboSettings().items);

  protected readonly filteredItems = computed<Item[]>(() => {
    const searchText = this.searchText().toLocaleLowerCase();
    if (searchText) {
      return this.items().filter(x => x.name.toLocaleLowerCase().includes(searchText));
    }
    return this.items();
  });

  protected readonly isGroupedItems = computed<boolean>(() => this.items().some(x => x.groupName));
  protected readonly filteredItemsGroups = computed<{ name: string, items: Item[]; }[]>(() => {
    const groups = this.filteredItems()
      .reduce((accumulator, item) => {
        const groupKey = item.groupName ?? Constants.NO_ITEM_GROUP;
        if (!accumulator.get(groupKey))
          accumulator.set(groupKey, [item]);
        else
          accumulator.get(groupKey).push(item);
        return accumulator;
      }, new Map<string, Item[]>);
    return Array.from(groups).map(x => ({ name: x[0], items: x[1] }));
  });

  constructor() {
    super();

  }

  protected onSearch(searchText: string): void {
    this.searchText.set(searchText);
  }

  protected onClosed(): void {
    this.searchText.set('');
  }

  protected onOpen(): void {

  }
}
