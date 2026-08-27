export enum ControlType {
  Combo = 1,
  Input = 2,
  Toggle = 3,
}

export type ControlSettings = ComboSettings | InputSettings;

export abstract class BaseControlSettings {
  constructor(public isRequired: boolean = false) {}
}

export class InputSettings extends BaseControlSettings {}
export class ComboSettings extends BaseControlSettings {
  public items: Item[];
  public isMultiple: boolean;

  constructor({
    items,
    isMultiple = false,
    isRequired = false,
  }: {
    items: Item[];
    isMultiple?: boolean;
    isRequired?: boolean;
  }) {
    super(isRequired);
    this.items = items;
    this.isMultiple = isMultiple;
  }
}

export interface FormControl {
  id: string;
  name: string;
  type: ControlType;
  settings: ControlSettings;
  value: unknown;
}

export interface Item {
  id: number;
  name: string;
}
