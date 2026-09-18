import { settingsApiSlice } from "@/core/apiSlice";
import type { FormValues } from "@/core/components/Form/models/FormModels";
import type { FormUpdateModel } from "@/core/share/models/form-update-model";
import type { ToolCode } from "@/core/share/tool-code";
import type { FormData, GetSettingsFiltersModel, GetSettingsLayoutModel, SettingFilters, SettingsLayout } from "./models/settings";
export interface GetSettingsFormModel {
    toolCode: ToolCode;
    formValues?: FormValues;
}

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
                method: 'GET',
                params: data,
            }),
        }),
        getSettingsForm: builder.query<FormData, GetSettingsFormModel>({
            query: (data) => ({
                url: '/settings/getForm',
                method: 'POST',
                body: data,
            })
        }),
        updateSettingsForm: builder.mutation<FormData, FormUpdateModel>({
            query: (data) => ({
                url: '/settings/updateForm',
                method: 'POST',
                body: data,
            })
        }),
        saveSettingsForm: builder.mutation<boolean, unknown>({
            query: (data) => ({
                url: '/settings/saveForm',
                method: 'POST',
                body: data
            })
        })

    }),
    overrideExisting: false,
});

export const { useGetLayoutQuery, useGetFiltersQuery, useGetSettingsFormQuery, useSaveSettingsFormMutation, useUpdateSettingsFormMutation } = subjectApiEndpoints;
