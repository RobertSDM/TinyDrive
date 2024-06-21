import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Files from "./pages/Files.tsx";
import { TitleProvider } from "./control/context/titleContext.tsx";
import { TreeProvider } from "./control/context/TreeContext.tsx";
import { NotificationProvider } from "./control/context/NotificationSystem.tsx";
import Notifications from "./components/Notifications.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/folder/:id",
        element: <Files />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <TitleProvider>
        <NotificationProvider>
            <main className="w-[100%] h-[100dvh]">
                <Notifications />
                <TreeProvider>
                    <RouterProvider router={router} />
                </TreeProvider>
            </main>
        </NotificationProvider>
    </TitleProvider>
    // </React.StrictMode>
);
