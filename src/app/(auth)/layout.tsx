import { BottomNav } from "@/components/bottom-nav";
import { Header } from "@/components/header";
import { MobileTaskFab } from "@/components/mobile-task-fab";
import { Sidebar } from "@/components/sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {children}
        </main>
      </div>
      <BottomNav />
      <MobileTaskFab />
    </div>
  );
}
