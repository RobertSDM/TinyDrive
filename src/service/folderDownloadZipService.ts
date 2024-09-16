import downloadFolder from "../fetcher/folder/downloadFolder.ts";

const folderDownloadService = async (
    userId: string,
    token: string,
    fileId: string,
    name: string
) => {
    const buffer = await downloadFolder(userId, fileId, token);
    
    const blob = new Blob([buffer], { type: "application/zip" });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    link.click();

    window.URL.revokeObjectURL(url);
};

export default folderDownloadService;
