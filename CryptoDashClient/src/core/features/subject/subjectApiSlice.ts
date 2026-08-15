import { subjectApiSlice } from "@/core/apiSlice";
import type { GetSubjectResponse } from "./models/subject";

export const subjectApiEndpoints = subjectApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubjects: builder.query<GetSubjectResponse, void>({
            query: () => ({
                url: '/crypto-engine/getAll',
                method: 'GET',
            }),
        }),
    }),
    // Позволяет повторно внедрять эндпоинты при горячей перезагрузке (HMR) в Vite
    overrideExisting: false,
});

// RTK Query автоматически генерирует хуки на основе имени эндпоинта
// Название строится по шаблону: use + [ИмяЭндпоинта] + [Mutation или Query]
export const { useGetAllSubjectsQuery } = subjectApiEndpoints;
