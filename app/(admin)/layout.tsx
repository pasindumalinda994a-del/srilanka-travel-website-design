import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

// Simple placeholder flag for future authentication logic.
// In the future, this can be replaced with real auth checks (cookies, JWT, etc.).
const isAdmin = true;

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  // If not admin, we can show a simple placeholder.
  // This keeps the layout ready for real protection later.
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--admin-sidebar-bg)] text-white">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-6 shadow-xl backdrop-blur-sm">
          <h1 className="mb-2 font-semibold tracking-tight text-lg md:text-xl">Access restricted</h1>
          <p className="text-sm text-white/70">
            Admin access is required. Authentication will be added here later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
      <div className="my-2 ml-2 flex shrink-0 self-stretch md:my-3 md:ml-3">
        <AdminSidebar />
      </div>
      <div className="flex flex-1 flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-[1440px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

