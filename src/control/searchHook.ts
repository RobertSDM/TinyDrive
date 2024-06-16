// import { MutableRefObject, useRef, useState } from "react";

// const useSearchHook = () => {
//     const [search, setSearch] = useState("");

//     const searchElement = useRef(
//         null
//     ) as MutableRefObject<HTMLInputElement | null>;

//     const [foundItems, setFoundItems] = useState([]);

//     // function findArchives(value: string) {
//     //     const found = archives.filter((i) => {
//     //         return i.name.toUpperCase().includes(value.toUpperCase());
//     //     });
//     //     return setFoundItems(found);
//     // }

//     function keyClearSearchInput(e: KeyboardEvent) {
//         if (e.key === "Escape") {
//             setSearch("");
//             searchElement.current!.blur();
//         }
//     }

//     function clearSearchInput() {
//         setSearch("");
//     }

//     return {
//         search,
//         setSearch,
//         // findArchives,
//         foundItems,
//         clearSearchInput,
//         keyClearSearchInput,
//         searchElement,
//     };
// };

// export default useSearchHook;
