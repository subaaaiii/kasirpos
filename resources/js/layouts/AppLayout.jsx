import { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import FlashMessage from "../components/FlashMessage";

export default function AppLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 bg-[#f0f6f6]">
                <main className="">
                    <Toaster position="top-right" />
                    <FlashMessage />
                    {children}
                </main>
            </div>
        </div>
    );
}
