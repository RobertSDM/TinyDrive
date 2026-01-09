import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@auth/Login.tsx";
import Register from "@auth/Register.tsx";
import "./index.css";
import { Notify } from "@notify/context/NotifyContext.tsx";
import DrivePage from "@/pages/DrivePage.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/reactQuery.ts";

const router = createBrowserRouter([
    {
        path: "/drive",
        element: <DrivePage />,
    },
    {
        children: [
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <section className="w-dvw h-dvh relative flex flex-col">
        <Notify>
            <QueryClientProvider client={queryClient}> 
                <RouterProvider router={router} />
            </QueryClientProvider>
        </Notify>
    </section>
    // </React.StrictMode>
);
