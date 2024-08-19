import { useState } from "react";
import { useUserContext } from "../../hooks/useContext.tsx";
import { TSearchFolder, TSeachFile } from "../../types/types.js";
import { beAPI } from "../../utils/enviromentVariables.ts";

const useContentSearchByName = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<{
        files: TSeachFile;
        folders: TSearchFolder;
    } | null>(null);
    const { token, user } = useUserContext();

    const fetch_ = async (search: string, type: "file" | "folder" | null) => {
        setIsLoading(true);
        try {
            beAPI
                .get(`/content/search/${user.id}?q=${search}&type=${type}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setIsLoading(false);
                    if (res.status === 200) {
                        setData(res.data.data);
                    }
                });
        } catch (err) {
            setIsLoading(false);
        }
    };

    return { isLoading, data, fetch_, setIsLoading };
};

export default useContentSearchByName;
