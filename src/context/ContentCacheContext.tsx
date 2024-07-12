import { createContext, ReactElement } from "react";
import { FileNode, FolderNode } from "../control/Tree.ts";
import { IFile, IFolder } from "../types/types.js";

type cache = {
    [folderId: string]: {
        isFile: boolean;
        content: FolderNode | FileNode;
    };
};

type context = {
    readCache: () =>
        | boolean
        | {
              isFile: boolean;
              content: IFolder | IFile;
          }[];
    writeCache: (content: Set<FileNode | FolderNode>) => boolean;
    checkCacheExists: () => boolean;
};

export const contentCacheContext = createContext<context>({} as context);

export const ContentCacheProvider = ({
    children,
}: {
    children: ReactElement;
}) => {
    function checkCacheExists() {
        return sessionStorage.getItem("contCache") ? true : false;
    }

    function readCache() {
        const storedCache = JSON.parse(
            sessionStorage.getItem("contCache") || ""
        );
        if (storedCache == "") return false;

        return Object.values(storedCache) as {
            isFile: boolean;
            content: FolderNode | FileNode;
        }[];
    }

    function writeCache(content: Set<FileNode | FolderNode>) {
        const cache = {} as cache;

        content.forEach((i) => {
            cache[i?.getParent()?.getId() ?? ""] = {
                isFile: i instanceof FileNode,
                content: i,
            };
        });
        sessionStorage.setItem("contCache", JSON.stringify(cache));
        return true;
    }

    return (
        <contentCacheContext.Provider
            value={{ readCache, writeCache, checkCacheExists }}
        >
            {children}
        </contentCacheContext.Provider>
    );
};
