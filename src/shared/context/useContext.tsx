import { useContext } from "react";
import { NotifyContext } from "./NotifyContext.tsx";
import { ParentItemContext } from "@/features/drive/context/ParentItemContext.tsx";
import { ModalContext } from "./ModalContext.tsx";
import { DriveItemsContext } from "@/features/drive/context/DriveItemsContext.tsx";
import { AuthContext } from "./AuthContext.tsx";

export const useNotify = () => {
    return useContext(NotifyContext);
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const useParentContext = () => {
    return useContext(ParentItemContext);
};

export const useModalContext = () => {
    return useContext(ModalContext);
};

export const useDriveItemsContext = () => {
    return useContext(DriveItemsContext);
};
