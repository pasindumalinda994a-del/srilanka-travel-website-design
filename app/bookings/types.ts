/**
 * Shared booking schema — aligns contact form payload and admin bookings display.
 * Matches the structure used in BookingForm.tsx mailto body.
 */

/** Booking payload from contact form (mailto body structure). */
export type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  tourId: string;
  tourTitle: string;
  travelDate: string;
  adults: number;
  children: number;
  message?: string;
};

/** Admin row type: payload + id and status. */
export type BookingRow = BookingPayload & {
  id: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};
