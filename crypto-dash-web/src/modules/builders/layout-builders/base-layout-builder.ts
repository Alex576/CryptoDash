import { FormControlData } from '../../settings/models/control-models';

export abstract class BaseLayoutBuilder {
  abstract buildControls(): FormControlData[];
}
