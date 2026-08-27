import { dashboardApiSlice } from "@/core/apiSlice";
import type { DashboardChartLayout } from "@/core/components/Dashboard/models/DashboardModels";
import { type GetDashboardItemDataModel } from "./models/dashboard";

export const subjectApiEndpoints = dashboardApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getChartData: builder.query<DashboardChartLayout, GetDashboardItemDataModel>({
            query: (args) => ({
                url: '/layout/getChartData',
                method: 'POST',
                body: args,
            }),
            providesTags: (result, err, args) => {
                return result ? [{ type: 'Chart', id: `${args.toolCode}_${args.id}` }] : [];
            }
        })
    }),
    overrideExisting: false,
});

export const { useGetChartDataQuery } = subjectApiEndpoints;
