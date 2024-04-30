import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./view/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Files from "./view/Files.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/folder/:id",
        element: <Files/>
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <main className="w-[100%] h-[100dvh]">
            <RouterProvider router={router} />
        </main>
    </React.StrictMode>
);
