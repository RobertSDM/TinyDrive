import {
    useSessionContext,
    useDriveItemsContext,
    useNotifyContext,
    useParentContext,
} from "@/context/useContext.tsx";
import {
    HTTPMethods,
    Item,
    ListItemResponse,
    NotifyLevel,
    SingleItemResponse,
} from "@/types.ts";
import { FailuresAndSuccesses, SingleResponse } from "@/types.ts";
import { axiosClient } from "@/lib/axios.ts";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export default function useDeleteFolderById() {
    const notify = useNotifyContext();

    const { removeItem } = useDriveItemsContext();
    const { account, session } = useSessionContext();
    const { parent, changeParentToRoot } = useParentContext();

    const [data, setData] =
        useState<SingleResponse<FailuresAndSuccesses> | null>(null);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    function request(body?: Object | Object[]) {
        setIsRequesting(true);
        axiosClient({
            url: `item/delete/${account!.id!}`,
            method: HTTPMethods.DELETE,
            data: body,
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
            },
        })
            .then((resp) => {
                const respBody = resp.data.data;
                respBody.successes.forEach((id: string) => {
                    removeItem(id);
                });

                if (respBody.successes.includes(parent.id ?? ""))
                    changeParentToRoot();

                notify.popup({
                    level: NotifyLevel.INFO,
                    message: `${
                        respBody.successes.length > 1
                            ? "All items where "
                            : `The item was `
                    }deleted`,
                });
                setData(resp.data);
            })
            .catch(setError)
            .finally(() => {
                setIsRequesting(false);
            });
    }

    return { request, isLoading: isRequesting, data, error };
}

export function useDownloadFolder(item: Item) {
    const { session, account } = useSessionContext();
    const notify = useNotifyContext();
    const [data, setData] =
        useState<SingleResponse<FailuresAndSuccesses> | null>(null);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    function request(body?: Object | Object[]) {
        setIsRequesting(true);
        axiosClient({
            url: `item/download/folder/${account!.id}/${item?.id ?? ""}`,
            method: HTTPMethods.DELETE,
            data: body,
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
            },
        })
            .then((resp) => {
                const contentDisposition: string =
                    resp.headers["content-disposition"];
                const filename = contentDisposition
                    .split(";")[1]
                    .split("=")[1]
                    .replaceAll('"', "")
                    .replaceAll("'", "");
                const bloburl = URL.createObjectURL(resp.data);
                const $a = document.createElement("a");
                $a.download = filename;
                $a.href = bloburl;

                $a.click();
                $a.remove();
                setData(resp.data);
            })
            .catch((err) => {
                if (!(err instanceof AxiosError)) return err;

                notify.popup({
                    level: NotifyLevel.ERROR,
                    message: err.response!.data.error!.message,
                });
                setError(err);
            })
            .finally(() => {
                setIsRequesting(false);
            });
    }

    return { request, isLoading: isRequesting, data, error };
}

export function useDownloadFile(item: Item) {
    const { session, account } = useSessionContext();
    const notify = useNotifyContext();

    const [data, setData] =
        useState<SingleResponse<FailuresAndSuccesses> | null>(null);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    function request(body?: Object | Object[]) {
        setIsRequesting(true);
        axiosClient({
            url: `/item/download/${account!.id}/${item?.id! ?? ""}`,
            method: HTTPMethods.DELETE,
            data: body,
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
            },
        })
            .then((resp) => {
                const contentDisposition: string =
                    resp.headers["content-disposition"];
                const filename = contentDisposition
                    .split(";")[1]
                    .split("=")[1]
                    .replaceAll('"', "")
                    .replaceAll("'", "");
                const bloburl = URL.createObjectURL(resp.data);
                const $a = document.createElement("a");
                $a.download = filename;
                $a.href = bloburl;

                $a.click();
                $a.remove();

                setData(resp.data);
            })
            .catch((err) => {
                if (!(err instanceof AxiosError)) return err;

                notify.popup({
                    level: NotifyLevel.ERROR,
                    message: err.response!.data.error!.message,
                });
                setError(err);
            })
            .finally(() => {
                setIsRequesting(false);
            });
    }

    return { request, isLoading: isRequesting, data, error };
}

export function useFilesFromFolder(
    parentid: string,
    page: number = 0,
    sort: string = "name"
) {
    const { account, session } = useSessionContext();

    const [data, setData] = useState<ListItemResponse | null>(null);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    function request(body?: Object | Object[]) {
        setIsRequesting(true);
        axiosClient({
            url: `/item/all/${account!.id}${
                parentid === "" ? "" : `/${parentid}`
            }?p=${page}&sort=${sort}`,
            method: HTTPMethods.DELETE,
            data: body,
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
            },
        })
            .then((resp) => setData(resp.data))
            .catch(setError)
            .finally(() => {
                setIsRequesting(false);
            });
    }

    return { request, isLoading: isRequesting, data, error };
}

