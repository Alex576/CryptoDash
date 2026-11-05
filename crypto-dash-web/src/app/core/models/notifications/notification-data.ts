import { NotificationStatus } from "./notification-status";

export interface NotificationData {
    id: number;
    status: NotificationStatus;
    createdAt: Date;
    title: string;
    message: string;
    isAlreadyRead?: boolean;
}
