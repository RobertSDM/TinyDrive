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
                className="relative border border-slate-300 group w-32 rounded-sm hover:rounded-b-none cursor-pointer select-none"
                onClick={() => setIsDrawerOpen((prev) => !prev)}
            >
                <p className="font-semibold text-center w-full whitespace-nowrap text-ellipsis overflow-hidden px-2">
                    {account.username}
                </p>
                {isDrawerOpen && (
                    <div className="absolute top-full scale-0 group-hover:scale-100 p-2 w-full bg-white border-slate-300 border rounded-b-md">
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
