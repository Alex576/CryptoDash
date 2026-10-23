import { NotificationStatus } from "./notification-status";

export interface NotificationData {
    id: number;
    status: NotificationStatus;
    title: string;
    message: string;
    isAlreadyRead?: boolean;
}