export function useSearch(query: string, type: string | null) {
    const { account, session } = useSessionContext();
    const notify = useNotifyContext();

    const [data, setData] = useState<ListItemResponse | null>(null);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    function request() {
        setIsRequesting(true);
        axiosClient({
            url: `item/search/${account?.id}?q=${query}&${
                type ? `type=${type}` : ""
            }`,
            method: HTTPMethods.GET,
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
            },
        })
            .then((resp) => {
                if (resp.status === 202) {
                    notify.popup({
                        level: NotifyLevel.INFO,
                        message: resp.data.error?.message!,
                    });
                }
                setData(resp.data);
            })
            .catch(setError)
            .finally(() => {
                setIsRequesting(false);
            });
    }

    return { request, isLoading: isRequesting, data, error };
}

export function useBreadcrumb() {
    const { account, session } = useSessionContext();
    const { parent } = useParentContext();

    const [data, setData] = useState<ListItemResponse | null>(null);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setIsRequesting(true);
        axiosClient({
            url: `/item/breadcrumb/${account!.id}/${parent.id}`,
            method: HTTPMethods.GET,
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
            },
        })
            .then((resp) => setData(resp.data))
            .catch(setError)
            .finally(() => {
                setIsRequesting(false);
            });
    }, []);

    return { isLoading: isRequesting, data, error };
}

export function useFilesById() {}

export function usePreview(id: string) {
    const { account, session } = useSessionContext();
    const notify = useNotifyContext();

    const [data, setData] = useState<SingleResponse<string> | null>(null);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    function request(body?: Object | Object[]) {
        setIsRequesting(true);
        axiosClient({
            url: `item/preview/${account!.id}/${id}`,
            method: HTTPMethods.GET,
            data: body,
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
            },
        })
            .then((resp) => {
                if (resp.status === 202) {
                    notify.popup({
                        level: NotifyLevel.INFO,
                        message: resp.data.error?.message!,
                    });
                }
                setData(resp.data);
            })
            .catch(setError)
            .finally(() => {
                setIsRequesting(false);
            });
    }

    return { request, isLoading: isRequesting, data, error };
}

export function useUpdateName(item: Item) {
    const { updateItems, items } = useDriveItemsContext();
    const { session, account } = useSessionContext();
    const notify = useNotifyContext();

    const [data, setData] =
        useState<SingleResponse<FailuresAndSuccesses> | null>(null);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    function request(body?: Object | Object[]) {
        setIsRequesting(true);
        axiosClient({
            url: `/item/update/${account!.id}/${item?.id ?? ""}/name`,
            method: HTTPMethods.DELETE,
            data: body,
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
            },
        })
            .then((resp) => {
                notify.popup({
                    level: NotifyLevel.INFO,
                    message: `The "${item!.name}" was updated`,
                });
                item!.name = resp.data.data.name;
                updateItems(items);
                setData(resp.data);
            })
            .catch((err) => {
                if (!(err instanceof AxiosError)) return err;

                notify.popup({
                    level: NotifyLevel.ERROR,
                    message: err.response!.data.error!.message,
                });

                setError(err);
            })
            .finally(() => {
                setIsRequesting(false);
            });
    }

    return { request, isLoading: isRequesting, data, error };
}

export function useUploadFolder() {
    const { session } = useSessionContext();
    const { addItem } = useDriveItemsContext();
    const notify = useNotifyContext();

    const [data, setData] =
        useState<SingleResponse<FailuresAndSuccesses> | null>(null);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    function request(body?: Object | Object[]) {
        setIsRequesting(true);
        axiosClient({
            url: "/item/save/folder",
            method: HTTPMethods.POST,
            data: body,
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
            },
        })
            .then((resp) => {
                addItem(resp.data.data);

                setData(resp.data);
            })
            .catch((err) => {
                if (!(error instanceof AxiosError)) return error;

                notify.popup({
                    level: NotifyLevel.ERROR,
                    message: error.response!.data.error!.message,
                });

                setError(err);
            })
            .finally(() => {
                setIsRequesting(false);
            });
    }

    return { request, isLoading: isRequesting, data, error };
}

export function useUploadItem() {
    const { session } = useSessionContext();
    const { addItem } = useDriveItemsContext();
    const notify = useNotifyContext();

    const [data, setData] =
        useState<SingleResponse<FailuresAndSuccesses> | null>(null);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    function request(body?: Object | Object[]) {
        setIsRequesting(true);
        axiosClient({
            url: "/item/save",
            method: HTTPMethods.POST,
            data: body,
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then((resp) => {
                addItem(resp.data.data);

                setData(resp.data);
            })
            .catch((err) => {
                if (!(error instanceof AxiosError)) return error;

                notify.popup({
                    level: NotifyLevel.ERROR,
                    message: error.response!.data.error!.message,
                });

                setError(err);
            })
            .finally(() => {
                setIsRequesting(false);
            });
    }

    return { request, isLoading: isRequesting, data, error };
}

export function useFolderById() {
    const { account, session } = useSessionContext();

    const [data, setData] = useState<SingleItemResponse>();
    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    function request(parentid: string) {
        axiosClient({
            url: `/item/${account!.id}${parentid === "" ? "" : "/" + parentid}`,
            method: HTTPMethods.GET,
            headers: {
                Authorization: `Bearer ${session!.accessToken ?? ""}`,
            },
        })
            .then((resp) => setData(resp.data))
            .finally(() => setIsRequesting(false));
    }

    return { request, data, isRequesting };
}
