import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useContext.tsx";
import { addThreePoints, toTitleCase } from "../control/dataConvert.ts";

const DefaultHeader = () => {
    const { logoutUser, user } = useUserContext();

    return (
        <div className="border ">
            <header className="flex md:max-w-5xl px-8 xl:px-0 xl:max-w-7xl mx-auto py-4 items-center justify-between h-20 min-w-[364px]">
                <Link to={"/"} className="cursor-pointer">
                    <img
                        src="/imgs/tiny-drive-logo.svg"
                        className="aspect-square h-10"
                    />
                </Link>
                {/* <div className="mx-auto border-black/40 border rounded-sm items-center cursor-pointer relative w-2/4">
                    <SearchInput />
                </div> */}
                <div className="relative px-4 border flex justify-center group w-40 rounded-t-sm">
                    <span className="font-semibold">
                        {addThreePoints(toTitleCase(user.user_name), 10)}
                    </span>
                    <div className="absolute left-0 top-full scale-0 group-hover:scale-100 group-active:scale-100 p-4 w-full bg-white border rounded-b-sm">
                        <button
                            className="px-3 w-full  rounded-full bg-red-500 text-white font-semibold hover:bg-white hover:border hover:border-current hover:border-red-500 hover:text-red-500 text-sm"
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

export default DefaultHeader;
