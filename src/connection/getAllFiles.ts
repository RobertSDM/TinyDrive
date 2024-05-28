import { IFile, IFolder } from "../types/index.js";
import { BACKEND_URL } from "../utils/index.js";

const getAllFilesByFolderId = async (
    id: string | "/"
): Promise<false | IFile[]> => {
    try {
        const res = await fetch(`${BACKEND_URL}/get_children/${id}`, {
            mode: "no-cors",
        });
        const resData = await res.json();

        if (res.ok) {
            return resData as IFile[];
        }

        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const getAllRootFiles = async (): Promise<false | Array<IFile & IFolder>> => {
    try {
        const res = await fetch(`${BACKEND_URL}/get_root_files`, {
            mode: "no-cors",
        });
        const resData = await res.json();

        if (res.ok) {
            return resData as Array<IFile & IFolder>;
        }

        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export { getAllFilesByFolderId, getAllRootFiles };
