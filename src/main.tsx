import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Files from "./pages/Files.tsx";
import { TitleProvider } from "./control/context/titleContext.tsx";
import { TreeProvider } from "./control/context/TreeContext.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/folder/:id",
        element: <Files />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
        <TitleProvider>
            <main className="w-[100%] h-[100dvh]">
                <TreeProvider>
                    <RouterProvider router={router} />
                </TreeProvider>
            </main>
        </TitleProvider>
    // </React.StrictMode>
);
