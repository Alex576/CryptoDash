import type { OperationResult } from "./operation-result";

export interface OperationResultData<T = unknown> extends OperationResult {
    data: T;
}