import type { BaseDashboardItem, ResponsiveDashboardLayout } from "@/core/components/Dashboard/models/DashboardModels";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DashboardLayout } from "./models/layout";

interface DashboardSlice {
    items: BaseDashboardItem[];
    layout: ResponsiveDashboardLayout;
}

const initialState: DashboardSlice = {
    items: [],
    layout: {
        cols: {
            lg: 0,
            md: 0,
            sm: 0,
            xs: 0,
            xxs: 0
        },
        rowHeight: 0
    }
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setLayout: (
            state,
            action: PayloadAction<DashboardLayout>
        ) => {
            const { items, layout } = action.payload;
            state.items = items;
            state.layout = layout;
        },
        addLayoutItem: (
            state,
            action: PayloadAction<BaseDashboardItem>
        ) => {
            const { id, options, type } = action.payload;
            state.items.push({ id, options, type });
        },
    },
});

export const { addLayoutItem, setLayout } = layoutSlice.actions;
export default layoutSlice.reducer;
