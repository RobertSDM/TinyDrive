import { Link } from "react-router-dom";
import SearchInput from "../SearchInputWrapper/SearchInput.tsx";
import { useUserContext } from "@/shared/context/useContext.tsx";

export default () => {
    const { logoutUser, user } = useUserContext();

    return (
        <div className="border">
            <header className="flex max-w-[85%] mx-auto py-4 items-center justify-between h-20 min-w-[364px]">
                <Link to={"/drive"} className="cursor-pointer">
                    <img
                        src="/imgs/tiny-drive-logo.svg"
                        className="aspect-square h-10"
                    />
                </Link>
                <SearchInput />
                <div className="relative px-4 border border-slate-300 flex justify-center group w-40 rounded-md hover:border-b-transparent hover:rounded-b-none">
                    <span className="font-semibold">{user.username}</span>
                    <div className="absolute left-[-1px] top-full scale-0 group-hover:scale-100 group-active:scale-100 p-4 w-[calc(100%_+_2px)] bg-white border-slate-300 border rounded-b-md">
                        <button
                            className="px-3 w-full  rounded-md bg-red-500 text-white font-semibold hover:bg-white hover:border hover:border-current hover:border-red-500 hover:text-red-500 text-sm"
                            onClick={() => {
                                logoutUser();
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
