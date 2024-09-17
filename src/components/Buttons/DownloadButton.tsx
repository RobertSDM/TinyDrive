import { HiDownload } from "react-icons/hi";

const DownloadButton = ({
    onclick,
}: {
    onclick: () => any;
}) => {
    return (
        <button onClick={onclick}>
            <HiDownload
                className={` bg-white border  border-purple-500 hover:bg-purple-500 hover:text-white rounded-full aspect-square min-h-8 min-w-8 p-[0.45rem] active:scale-95`}
            />
        </button>
    );
};

export default DownloadButton;
