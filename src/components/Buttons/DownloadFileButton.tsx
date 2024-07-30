import { HiDownload } from "react-icons/hi";
import fileDownloadService from "../../service/fileDownloadService.ts";
import { useUserContext } from "../../hooks/useContext.tsx";

const DownloadButton = ({ itemId }: { itemId: string }) => {
    const { user, token } = useUserContext();
    return (
        <button onClick={() => fileDownloadService(user.id, token, itemId)}>
            <HiDownload
                className={` bg-white border  border-purple-500 hover:bg-purple-500 hover:text-white rounded-full aspect-square min-h-8 min-w-8 p-[0.45rem]`}
            />
        </button>
    );
};

export default DownloadButton;
