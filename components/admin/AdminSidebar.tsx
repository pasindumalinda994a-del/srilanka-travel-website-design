"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Tours", href: "/admin/tours" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-full w-64 flex-col rounded-2xl bg-[var(--admin-sidebar-bg)] px-4 py-6 md:flex border border-white/[0.06] shadow-lg">
      <div className="mb-6 px-2">
        <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-[var(--admin-sidebar-muted)] ring-1 ring-white/10">
          Admin Panel
        </span>
        <h2 className="mt-3 text-lg font-semibold tracking-tight text-[var(--admin-sidebar-text)]">
          Marwa Travel
        </h2>
        <p className="mt-1 text-xs text-[var(--admin-sidebar-muted)]">
          Manage bookings, blog posts, and tour packages.
        </p>
      </div>

      <nav className="mt-2 space-y-0.5 text-sm">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200",
                "hover:bg-white/10",
                isActive
                  ? "bg-white/15 text-white font-medium ring-1 ring-white/20"
                  : "text-[var(--admin-sidebar-muted)]",
              ].join(" ")}
            >
              <span>{item.label}</span>
              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 text-[11px] text-[var(--admin-sidebar-muted)] border-t border-white/10 pt-4">
        <p className="font-medium text-white/80">Session</p>
        <p className="mt-1">Authentication will be added here later.</p>
      </div>
    </aside>
  );
}
