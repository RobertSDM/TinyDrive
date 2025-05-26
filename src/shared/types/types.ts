import { AxiosInstance } from "axios";
import { HTTPMethods, ItemType, NotifyLevel } from "./enums.ts";

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

export type Client = AxiosInstance;

export type FailuresAndSuccesses = {
    successes: string[];
    failures: string[];
};

export type RequestConfig = {
    path: string;
    method: HTTPMethods;
    body?: Object | Object[];
    headers?: {
        [key: string]: string;
    };
    blob?: boolean;
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

export type BaseNotification = {
    level: NotifyLevel;
    message: string;
};

export type PopupNotification = BaseNotification & {};

export type ProgressGenerator = AsyncGenerator<number, void, any>;
export type ProgressNotification = BaseNotification & {
    target: number;
    progress: () => ProgressGenerator;
};

export type TimedNotification = BaseNotification & {
    duration: number;
};

export type Sort = {
    exhibitionTitle: string;
    title: string;
};
