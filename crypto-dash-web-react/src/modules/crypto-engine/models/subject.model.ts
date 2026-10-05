import { Grid } from '../../../share/grid/grid';

export interface SubjectModel {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
}

export interface SubjectTableModel {
  grid: Grid;
}
