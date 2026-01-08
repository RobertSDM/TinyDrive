import { useContext } from "react";
import { NotifyContext } from "../features/notification/context/NotifyContext.tsx";
import { ParentItemContext } from "@/features/fileHandling/context/ParentItemContext.tsx";
import { DriveItemsContext } from "@/features/fileHandling/context/DriveItemsContext.tsx";
import { SessionContext } from "@/features/authentication/context/SessionContext.tsx";

export const useNotifyContext = () => useContext(NotifyContext);
export const useSessionContext = () => useContext(SessionContext);
export const useParentContext = () => useContext(ParentItemContext);
export const useDriveItemsContext = () => useContext(DriveItemsContext);
