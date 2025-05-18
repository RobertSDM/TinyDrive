import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import AuthLayout from "./features/auth/layouts/AuthLayout.tsx";
import Login from "./features/auth/pages/Login.tsx";
import Register from "./features/auth/pages/Register.tsx";
import DriveLayout from "./features/drive/layouts/DriveLayout.tsx";
import Drive from "./features/drive/pages/Drive.tsx";
import { NotificationProvider } from "./shared/context/NotificationSystem.tsx";
import AuthProvider from "./shared/context/AuthContext.tsx";
import AllowedRoute from "./shared/components/RouteWrapper/AllowedRoute.tsx";
import ProtectedRoute from "./shared/components/RouteWrapper/ProtectedRoute.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <DriveLayout />,
                        children: [
                            {
                                path: "/drive?/:parentid",
                                element: <Drive />,
                            },
                        ],
                    },
                ],
            },
            {
                element: <AllowedRoute />,
                children: [
                    {
                        element: <AuthLayout />,
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
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <section className="w-[100vw] h-[100dvh]">
        <NotificationProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </NotificationProvider>
    </section>
    // </React.StrictMode>
);
