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
    filename: string;
    extension: string;
    size: number;
    size_prefix: string;
    content_type: string;
    is_dir: boolean;
    parentid: string | null;
    updated_at: number;
    created_at: number;
};

export type Account = {
    id: string;
    username: string;
    email: string;
    creation_date: string;
};

export type AuthResult = {
    accessToken: string;
    refreshToken: string;
    userid: string;
};

export type FileResponse = {
    files: File[];
    parent?: File;
};

export type NotificationData = {
    level: NotifyLevel;
    message: string;
    type: "popup" | "progress";
    total?: number;
};

export type FilenameRequest = {
    filename: string;
};

export type BreadcrumbResponse = {
    id: string;
    filename: string;
}[];

export type UrlResponse = {
    url: string;
};

export type LoginBody = {
    email: string;
    password: string;
};

export type RegisterBody = {
    username: string;
    email: string;
    password: string;
};

export type LoginResponse = {
    access_token: string;
    refresh_token: string;
    user: Account;
};
