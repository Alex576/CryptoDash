export interface Grid {
  layout: Layout;
  data: Row[];
}

export interface Layout {
  columns: Column[];
}

export interface Column {
  name: string;
  id: string;
}

export interface Row {
  id: string;
  data: unknown[];
  //   cells: Cell<T>[];
}

export interface Cell<D, T extends keyof D = keyof D> {
  field: T;
  data: unknown;
}
