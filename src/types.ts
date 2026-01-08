export enum NotifyLevel {
    INFO,
    ERROR,
}

export enum ModalType {
    CONFIRM,
    TEXT_INPUT,
}

export enum ItemType {
    FOLDER = "FOLDER",
    FILE = "FILE",
}

export enum HTTPMethods {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE",
}

export enum ProjectMode {
    PROD = "prod",
    DEV = "dev",
}
export type Item = {
    id: string | null;
    name: string;
    extension: string;
    size: number;
    size_prefix: string;
    content_type: string;
    type: ItemType;
    path: string;
    parentid: string | null;
    update_date: number;
    creation_date: number;
};

export type Account = {
    id: string;
    username: string;
    email: string;
    creation_date: string;
};

export type FailuresAndSuccesses = {
    successes: string[];
    failures: string[];
};

export type AuthResult = {
    accessToken: string;
    refreshToken: string;
    userid: string;
};

export type DefaultResponse = {
    error?: {
        message: string;
    };
    success: boolean;
};

export type ListResponse<T> = DefaultResponse & {
    data: T[];
    count: number;
};

export type SingleResponse<T> = DefaultResponse & {
    data: T;
};

export type ListItemResponse = ListResponse<Item> & {};
export type SingleItemResponse = SingleResponse<Item> & {};

export type NotificationData = {
    level: NotifyLevel;
    message: string;
    type: "popup" | "progress";
    total?: number;
};
