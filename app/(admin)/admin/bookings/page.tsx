"use client";

import { useState, useCallback, useEffect } from "react";
import { AdminTable, type AdminTableColumn } from "@/components/admin/AdminTable";
import { BookingDetailPopup } from "@/components/admin/BookingDetailPopup";
import type { BookingRow } from "@/app/bookings/types";

const MOCK_BOOKINGS: BookingRow[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+966 55 123 4567",
    tourId: "sahara-desert-under-the-stars",
    tourTitle: "Sahara Desert Under the Stars",
    travelDate: "2026-03-12",
    adults: 2,
    children: 1,
    message: "Vegetarian meals preferred.",
    status: "Confirmed",
  },
  {
    id: "2",
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "+966 53 987 6543",
    tourId: "atlas-mountains-day-hike",
    tourTitle: "Atlas Mountains Day Hike",
    travelDate: "2026-03-15",
    adults: 1,
    children: 0,
    status: "Pending",
  },
  {
    id: "3",
    name: "Amira El Fassi",
    email: "amira@example.com",
    phone: "+966 50 111 2233",
    tourId: "hidden-gems-of-marrakech",
    tourTitle: "Hidden Gems of Marrakech",
    travelDate: "2026-03-20",
    adults: 3,
    children: 2,
    message: "Need wheelchair access at meeting point.",
    status: "Cancelled",
  },
];

const COLUMNS: AdminTableColumn<BookingRow>[] = [
  { key: "name", header: "Name" },
  { key: "tourTitle", header: "Tour" },
  { key: "travelDate", header: "Date" },
  {
    key: "status",
    header: "Status",
    render: (row) => {
      const styleMap: Record<BookingRow["status"], string> = {
        Pending: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
        Confirmed: "bg-[var(--foreground)]/10 text-[var(--foreground)] ring-1 ring-[var(--foreground)]/20",
        Cancelled: "bg-neutral-200/80 text-neutral-600 ring-1 ring-neutral-300/80",
      };

      return (
        <span
          className={[
            "inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium",
            styleMap[row.status],
          ].join(" ")}
        >
          {row.status}
        </span>
      );
    },
  },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRow[]>(MOCK_BOOKINGS);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const selectedBooking = selectedBookingId
    ? bookings.find((b) => b.id === selectedBookingId) ?? null
    : null;

  const handleClose = useCallback(() => {
    setSelectedBookingId(null);
  }, []);

  const handleStatusChange = useCallback((bookingId: string, newStatus: BookingRow["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  }, []);

  useEffect(() => {
    if (!selectedBookingId) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedBookingId, handleClose]);

  return (
    <div>
      <AdminTable
        columns={COLUMNS}
        data={bookings}
        onRowClick={(row) => setSelectedBookingId(row.id)}
      />
      <BookingDetailPopup
        booking={selectedBooking}
        onClose={handleClose}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
