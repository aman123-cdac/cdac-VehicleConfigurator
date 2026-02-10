
import Sidebar from "./Sidebar";
import { Header } from "./Header";

export const MainLayout = ({ children, title, subtitle }) => {
    return (
        <div className="flex min-h-screen w-full bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Header title={title} subtitle={subtitle} />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};
