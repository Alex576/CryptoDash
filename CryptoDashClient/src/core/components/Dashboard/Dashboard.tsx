import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader } from "#components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#components/ui/sheet";
import {
  useAddLayoutItemMutation,
  useGetLayoutQuery,
} from "@/core/features/layout/layoutApiSlice";
import { addLayoutItem } from "@/core/features/layout/layoutSlice";
import { ToolCode } from "@/core/share/tool-code";
import { useAppDispatch } from "@/core/store";
import {
  horizontalCompactor,
  noCompactor,
  Responsive,
  useContainerWidth,
  verticalCompactor,
  type Compactor,
  type ResponsiveGridLayoutProps,
} from "react-grid-layout";
import { Loading } from "../Loading/Loading";
import { DashboardItem } from "./DashboardItem/DashboardItem";
import { DashboardItemType } from "./models/DashboardModels";

export interface DashboardOptions {
  compactType: "horizontal" | "vertical" | null;
}
export interface DashboardProps {
  items?: DashboardItem[];
  options?: DashboardOptions;
}

function getCompactor(type: "horizontal" | "vertical" | null): Compactor {
  switch (type) {
    case "horizontal":
      return verticalCompactor;
    case "vertical":
      return horizontalCompactor;
    default:
      return noCompactor;
  }
}

export function Dashboard({
  options = { compactType: "horizontal" },
}: DashboardProps) {
  const dispatch = useAppDispatch();
  const { width, containerRef, mounted } = useContainerWidth();
  const [addChartReq] = useAddLayoutItemMutation();
  // const { layout, items } = useAppSelector((x) => x.layout);

  const {
    data: dashboard,
    isLoading,
    error,
    isError,
  } = useGetLayoutQuery({ tool: ToolCode.Dashboard });

  if (isLoading) return <Loading />;
  if (isError || !dashboard) return <div>Error</div>;

  const addChartHandler = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const result = await addChartReq({
        tool: ToolCode.Dashboard,
        type: DashboardItemType.Chart,
      }).unwrap();
      dispatch(addLayoutItem(result.options));
    } catch (err) {
      console.error(err);
    }
  };
  const dashboardOptions: ResponsiveGridLayoutProps = {
    cols: dashboard?.layout.cols ?? { lg: 32, md: 26, sm: 20, xs: 12, xxs: 6 },
    width: width,
    rowHeight: dashboard?.layout.rowHeight || 40,
    children: undefined,
    compactor: getCompactor(options.compactType),
    onLayoutChange: (layout, layouts) => console.log(layout, layouts),
  };

  return (
    <div className="h-full w-full flex flex-col gap-2.5">
      <div className="pl-2.5 pr-2.5">
        <Sheet>
          <SheetTrigger render={<Button>Add Chart</Button>} />
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Chart</SheetTitle>
            </SheetHeader>

            <SheetFooter className="flex-row justify-between">
              <SheetClose
                render={<Button variant={"destructive"}>Close</Button>}
              ></SheetClose>
              <Button>Save</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grow" ref={containerRef}>
        {mounted && (
          <Responsive {...dashboardOptions}>
            {dashboard.items.map((item) => (
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
                <CardContent className="w-full h-full">
                  <DashboardItem
                    tool={ToolCode.Dashboard}
                    id={item.id}
                    type={item.type}
                  />
                </CardContent>
              </Card>
            ))}
          </Responsive>
        )}
      </div>
    </div>
  );
}
