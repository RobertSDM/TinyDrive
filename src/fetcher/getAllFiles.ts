import { IFile, IFolder } from "../types/index.js"

const getAllFilesByFolderId = async (
    id: string | "/"
): Promise<false | IFile[]> => {
    try {
        const res = await fetch(`http://localhost:4500/get_children/${id}`);
        const resData = await res.json();

        if (res.ok) {
            return resData as IFile[];
        }

        return false
    } catch (err) {
        console.log(err);
        return false;
    }
};

const getAllRootFiles = async (): Promise<false | Array<IFile & IFolder>> => {
    try {
        const res = await fetch(`http://localhost:4500/get_root_files`);
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
