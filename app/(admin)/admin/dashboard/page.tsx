import { AdminStats, type AdminStat } from "@/components/admin/AdminStats";
import { AdminCard } from "@/components/admin/AdminCard";

const MOCK_STATS: AdminStat[] = [
  { label: "Total bookings", value: 128, hint: "All-time confirmed reservations" },
  { label: "Active tours", value: 24, hint: "Published and bookable packages" },
  { label: "Blog posts", value: 36, hint: "Stories, guides & announcements" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-neutral-500 mb-1">Overview</p>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
          Welcome back
        </h2>
      </div>

      <AdminStats stats={MOCK_STATS} />

      <div className="grid gap-4 md:grid-cols-2">
        <AdminCard
          title="Bookings trend"
          description="Simple weekly bookings line chart. Connect to your real data later."
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span>Last 7 days</span>
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-4 rounded-full bg-emerald-500" />
                <span>Bookings</span>
              </span>
            </div>

            <div className="relative h-40 w-full rounded-xl border border-[var(--admin-card-border)] bg-white/80 px-3 pb-4 pt-6">
              {/* Y-axis labels */}
              <div className="pointer-events-none absolute inset-y-4 left-2 flex flex-col justify-between text-[10px] text-neutral-400">
                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>0</span>
              </div>

              {/* Line chart */}
              <svg viewBox="0 0 100 60" className="h-full w-full">
                {/* Grid lines */}
                <g stroke="#E5E7EB" strokeWidth="0.5">
                  <line x1="0" y1="50" x2="100" y2="50" />
                  <line x1="0" y1="37.5" x2="100" y2="37.5" />
                  <line x1="0" y1="25" x2="100" y2="25" />
                  <line x1="0" y1="12.5" x2="100" y2="12.5" />
                </g>

                {/* Area under line */}
                <path
                  d="M0 45 L16 38 L33 35 L50 28 L66 22 L83 18 L100 15 L100 60 L0 60 Z"
                  fill="#6EE7B7"
                  fillOpacity="0.15"
                />

                {/* Line */}
                <path
                  d="M0 45 L16 38 L33 35 L50 28 L66 22 L83 18 L100 15"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Points */}
                <g fill="#10B981" stroke="#ECFDF5" strokeWidth="1.2">
                  <circle cx="0" cy="45" r="1.8" />
                  <circle cx="16" cy="38" r="1.8" />
                  <circle cx="33" cy="35" r="1.8" />
                  <circle cx="50" cy="28" r="1.8" />
                  <circle cx="66" cy="22" r="1.8" />
                  <circle cx="83" cy="18" r="1.8" />
                  <circle cx="100" cy="15" r="1.8" />
                </g>
              </svg>

              {/* X-axis labels */}
              <div className="pointer-events-none absolute inset-x-4 bottom-1 flex justify-between text-[10px] text-neutral-400">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </AdminCard>

        <AdminCard
          title="Calendar"
          description="Quick view of the current month. Connect this to your booking engine when ready."
        >
          <div className="rounded-xl border border-dashed border-[var(--admin-card-border)] bg-white/80 p-4 text-sm text-neutral-700">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-medium">February 2026</p>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span>Booked</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] uppercase tracking-wide text-neutral-400">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            <div className="mt-2 grid grid-cols-7 gap-1.5 text-xs">
              {/* Leading empty days */}
              <span />
              <span />
              <span />

              {/* Simple static dates for demo */}
              {Array.from({ length: 29 }).map((_, i) => {
                const day = i + 1;
                const isBooked = [3, 7, 12, 18, 21, 27].includes(day);

                return (
                  <button
                    key={day}
                    type="button"
                    className={`flex h-7 w-full items-center justify-center rounded-full border text-neutral-700 transition-colors ${
                      isBooked
                        ? "border-emerald-500 bg-emerald-50 font-semibold"
                        : "border-transparent hover:border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
