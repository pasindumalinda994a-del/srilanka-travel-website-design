"use client";

import { usePathname } from "next/navigation";

const getTitleFromPathname = (pathname: string): string => {
  if (pathname.startsWith("/admin/bookings")) return "Bookings";
  if (pathname.startsWith("/admin/blogs")) return "Blogs";
  if (pathname.startsWith("/admin/tours")) return "Tours";
  if (pathname.startsWith("/admin/dashboard")) return "Dashboard";
  if (pathname.startsWith("/admin/login")) return "Login";
  if (pathname.startsWith("/admin")) return "Admin";
  return "Admin";
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);

  return (
    <header className="sticky top-0 z-20 mt-2 border-b border-[var(--admin-card-border)] bg-[var(--background)]/95 backdrop-blur-sm px-4 py-3 md:mt-3 md:px-8">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[var(--foreground)] md:text-xl">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification icon */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--admin-card-border)] bg-neutral-50 text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="h-9 w-9"
              aria-hidden="true"
            >
              <path
                d="M520.66-234.5q16.67-17.17 16.67-40.83H422q0 23.66 17.17 40.83 17.16 17.17 40.99 17.17 23.82 0 40.5-17.17ZM284-328.67h391.33v-66.66h-40v-111.34q0-60.33-31.5-110.83t-88.5-62.5v-26.67q0-15.01-10.15-25.17Q495.02-742 480.01-742q-15.01 0-25.51 10.16-10.5 10.16-10.5 25.17V-680q-57 12-88.5 60.83-31.5 48.84-31.5 108.5v115.34h-40v66.66Zm106.67-66.66V-520q0-37.95 25.83-64.98Q442.33-612 479.67-612q37.33 0 63.16 27.02 25.84 27.03 25.84 64.98v124.67h-178ZM480.18-80q-82.83 0-155.67-31.5-72.84-31.5-127.18-85.83Q143-251.67 111.5-324.56T80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.46q-54 54.21-127 85.84Q563-80 480.18-80Zm.15-66.67q139 0 236-97.33t97-236.33q0-139-96.87-236-96.88-97-236.46-97-138.67 0-236 96.87-97.33 96.88-97.33 236.46 0 138.67 97.33 236 97.33 97.33 236.33 97.33ZM480-480Z"
                fill="currentColor"
              />
            </svg>
            {/* Unread badge */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
              3
            </span>
          </button>

          {/* Admin user pill */}
          <div className="flex items-center gap-3 rounded-full border border-[var(--admin-card-border)] bg-neutral-50 px-3 py-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--foreground)] text-xs font-semibold text-[var(--background)]">
              A
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-[var(--foreground)]">Admin User</p>
              <p className="text-[11px] text-neutral-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
