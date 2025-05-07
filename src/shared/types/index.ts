import { AxiosInstance, RawAxiosRequestHeaders, ResponseType } from "axios";
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

export type RequestParam = {
    responseType?: ResponseType;
    params?: [{ param: string }];
    body?: string | Object;
    headers?: RawAxiosRequestHeaders;
};

export type RequestHookParam = {
    path: string;
    method: string;
};

export interface INotification {
    level: NotificationLevels;
    type?: NotificationTypes;
    id?: number;
    msg: string;
    special?: string;
}

export type User = {
    id: string;
    userName: string;
    email: string;
};

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
