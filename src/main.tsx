import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Notify } from "@notify/context/NotifyContext.tsx";
import DrivePage from "@/pages/DrivePage.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/reactQuery.ts";
import { ModalProvider } from "./features/modal/context/modalContext.tsx";
import SessionProvider from "./features/authentication/context/SessionContext.tsx";

const router = createBrowserRouter([
    {
        path: "/drive/:parentid?",
        element: <DrivePage />,
    },
    // {
    //     children: [
    //         {
    //             path: "/register",
    //             element: <Register />,
    //         },
    //         {
    //             path: "/login",
    //             element: <Login />,
    //         },
    //     ],
    // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <Notify>
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <ModalProvider>
                    <RouterProvider router={router} />
                </ModalProvider>
            </SessionProvider>
        </QueryClientProvider>
    </Notify>
    // </React.StrictMode>
);
