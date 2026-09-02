import { settingsApiSlice } from "@/core/apiSlice";
import type { GetSettingsFiltersModel, GetSettingsLayoutModel, SettingFilters, SettingsLayout } from "./models/settings";

export const subjectApiEndpoints = settingsApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLayout: builder.query<SettingsLayout, GetSettingsLayoutModel>({
            query: (data) => ({
                url: '/settings/getLayout',
                method: 'POST',
                body: data,
            }),
        }),
        getFilters: builder.query<SettingFilters, GetSettingsFiltersModel>({
            query: (data) => ({
                url: '/settings/getFilters',
                method: 'POST',
                body: data,
            }),
        }),

    }),
    overrideExisting: false,
});

export const { useGetLayoutQuery, useGetFiltersQuery } = subjectApiEndpoints;
