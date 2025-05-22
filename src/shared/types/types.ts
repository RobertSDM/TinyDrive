import { AxiosInstance } from "axios";
import {
    HTTPMethods,
    ItemType,
    NotificationLevels,
    NotificationTypes,
} from "./enums.ts";

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
    creation_data: number;
};

export type Account = {
    id: string;
    username: string;
    email: string;
    creation_date: string;
};

export type Client = AxiosInstance;

export type RequestConfig = {
    path: string;
    method: HTTPMethods;
    body?: Object | Object[];
    headers?: {
        [key: string]: string;
    };
    blob?: boolean
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

export interface INotification {
    level: NotificationLevels;
    type?: NotificationTypes;
    id?: number;
    msg: string;
    special?: string;
}

export type TSeachFile = {
    id: string;
    name: string;
    extension: string;
    byteSize: number;
    prefix: string;
    [Symbol.iterator](): IterableIterator<TSeachFile>;
};

export type TSearchFolder = {
    id: string;
    name: string;
    [Symbol.iterator](): IterableIterator<TSeachFile>;
};
