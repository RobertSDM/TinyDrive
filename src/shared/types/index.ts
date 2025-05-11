import { AxiosInstance } from "axios";
import {
    HTTPMethods,
    ItemType,
    NotificationLevels,
    NotificationTypes,
} from "./enums.ts";

export type Item = {
    id: number | null;
    name: string;
    extension: string;
    size: number;
    size_prefix: string;
    type: ItemType;
    path: string;
    update_date: number;
    creation_data: number;
};

export type ItemData = {
    name: string;
    extension: string;
    size: number;
    type: string;
    path: string;
    ownerid: number;
    parentid: number | null;
};

export type User = {
    id: number;
    username: string;
    email: string;
};

export type Client = AxiosInstance;

export type RequestConfig = {
    path: string;
    method: HTTPMethods;
    body?: Object | Object[];
    headers?: {
        [key: string]: string;
    };
    params?: string[];
};

export type Node = {
    item: ItemData;
    children: Node[];
    buffer: Promise<ArrayBuffer> | null;
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
    data: T;
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
