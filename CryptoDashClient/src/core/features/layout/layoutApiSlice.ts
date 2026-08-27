import { layoutApiSlice } from "@/core/apiSlice";
import type { ToolCode } from "@/core/share/tool-code";
import type { AddLayoutItemRequest, AddLayoutItemResponse, DashboardLayout } from "./models/layout";

export const subjectApiEndpoints = layoutApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLayout: builder.query<DashboardLayout, { tool: ToolCode; }>({
            query: ({ tool }) => ({
                url: '/layout/getLayout',
                method: 'GET',
                params: { tool }
            }),
            providesTags: ['Layout']
        }),
        addLayoutItem: builder.mutation<AddLayoutItemResponse, AddLayoutItemRequest>({
            query: (chart) => ({
                url: '/layout/addLayoutItem',
                method: 'POST',
                body: chart
            }),
        }),
        saveLayout: builder.mutation<void, DashboardLayout>({
            query: (layout) => ({
                url: '/layout/saveLayout',
                method: 'POST',
                body: layout
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetLayoutQuery, useSaveLayoutMutation, useAddLayoutItemMutation } = subjectApiEndpoints;
