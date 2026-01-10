export enum NotifyLevel {
    INFO,
    ERROR,
}

export enum FileType {
    FOLDER = "FOLDER",
    FILE = "FILE",
}

export enum HTTPMethods {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE",
}

export type File = {
    id: string | null;
    name: string;
    extension: string;
    size: number;
    size_prefix: string;
    content_type: string;
    type: FileType;
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

export type FileResponse = {
    files: File[];
    parent?: File;
    message?: string; // exists when an error occur
};

export type NotificationData = {
    level: NotifyLevel;
    message: string;
    type: "popup" | "progress";
    total?: number;
};
