import { ItemType } from "@/types.ts";
import ActionBar from "./components/ActionBar.tsx";

type DriveProps = {};
export default function Drive({}: DriveProps) {
    return (
        <ActionBar
            parentFolderId=""
            selectionRange={[
                {
                    content_type: "text/plain ",
                    creation_date: new Date().getTime(),
                    extension: "txt",
                    id: "123",
                    name: "não abra!",
                    parentid: null,
                    path: "/",
                    size: 10,
                    size_prefix: "kb",
                    type: ItemType.FILE,
                    update_date: new Date().getTime(),
                },
            ]}
        ></ActionBar>
    );
    // let { parentid: paramsParentFolderId } = useParams();
    // const parentid =
    //     paramsParentFolderId === "drive" ? "" : paramsParentFolderId!;
    // const { closeModal, isOpen, openModal } = useModalContext();
    // const { changeParent, changeParentToRoot } = useParentContext();
    // const { request: parentFolderRequest, data: parentData } = useFolderById();
    // useEffect(() => {
    //     if (paramsParentFolderId === "drive") {
    //         changeParentToRoot();
    //         return;
    //     }
    //     parentFolderRequest(parentid);
    // }, [paramsParentFolderId]);
    // useEffect(() => {
    //     if (parentData!.success) return;
    //     changeParent(parentData!.data);
    //     document.title = "Tiny Drive |" + parentData?.data.name || "Tiny Drive";
    // }, [parentData]);
    // return (
    //     <section
    //         className="max-w-7xl mx-auto mb-20 px-10 w-full flex-1"
    //         onDragEnter={(e) => {
    //             if (e.dataTransfer.types.includes("Files")) {
    //                 openModal(
    //                     <DragAndDropModal close={closeModal} isOpen={isOpen} />
    //                 );
    //             }
    //         }}
    //     >
    //         <Breadcrumb />
    //         <ButtonUpload />
    //         <ActionBar {...{ parentFolderId: parentid }} />
    //         <ItemsView />
    //     </section>
    // );
}
