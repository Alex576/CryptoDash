import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "#components/ui/chart";
import { useGetChartDataQuery } from "@/core/features/dashboard/dashboardApiSlice";
import type { ToolCode } from "@/core/share/tool-code";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { Loading } from "../../Loading/Loading";

export interface ChartProps {
  id: number;
  tool: ToolCode;
}

export function Chart({ id, tool }: ChartProps) {
  const {
    data: chart,
    isError,
    isLoading,
  } = useGetChartDataQuery({ id, toolCode: tool });

  if (isLoading) return <Loading />;
  if (isError || !chart) return <div>Error</div>;
  const description = "A bar chart";
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
