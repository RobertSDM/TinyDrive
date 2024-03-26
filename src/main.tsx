import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <body className="w-[100%] h-[100dvh]">
            <RouterProvider router={router} />
        </body>
    </React.StrictMode>
);
