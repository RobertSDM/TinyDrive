import { IFile, IFolder } from "../types/index.js";
import { beAPI } from "../utils/index.ts";


const getAllFilesByFolderId = async (
    id: string | "/"
): Promise<false | IFile[]> => {
    try {
        const res = await beAPI.get(`/get_content/${id}`)

        if(res.status === 200){
            return res.data as IFile[]
        }

        return [] as IFile[];
    } catch (err) {
        console.log(err);
        return false;
    }
};

const getAllRootFiles = async (): Promise<false | Array<IFile & IFolder>> => {
    try {
        const res = await beAPI.get("/get_root_files", {
            withCredentials: false
        })

        if(res.status === 200){
            return res.data as Array<IFile & IFolder>
        }

        return [] as Array<IFile & IFolder>;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export { getAllFilesByFolderId, getAllRootFiles };
