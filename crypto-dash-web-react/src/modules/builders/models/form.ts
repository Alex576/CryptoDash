export enum ControlType {
  Combo = 1,
  Input = 2,
  Toggle = 3,
}

export type ControlSettings = ComboSettings | InputSettings;

export abstract class BaseControlSettings {
  public isEditable: boolean;
  public isRequired: boolean;
  constructor({ isEditable = false, isRequired = true }: { isEditable?: boolean; isRequired?: boolean }) {
    this.isEditable = isEditable;
    this.isRequired = isRequired;
  }
}

export class InputSettings extends BaseControlSettings {
  constructor() {
    super({});
  }
}
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
    super({ isRequired });
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

export class Form {
  controls: FormControl[];
}
