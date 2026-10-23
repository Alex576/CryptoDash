import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

    protected get tileCode(): TileCode {
        return this.panelData.tileCode;
    }

    protected onClose(): void {
        this.sidePanelService.close();
    }
}
