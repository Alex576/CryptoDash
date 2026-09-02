import { MigrationInterface, QueryRunner } from 'typeorm';
import { Layout } from '../../modules/layout/entities/layout';
import { LayoutCode } from '../../modules/layout/models/layout-code';
import { LayoutTypeCode } from '../../modules/layout/models/layout-type-code';
import { ToolCode } from '../../modules/layout/models/tool-code';

export class InsertDashboardLayout1788006213917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repo = queryRunner.manager.getRepository(Layout);

    const layoutRoot = await addDashboardLayout(
      LayoutCode.DashboardLayout,
      'Dashboard Layout',
      LayoutTypeCode.Layout,
      null,
    );
    await addDashboardLayout(LayoutCode.DashboardFilters, 'Dashboard Filters', LayoutTypeCode.Filter, layoutRoot);
    await addDashboardLayout(
      LayoutCode.DashboardDashboard,
      'Dashboard Dashboard',
      LayoutTypeCode.Dashboard,
      layoutRoot,
    );

    async function addDashboardLayout(
      id: LayoutCode,
      name: string,
      type: LayoutTypeCode,
      parent: Layout,
    ): Promise<Layout> {
      const layout = new Layout();
      layout.id = id;
      layout.name = name;
      layout.toolId = ToolCode.Dashboard;
      layout.typeId = type;
      layout.parent = parent;
      await repo.save(layout);
      return layout;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repo = queryRunner.manager.getRepository(Layout);
    const entity = await repo.findOneBy({ id: LayoutCode.DashboardLayout });
    if (entity) {
      await repo.remove(entity);
    }
  }
}
