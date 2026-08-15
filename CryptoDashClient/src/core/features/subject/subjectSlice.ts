import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetSubjectResponse } from "./models/subject";

interface SubjectModel {
    id: string;
    coinId: string;
    symbol: string;
    name: string;
}

const initialState: GetSubjectResponse = {};

const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        getAllSubjects: (
            state,
            action: PayloadAction<GetSubjectResponse>
        ) => {
            state.grid = action.payload.grid;
        },

    },
});

export const { getAllSubjects } = subjectSlice.actions;
export default subjectSlice.reducer;
