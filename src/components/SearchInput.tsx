// import useSearchHook from "../control/serchHook.ts";

// const SearchInput = () => {

//     const {clearSearchInput, setSearch, // findArchives, 
//     keyClearSearchInput,search, searchElement} = useSearchHook()
    
//     return (
//         <>
//             <input
//                 className="outline-none w-full px-4 py-2"
//                 ref={searchElement}
//                 onKeyDown={() => keyClearSearchInput}
//                 onBlur={() => clearSearchInput}
//                 onChange={(e) => {
//                     // findArchives(e.target.value);
//                     setSearch(e.target.value);
//                 }}
//                 value={search}
//                 type="text"
//                 placeholder="Pesquisar no TinyDrive"
//             />
//             <div
//                 className={`top-full -left-[1px] border-black/40 border border-t-0 bg-white absolute ${
//                     search.length > 0 ? "flex" : "hidden"
//                 } flex-col w-[calc(100%_+_2px)]`}
//             >
//                 {/* {foundItems.length > 0 && search.length > 0 ? (
//                     foundItems.map((i) => (
//                         <span className="hover:bg-purple-100 p-2">
//                             {i.name}
//                         </span>
//                     ))
//                 ) : (
//                     <span className="text-black/40 text-sm p-2 mx-auto">
//                         Nenhum resultado encontrado
//                     </span>
//                 )} */}
//             </div>
//         </>
//     );
// }

// export default SearchInput
