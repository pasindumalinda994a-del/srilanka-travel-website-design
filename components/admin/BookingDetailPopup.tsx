"use client";

import type { BookingRow } from "@/app/bookings/types";

const STATUS_OPTIONS: { value: BookingRow["status"]; label: string }[] = [
  { value: "Pending", label: "Pending" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Cancelled", label: "Cancelled" },
];

type BookingDetailPopupProps = {
  booking: BookingRow | null;
  onClose: () => void;
  onStatusChange?: (bookingId: string, newStatus: BookingRow["status"]) => void;
};

export function BookingDetailPopup({
  booking,
  onClose,
  onStatusChange,
}: BookingDetailPopupProps) {
  if (!booking) return null;

  const styleMap: Record<BookingRow["status"], string> = {
    Pending: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
    Confirmed: "bg-[var(--foreground)]/10 text-[var(--foreground)] ring-1 ring-[var(--foreground)]/20",
    Cancelled: "bg-neutral-200/80 text-neutral-600 ring-1 ring-neutral-300/80",
  };

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as BookingRow["status"];
    onStatusChange?.(booking.id, newStatus);
  }

  const DetailRow = ({
    label,
    value,
    className = "",
  }: {
    label: string;
    value: string | number | undefined | null;
    className?: string;
  }) => (
    <div className={className}>
      <dt className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-[var(--foreground)]">
        {value !== undefined && value !== null && value !== "" ? value : "—"}
      </dd>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-detail-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-[var(--admin-card-border)] bg-[var(--background)] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 id="booking-detail-title" className="text-lg font-semibold text-[var(--foreground)]">
              Booking #{booking.id}
            </h2>
            {onStatusChange ? (
              <select
                value={booking.status}
                onChange={handleStatusChange}
                className={[
                  "rounded-full border-0 px-3 py-1 text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-neutral-400",
                  styleMap[booking.status],
                ].join(" ")}
                aria-label="Update status"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <span
                className={[
                  "inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                  styleMap[booking.status],
                ].join(" ")}
              >
                {booking.status}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
          <DetailRow label="Name" value={booking.name} />
          <DetailRow label="Email" value={booking.email} />
          <DetailRow label="Phone" value={booking.phone} />
          <DetailRow label="Tour" value={booking.tourTitle} />
          <DetailRow label="Tour ID" value={booking.tourId} />
          <DetailRow label="Travel date" value={booking.travelDate} />
          <DetailRow label="Adults" value={booking.adults} />
          <DetailRow label="Children" value={booking.children} />
          <DetailRow label="Special requests" value={booking.message} className="col-span-2" />
        </dl>
      </div>
    </div>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
