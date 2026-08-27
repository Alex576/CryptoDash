import { ClassModel } from './class-model';

export interface ObjectModel {
  id: number;
  name: string;
  displayName: string;
  class: ClassModel;
}
