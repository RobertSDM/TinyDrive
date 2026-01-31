import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Notify } from "@notify/context/NotifyContext.tsx";
import DrivePage from "@/pages/DrivePage.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/reactQuery.ts";
import { ModalProvider } from "./features/modal/context/modalContext.tsx";
import AccountProvider from "./features/authentication/context/AccountContext.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AuthRenderingManager from "./components/AuthRenderingManager.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import HomePage from "./pages/HomePage.tsx";

const router = createBrowserRouter([
    { index: true, element: <HomePage /> },
    {
        element: <AuthRenderingManager />,
        children: [
            {
                path: "/drive/:parentid?",
                element: <DrivePage />,
            },
        ],
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <Notify>
        <QueryClientProvider client={queryClient}>
            <AccountProvider>
                <ModalProvider>
                    <RouterProvider router={router} />
                </ModalProvider>
            </AccountProvider>
        </QueryClientProvider>
    </Notify>
    // </React.StrictMode>
);
