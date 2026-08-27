import { ToolModel } from '../../layout/models/tool-model';
import { ObjectModel } from '../../object-entities/models/object-model';

export interface SettingsDataModel {
  objs: ObjectModel[];
  tools: ToolModel[];
}
