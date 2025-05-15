import TextModal from "@/shared/components/ModalWrapper/TextModal.tsx";
import {
    useModalContext,
    useUserContext,
} from "@/shared/context/useContext.tsx";
import useFetcher from "@/shared/hooks/useRequest.tsx";
import { Item } from "@/shared/types/index.ts";
import { ItemDeleteConfig, ItemUpdateNameConfig } from "../../api/config.ts";

type ActionBarProps = {
    item?: Item | null;
};
export default function ActionBar({ item }: ActionBarProps) {
    const { user } = useUserContext();
    const { request: _delete } = useFetcher({
        ...ItemDeleteConfig,
        path: `${ItemDeleteConfig.path}/${user.id}/${item?.id}`,
    });
    const { request: update } = useFetcher(
        ItemUpdateNameConfig(item?.id! ?? 0)
    );
    const { closeModal, openModal, isOpen } = useModalContext();

    return (
        <div
            className={`h-10  px-1 rounded-md my-2 flex items-center ${
                !item ? "bg-white" : "bg-slate-200"
            }`}
        >
            {item && (
                <>
                    <button
                        className="hover:bg-red-500 px-2 py-1 rounded-md hover:text-white"
                        onClick={() => {
                            if (!confirm("Confirm to delete")) return;

                            _delete();
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="hover:bg-slate-500 px-2 py-1 rounded-md hover:text-white"
                        onClick={() => {
                            openModal(
                                <TextModal
                                    close={closeModal}
                                    callback={(name) => {
                                        update({
                                            name,
                                        });
                                    }}
                                    isOpen={isOpen}
                                />
                            );
                        }}
                    >
                        Rename
                    </button>
                </>
            )}
        </div>
    );
}
