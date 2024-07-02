import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Files from "./pages/Files.tsx";
import AuthLayout from "./pages/layouts/AuthLayout.tsx";
import Register from "./pages/auth/Register.tsx";
import ContentLayout from "./pages/layouts/ContentLayout.tsx";
import Login from "./pages/auth/Login.tsx";
import { UserProvider } from "./control/context/UserContext.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ContentLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/folder/:id",
                element: <Files />,
            },
        ],
    },
    {
        path: "/",
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <UserProvider>
        <main className="w-[100%] h-[100dvh]">
            <RouterProvider router={router} />
        </main>
    </UserProvider>
    // </React.StrictMode>
);
