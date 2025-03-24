import { AuthLayout, Login, Register } from "@auth/auth.ts";
import { ContentLayout, Folder, Home } from "@drive/drive.ts";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            /// Content Layout [START]
            {
                element: <ContentLayout />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: "/folder/:id",
                        element: <Folder />,
                    },
                ],
            },
            /// Content Layout [END]
            /// Auth Layout [START]
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
            /// Auth Layout [END]
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <UserProvider>
        <main className="w-[100vw] h-[100dvh]">
            <RouterProvider router={router} />
        </main>
    </UserProvider>
    // </React.StrictMode>
);
