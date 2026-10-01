import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormModel } from '../../models/form-editor/form-model';
import { FormValues } from '../../models/form-editor/form-values';
import { SIDE_PANEL_DATA } from '../../models/side-panel/side-panel-data-token';
import { TileCode } from '../../models/tile-code';
import { SidePanelService } from '../../services/side-panel.service';

@Component({
    selector: 'app-base-side-panel',
    template: ``,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseSidePanelComponent {
    protected readonly panelData = inject(SIDE_PANEL_DATA);
    protected readonly sidePanelService = inject(SidePanelService);
    protected readonly destroyRef = inject(DestroyRef);

    protected readonly form = signal<FormModel>(null);
    protected readonly canSaveForm = signal<boolean>(false);

    protected readonly isFormReady = computed<boolean>(() => !!this.form());

    protected get tileCode(): TileCode {
        return this.panelData.tileCode;
    }

    protected getFormUpdateModel(): FormValues {
        const form = this.form();
        const model: FormValues = new FormValues();
        for (let i = 0; i < form.controls.length; i++) {
            const control = form.controls[i];
            model.controls.push({ id: control.id, value: control.value, updated: control.updated });
        }
        return model;
    }

    protected onCanSaveForm(canSave: boolean): void {
        this.canSaveForm.set(canSave);
    }


    protected updateForm(newForm: FormModel): void {
        this.form.update((oldForm) => {
            for (let i = 0; i < newForm.controls.length; i++) {
                const control = newForm.controls[i];
                const oldControl = oldForm.controls.find(c => c.id === control.id);
                if (!oldControl) {
                    continue;
                }
                control.updated = oldControl.updated;
            }
            return newForm;
        });
    }
}
