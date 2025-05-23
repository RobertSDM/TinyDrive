import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./features/auth/layouts/AuthLayout.tsx";
import Login from "./features/auth/pages/Login.tsx";
import Register from "./features/auth/pages/Register.tsx";
import DriveLayout from "./features/drive/layouts/DriveLayout.tsx";
import Drive from "./features/drive/pages/Drive.tsx";
import "./index.css";
import ProtectedPage from "./shared/components/RouteWrapper/ProtectedRoute.tsx";
import AuthProvider from "./shared/context/AuthContext.tsx";
import { Notify } from "./shared/context/NotifyContext.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                element: <ProtectedPage />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <section className="w-dvw h-dvh relative flex flex-col">
        <Notify>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </Notify>
    </section>
    // </React.StrictMode>
);
