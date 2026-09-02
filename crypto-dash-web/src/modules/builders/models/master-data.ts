import { ObjectModel } from '../../object-entities/models/object-model';

export interface MasterData {
  objects: Map<number, ObjectModel>;
}
