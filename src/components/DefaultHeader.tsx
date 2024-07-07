import { Link } from "react-router-dom";
import { useUserContext } from "../control/hooks/useContext.tsx";

const DefaultHeader = () => {
    const { logoutUser } = useUserContext();

    return (
        <header className="flex border px-8 py-4 items-center justify-between h-20">
            <Link
                to={"/"}
                className="text-2xl font-bold cursor-pointer text-purple-500"
            >
                Tiny Drive
            </Link>
            {/* <div className="mx-auto border-black/40 border rounded-sm items-center cursor-pointer relative w-2/4">
                    <SearchInput />
                </div> */}
            <button
                className="px-3 py-2 bg-red-500 text-white font-semibold hover:bg-white hover:border hover:border-current hover:border-red-500 hover:text-red-500 text-sm"
                onClick={() => {
                    logoutUser();
                }}
            >
                Logout
            </button>
        </header>
    );
};

export default DefaultHeader;
