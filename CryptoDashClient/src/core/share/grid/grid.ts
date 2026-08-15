// export interface Grid<T> {
//   layout: Layout<T>;
//   data: Row<T>[];
// }

// export interface Layout<T> {
//   header: LayoutHeader<T>[];
// }

// export interface LayoutHeader<D, T extends keyof D = keyof D> {
//   name: string;
//   field: T;
// }

// export interface Row<T> {
//   id: string;
//   data: T;

//   // cells: Cell<T>[];
// }

// export interface Cell<D, T extends keyof D = keyof D> {
//   field: T;
//   data: unknown;
// }

export interface Grid {
  layout: Layout;
  data: Row[];
}

export interface Layout {
  columns: LayoutHeader[];
}

export interface LayoutHeader {
  id: string;
  name: string;
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
