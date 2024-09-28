import { useNavigate } from "react-router-dom";

const PaginationControls = ({
    totalPages,
    page,
}: {
    id: string | null | undefined;
    totalPages: number;
    page: number;
}) => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (page > totalPages) {
    //         console.log("page", page, totalPages);
    //         setPage(totalPages);
    //     }
    // }, [content]);

    return (
        <section className="flex gap-x-2 items-center justify-end">
            <button
                onClick={() => {
                    if (page === 1) {
                        return;
                    }

                    navigate(`?p=${page - 1}`);
                }}
                className={`font-semibold text-lg lg:text-sm ${
                    page === 1 ? "text-slate-300" : "text-black"
                }`}
            >
                &lt;
            </button>
            <span className="text-md lg:text-sm">
                {page}/{totalPages}
            </span>
            <button
                onClick={() => {
                    if (page === totalPages) {
                        return;
                    }

                    navigate(`?p=${page + 1}`);
                }}
                className={`font-semibold text-lg lg:text-sm ${
                    page === totalPages ? "text-slate-300" : "text-black"
                }`}
            >
                &gt;
            </button>
        </section>
    );
};

export default PaginationControls;
