import Sidebar from "../components/Sidebar";

export default function AppLayout({children}){
    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 bg-[#f0f6f6]">
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}