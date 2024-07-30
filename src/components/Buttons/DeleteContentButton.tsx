import { MdOutlineClose } from "react-icons/md";
import { FileNode } from "../../control/TreeWrapper/FileNode.ts";
import { FolderNode } from "../../control/TreeWrapper/FolderNode.ts";

const isFile = (item: FileNode | FolderNode) => {
    return item instanceof FileNode;
};
const DeleteContentButton = ({
    onclick,
    item,
}: {
    onclick: () => Promise<void>
    item: FileNode | FolderNode;
}) => {

    return (
        <span onClick={onclick}>
            <MdOutlineClose
                className={`p-[0.45rem] font-bold min-h-8 min-w-8 bg-white cursor-pointer text-red-500 border  border-red-500 hover:bg-red-500 hover:text-white rounded-full ${
                    isFile(item) && "hidden"
                } md:inline`}
            />
        </span>
    );
};

export default DeleteContentButton;
