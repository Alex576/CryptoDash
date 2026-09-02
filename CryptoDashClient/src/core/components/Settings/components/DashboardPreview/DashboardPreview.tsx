import { Card, CardContent, CardHeader } from "#components/ui/card";
import { SidePanel } from "@/core/components/SidePanel";
import {
  type DashboardItem,
  type DashboardPreviewData,
} from "@/core/features/settings/models/settings";
import { ToolCode } from "@/core/share/tool-code";
import {
  Responsive,
  useContainerWidth,
  type ResponsiveGridLayoutProps,
} from "react-grid-layout";

export interface DashboardPreviewProps {
  data: DashboardPreviewData;
}

export function DashboardPreview({ data }: DashboardPreviewProps) {
  const { width, containerRef, mounted } = useContainerWidth();
  const dashboardOptions: ResponsiveGridLayoutProps = {
    cols: data.layout.cols ?? { lg: 32, md: 26, sm: 20, xs: 12, xxs: 6 },
    width: width,
    rowHeight: data.layout.rowHeight || 40,
    children: undefined,
    // compactor: getCompactor(options.compactType),
    // onLayoutChange: (layout, layouts) => console.log(layout, layouts),
  };
  const dashboardContent = (item: DashboardItem) => {
    return (
      <Card
        className="h-full w-full"
        key={item.id}
        data-grid={{
          w: item.options.width,
          h: item.options.height,
          x: item.options.x,
          y: item.options.y,
          minW: item.options.minWidth,
          minH: item.options.maxWidth,
        }}
      >
        <CardHeader>{item.id}</CardHeader>
        <CardContent className="w-full h-full"></CardContent>
      </Card>
    );
  };
  return (
    <div className="h-full flex flex-col gap-1">
      <div className="flex">
        <SidePanel toolCode={ToolCode.Dashboard} />
      </div>
      <div className="grow bg-primary-foreground" ref={containerRef}>
        {mounted && (
          <Responsive {...dashboardOptions}>
            {data.items.map((item) => dashboardContent(item))}
          </Responsive>
        )}
      </div>
    </div>
  );
}
