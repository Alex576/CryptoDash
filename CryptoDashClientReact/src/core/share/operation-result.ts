import type { ResultCode } from "./result-code";

export interface OperationResult {
    code: ResultCode;
    description?: string;
}