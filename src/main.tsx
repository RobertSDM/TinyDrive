import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./features/authentication/Login.tsx";
import Register from "./features/authentication/Register.tsx";
import FileViewLayout from "./features/fileView/FileViewLayout.tsx";
import FileView from "./features/fileView/FileViewPage.tsx";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";
import { Notify } from "./context/NotifyContext.tsx";
import ProtectedPage from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
    {
        element: <ProtectedPage />,
        children: [
            {
                element: <FileViewLayout />,
                children: [
                    {
                        path: "/drive?/:parentid",
                        element: <FileView />,
                    },
                ],
            },
        ],
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
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </Notify>
    </section>
    // </React.StrictMode>
);
