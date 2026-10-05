import type { Grid } from "@/core/share/grid/grid";

export interface GetSubjectResponse {
    grid?: Grid;
}

export interface SubjectModelResponse {
    id: string;
    coinId: string;
    symbol: string;
    name: string;
}
