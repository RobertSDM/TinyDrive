import TextModal from "@/shared/components/ModalWrapper/TextModal.tsx";
import {
    useAuthContext,
    useDriveItemsContext,
    useModalContext,
} from "@/shared/context/useContext.tsx";
import useFetcher from "@/shared/hooks/useRequest.tsx";
import {
    Item,
    SingleItemResponse,
    SingleResponse,
} from "@/shared/types/index.ts";
import {
    ItemDeleteConfig,
    ItemDownload as ItemDownloadConfig,
    ItemUpdateNameConfig,
} from "../../api/config.ts";
import { DefaultClient } from "@/shared/api/clients.ts";
import { useEffect } from "react";

type ActionBarProps = {
    item?: Item | null;
    closeActionBar: () => void;
};
export default function ActionBar({ item, closeActionBar }: ActionBarProps) {
    const { removeItem, reloadItems } = useDriveItemsContext();
    const { account, session } = useAuthContext();
    const { request: _delete } = useFetcher(
        ItemDeleteConfig(account!.id!, item?.id ?? "", session!.access_token),
        DefaultClient,
        false,
        (resp) => {
            removeItem(item!);
            closeActionBar();
            return resp.data;
        }
    );

    const { request: update } = useFetcher<SingleItemResponse>(
        ItemUpdateNameConfig(
            item?.id! ?? "",
            account!.id,
            session!.access_token
        ),
        DefaultClient,
        false,
        (resp) => {
            item!.name = resp.data.data.name;
            reloadItems();
            return resp.data;
        }
    );

    const { request: download } = useFetcher<SingleResponse<string>>(
        ItemDownloadConfig(account!.id, item?.id! ?? "", session!.access_token),
        DefaultClient,
        false,
        (resp) => {
            const $a = document.createElement("a");
            $a.download = "";
            $a.href = resp.data.data;

            $a.click();
            $a.remove();

            return resp.data;
        }
    );
    const { closeModal, openModal } = useModalContext();

    useEffect(() => {
        function action(e: KeyboardEvent) {
            if (!item) return;

            if (e.key === "Delete") {
                e.stopPropagation();
                e.preventDefault();

                if (
                    !confirm(
                        "Are you sure? All the data from the folder will be lost"
                    )
                )
                    return;
                _delete();
            }
        }

        window.addEventListener("keydown", action);

        return () => {
            window.removeEventListener("keydown", action);
        };
    }, [item]);

    return (
        <div
            className={`h-10  px-1 rounded-md my-2 flex items-center gap-x-2  "bg-white"
            `}
        >
            {item && (
                <>
                    <button
                        className="hover:bg-red-400 bg-red-200 px-2 py-1 rounded-md hover:text-white"
                        onClick={() => {
                            if (
                                !confirm(
                                    "Are you sure? All the data from the folder will be lost"
                                )
                            )
                                return;

                            _delete();
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="hover:bg-slate-400 bg-slate-200 px-2 py-1 rounded-md hover:text-white"
                        onClick={() => {
                            openModal(
                                <TextModal
                                    close={closeModal}
                                    callback={(name) => {
                                        update({
                                            name,
                                        });
                                    }}
                                    isOpen={true}
                                />
                            );
                        }}
                    >
                        Rename
                    </button>
                    <button
                        className="hover:bg-slate-400 bg-slate-200 px-2 py-1 rounded-md hover:text-white"
                        onClick={() => {
                            download();
                        }}
                    >
                        Download
                    </button>
                </>
            )}
        </div>
    );
}
