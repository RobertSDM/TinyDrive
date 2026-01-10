import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Notify } from "@notify/context/NotifyContext.tsx";
import DrivePage from "@/pages/DrivePage.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/reactQuery.ts";
import { ModalProvider } from "./features/modal/context/modalContext.tsx";

const router = createBrowserRouter([
    {
        path: "/drive",
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
    <section className="w-dvw h-dvh relative flex flex-col">
        <Notify>
            <QueryClientProvider client={queryClient}>
                <ModalProvider>
                    <RouterProvider router={router} />
                </ModalProvider>
            </QueryClientProvider>
        </Notify>
    </section>
    // </React.StrictMode>
);
