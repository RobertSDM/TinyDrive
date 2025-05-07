import { AxiosInstance } from "axios";
import {
    HTTPMethods,
    ItemType,
    NotificationLevels,
    NotificationTypes,
} from "./enums.ts";

export type Item = {
    id: string;
    name: string;
    extension: string;
    size: number;
    size_prefix: number;
    type: ItemType;
    path: string;
    update_date: number;
    creation_data: number;
};

export type User = {
    id: string;
    username: string;
    email: string;
};

export type Client = AxiosInstance;

export type RequestConfig = {
    path: string;
    method: HTTPMethods;
    body?: Object;
    headers?: {
        [key: string]: string;
    };
};

export type DefaultResponse = {
    error?: {
        message: string;
    };
    success: boolean;
};

export type ListResponse<T> = DefaultResponse & {
    data: T[] | null;
    count: number;
};

export type SingleResponse<T> = DefaultResponse & {
    data: T | null;
};

export type AuthResponse = SingleResponse<User> & {
    token: string;
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
