import { Link } from "react-router-dom";
import SearchInput from "./SearchInput.tsx";
import { useAccountContext } from "@/context/useContext.tsx";
import { useLogout } from "@/features/authentication/hooks/authenticationHooks.tsx";
import { useState } from "react";

export default () => {
    const { account } = useAccountContext();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const logoutMut = useLogout();
    function logout() {
        logoutMut.mutate();
    }

    if (!account) return null;

    return (
        <header className="flex items-center mx-auto justify-between h-20">
            <Link to={"/drive"} className="cursor-pointer">
                <img
                    src="/icons/tiny-drive-logo.svg"
                    className="aspect-square h-12"
                />
            </Link>
            <SearchInput />
            <div
                className="relative bg-slate-200/75 dark:bg-slate-200 group w-32 rounded-sm cursor-pointer select-none py-1 px-2 hover:rounded-b-none"
                onClick={() => setIsDrawerOpen((prev) => !prev)}
            >
                <p className="text-center w-full whitespace-nowrap text-ellipsis overflow-hidden px-2">
                    {account.username}
                </p>
                {isDrawerOpen && (
                    <div className="absolute top-full scale-0 group-hover:scale-100 left-0 p-2 w-full bg-white border-slate-300 border rounded-b-md">
                        <button
                            className="p-1 w-full rounded-sm text-red-500 font-semibold bg-red-200 hover:bg-red-500 hover:text-white text-sm"
                            onClick={logout}
                        >
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};
