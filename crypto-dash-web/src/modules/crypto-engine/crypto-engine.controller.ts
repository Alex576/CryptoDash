import { Controller, Get } from '@nestjs/common';
import { Column, Grid, Row } from '../../share/grid/grid';
import { CryptoEngineService } from './crypto-engine/crypto-engine.service';
import { SubjectModel, SubjectTableModel } from './models/subject.model';

@Controller('crypto-engine')
export class CryptoEngineController {
  constructor(private readonly service: CryptoEngineService) {}

  @Get('getAll')
  async getAll(): Promise<SubjectTableModel> {
    const data = await this.service.getAllSubjects();
    const layout: { field: keyof SubjectModel }[] = [{ field: 'coinId' }, { field: 'symbol' }, { field: 'name' }];
    const cols: Column[] = [
      {
        name: 'id',
        id: '0',
      },
      {
        name: 'symbol',
        id: '1',
      },
      {
        name: 'name',
        id: '2',
      },
    ]; //check col order!!

    const grid: Grid = {
      layout: {
        columns: cols,
      },
      data: data.map((row, index) => {
        // const cells: Cell<SubjectModel>[] = Object.keys(row).map(
        //   (c) => ({ field: c, data: row[c] }) as Cell<SubjectModel>,
        // );
        const rowData: Row = {
          id: index.toString(),
          // cells,
          // data: row,
          data: layout.map((x) => row[x.field]),
        };
        return rowData;
      }),
    };
    return { grid };
  }
}
