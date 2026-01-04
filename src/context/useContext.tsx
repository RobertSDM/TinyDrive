import { useContext } from "react";
import { NotifyContext } from "./NotifyContext.tsx";
import { ParentItemContext } from "@/features/fileView/context/ParentItemContext.tsx";
import { ModalContext } from "./ModalContext.tsx";
import { DriveItemsContext } from "@/features/fileView/context/DriveItemsContext.tsx";
import { AuthContext } from "./AuthContext.tsx";

export const notifyContext = useContext(NotifyContext);
export const authContext = useContext(AuthContext);
export const parentContext = useContext(ParentItemContext);
export const modalContext = useContext(ModalContext);
export const driveItemsContext = useContext(DriveItemsContext);
