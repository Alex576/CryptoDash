import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TileCode } from '../../../models/tile-code';
import { BaseFormSidePanelComponent } from '../base-form-side-panel.component';
import { LayoutItemFormEditorModel } from './item-editor/layout-item-form-editor-model';

@Component({
    selector: 'app-base-layout-side-side-panel',
    template: ``,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseLayoutItemSidePanelComponent extends BaseFormSidePanelComponent {

    protected getLayoutItemFormUpdateModel(itemId: string, tileCode: TileCode): LayoutItemFormEditorModel {
        const updateModel = this.getFormUpdateModel();
        return { tileCode, itemId, formValues: updateModel };
    }
}
