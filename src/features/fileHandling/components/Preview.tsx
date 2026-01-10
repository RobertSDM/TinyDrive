// import {
//     useDownloadFile,
//     usePreview,
// } from "@/features/fileHandling/requests/file.tsx";
// import { Item } from "@/types.ts";
// import { useEffect, useState } from "react";

// type PreviewProps = {
//     item: Item;
//     isOpen?: boolean;
//     close: () => void;
// };
// export default function Preview({ item, isOpen, close }: PreviewProps) {
//     const { request: download } = useDownloadFile(item);

//     useEffect(() => {
//         document.body.style.overflow = "hidden";
//         window.onpopstate = close;

//         return () => {
//             document.body.style.overflow = "auto";
//         };
//     }, []);

//     return (
//         <div
//             className="fixed top-0 left-0 flex items-center w-full h-full bg-black/80 z-50 flex-col px-4 py-4 gap-y-4"
//             hidden={isOpen}
//             onClick={close}
//             onScroll={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//             }}
//             onWheel={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//             }}
//         >
//             <header
//                 className=" text-white items-center flex  w-full justify-center"
//                 onClick={close}
//             >
//                 <p
//                     className=" bg-black py-1 pl-4 whitespace-nowrap text-ellipsis overflow-hidden max-w-96"
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     {item.name}
//                 </p>
//                 <section
//                     className="bg-black py-1 pr-4"
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     <p>{item.extension}</p>
//                 </section>
//                 <button
//                     className="bg-black px-4 ml-4 py-1"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         download();
//                     }}
//                 >
//                     Download
//                 </button>
//             </header>

//             {item.content_type.startsWith("image") ? (
//                 <ImagePreview item={item} />
//             ) : (
//                 <p className="font-semibold text-slate-400">Soon</p>
//             )}
//         </div>
//     );
// }

// type ImagePreviewProps = {
//     item: Item;
// };
// function ImagePreview({ item }: ImagePreviewProps) {
//     const { data, request, isLoading } = usePreview(item.id!);
//     const [url, setUrl] = useState<string>("");

//     useEffect(() => {
//         if (!data) return;

//         setUrl(data.data);
//     }, [data]);

//     useEffect(() => {
//         request();
//     }, []);

//     return (
//         <section className="flex-1 flex items-center justify-center">
//             {isLoading ? (
//                 <p className="font-semibold text-slate-400">Loading...</p>
//             ) : (
//                 <img
//                     key={url}
//                     onClick={(e) => e.stopPropagation()}
//                     src={url}
//                     className="w-full h-auto max-h-[80vh] object-scale-down"
//                 />
//             )}
//         </section>
//     );
// }
