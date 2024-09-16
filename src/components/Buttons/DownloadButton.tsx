import { HiDownload } from "react-icons/hi";
import { useUserContext } from "../../hooks/useContext.tsx";
import fileDownloadService from "../../service/fileDownloadService.ts";
import folderDownloadService from "../../service/folderDownloadZipService.ts";

const DownloadButton = ({
    itemId,
    isFile,
    name = "",
    downloadState,
}: {
    itemId: string;
    isFile: boolean;
    name?: string;
    downloadState: React.MutableRefObject<string[]>;
}) => {
    const { user, token } = useUserContext();

    return (
        <button
            onClick={() => {
                const buttonRegistry = itemId + ";" + name;
                console.log(downloadState.current);
                if (downloadState.current.includes(buttonRegistry)) {
                    console.log("denovo não");
                    return;
                }
                console.log("pode passar");
                downloadState.current.push(buttonRegistry);
                if (isFile) {
                    fileDownloadService(user.id, token, itemId).then(() => {
                        downloadState.current = downloadState.current.filter(
                            (item) => item !== buttonRegistry
                        );
                    });
                } else {
                    folderDownloadService(user.id, token, itemId, name).then(
                        () => {
                            downloadState.current =
                                downloadState.current.filter(
                                    (item) => item !== buttonRegistry
                                );
                        }
                    );
                }
            }}
        >
            <HiDownload
                className={` bg-white border  border-purple-500 hover:bg-purple-500 hover:text-white rounded-full aspect-square min-h-8 min-w-8 p-[0.45rem]`}
            />
        </button>
    );
};

export default DownloadButton;
