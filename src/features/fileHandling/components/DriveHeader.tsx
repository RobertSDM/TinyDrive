import { Link } from "react-router-dom";
import SearchInput from "./SearchInput.tsx";
import { useSessionContext } from "@/context/useContext.tsx";

export default () => {
    const { logOut, account } = useSessionContext();

    return (
        <div className="px-10 w-full">
            <header className="flex items-center mx-auto max-w-7xl justify-between h-20 min-w-80">
                <Link to={"/drive"} className="cursor-pointer">
                    <img
                        src="/icons/tiny-drive-logo.svg"
                        className="aspect-square h-12"
                    />
                </Link>
                <SearchInput />
                <div className="relative border border-slate-300 group w-32 rounded-sm hover:rounded-b-none">
                    <p className="font-semibold text-center w-full whitespace-nowrap text-ellipsis overflow-hidden px-2">
                        {account?.username}
                    </p>
                    <div className="absolute top-full scale-0 group-hover:scale-100 group-active:scale-100 p-2 w-full bg-white border-slate-300 border rounded-b-md">
                        <button
                            className="py-1 w-full rounded-sm text-red-500 font-semibold hover:bg-red-500 hover:text-white text-sm"
                            onClick={() => {
                                logOut();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};
