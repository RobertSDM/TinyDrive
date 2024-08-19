import { convertBase64ToArrayBuffer } from "../utils/dataConvertion.ts";
import downloadFile from "../fetcher/file/downloadFile.ts";

const fileDownloadService = async (
    userId: string,
    token: string,
    fileId: string
) => {
    const { data, name } = await downloadFile(userId, fileId, token);

    const buffer = convertBase64ToArrayBuffer(data);

    const blob = new Blob([buffer]);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    link.click();

    window.URL.revokeObjectURL(url);
};

export default fileDownloadService;
