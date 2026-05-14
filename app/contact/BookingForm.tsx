"use client";

import { useEffect, useRef, useState, type SVGProps } from "react";
import { Button, Arrow } from "@/components/website";
import { contactContent } from "@/app/contact/ContactContent";

export interface TourOption {
  id: string;
  title: string;
}

interface BookingFormProps {
  tourOptions: TourOption[];
  contactEmail?: string;
  className?: string;
}

export default function BookingForm({
  tourOptions,
  contactEmail = "hello@marwa-tours.com",
  className = "",
}: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tourId, setTourId] = useState("");
  const [tourTitle, setTourTitle] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");
  const [isTravelerPanelOpen, setIsTravelerPanelOpen] = useState(false);
  const travelerFieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isTravelerPanelOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (travelerFieldRef.current && !travelerFieldRef.current.contains(event.target as Node)) {
        setIsTravelerPanelOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsTravelerPanelOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keyup", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keyup", handleEscape);
    };
  }, [isTravelerPanelOpen]);

  function handleTourChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setTourId(value);
    const opt = tourOptions.find((t) => t.id === value);
    setTourTitle(opt ? opt.title : "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorDetail("");
    setStatus("submitting");

    if (!name.trim() || !email.trim() || !phone.trim() || !tourId || !tourTitle || !travelDate) {
      setStatus("error");
      setErrorDetail("Please fill in all required fields.");
      return;
    }

    const numAdults = Math.max(0, Number(adults));
    const numChildren = Math.max(0, Number(children));
    const numberOfPeople = numAdults + numChildren;

    if (numberOfPeople < 1) {
      setStatus("error");
      setErrorDetail("At least one traveler is required.");
      return;
    }

    const date = new Date(travelDate);
    if (Number.isNaN(date.getTime())) {
      setStatus("error");
      setErrorDetail("Please enter a valid date.");
      return;
    }

    const subject = encodeURIComponent(`Booking request: ${tourTitle}`);
    const bodyLines = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `Tour: ${tourTitle}`,
      `Preferred date: ${travelDate}`,
      `Travelers: ${numAdults} adults, ${numChildren} child${numChildren !== 1 ? "ren" : ""}`,
    ];

    if (message.trim()) {
      bodyLines.push("", "Message / special requests:", message.trim());
    }

    const body = encodeURIComponent(bodyLines.join("\n"));
    const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailto;
    setStatus("success");
    setIsTravelerPanelOpen(false);
    setName("");
    setEmail("");
    setPhone("");
    setTourId("");
    setTourTitle("");
    setTravelDate("");
    setAdults(2);
    setChildren(1);
    setMessage("");
  }

  const inputClass =
    "w-full rounded-[24px] border border-transparent bg-[#F6F5F1] px-5 py-4 text-base text-gray-900 placeholder:text-gray-500 transition focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-black";
  const labelClass = "block text-sm font-medium text-gray-900";
  const travelerSummary = `${adults} adult${adults === 1 ? "" : "s"}, ${children} child${children === 1 ? "" : "ren"}`;
  const baseFormClass =
    "rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_30px_60px_rgba(15,23,42,0.08)] md:p-10";
  const formClassName = className ? `${baseFormClass} ${className}` : baseFormClass;

  return (
    <form
      className={formClassName}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className={labelClass}>
            {contactContent.form.nameLabel}
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={contactContent.form.namePlaceholder}
            className={inputClass}
            required
            disabled={status === "submitting"}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-email" className={labelClass}>
            {contactContent.form.emailLabel}
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={contactContent.form.emailPlaceholder}
            className={inputClass}
            required
            disabled={status === "submitting"}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-phone" className={labelClass}>
            {contactContent.form.phoneLabel}
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={contactContent.form.phonePlaceholder}
            className={inputClass}
            required
            disabled={status === "submitting"}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-tour" className={labelClass}>
            {contactContent.form.tourLabel}
          </label>
          <div className="relative">
            <select
              id="contact-tour"
              value={tourId}
              onChange={handleTourChange}
              className={`${inputClass} appearance-none pr-12`}
              required
              disabled={status === "submitting"}
            >
              <option value="">{contactContent.form.tourPlaceholder}</option>
              {tourOptions.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-gray-500">
              <ChevronDownIcon className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-date" className={labelClass}>
            {contactContent.form.dateLabel}
          </label>
          <input
            id="contact-date"
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className={inputClass}
            required
            disabled={status === "submitting"}
          />
        </div>

        <div className="relative space-y-2" ref={travelerFieldRef}>
          <label className={labelClass}>{contactContent.form.travelersLabel}</label>
          <button
            type="button"
            onClick={() => setIsTravelerPanelOpen((prev) => !prev)}
            className={`${inputClass} flex items-center justify-between text-left`}
            disabled={status === "submitting"}
            aria-expanded={isTravelerPanelOpen}
          >
            <span>{travelerSummary}</span>
            <ChevronDownIcon
              className={`h-4 w-4 text-gray-500 transition-transform ${isTravelerPanelOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isTravelerPanelOpen && (
            <div className="absolute left-0 z-10 mt-3 w-full rounded-3xl border border-gray-100 bg-white p-4 shadow-2xl">
              <div className="space-y-4">
                <TravelerStepper
                  label={contactContent.form.adultsLabel}
                  value={adults}
                  onChange={setAdults}
                  disabled={status === "submitting"}
                />
                <TravelerStepper
                  label={contactContent.form.childrenLabel}
                  value={children}
                  onChange={setChildren}
                  disabled={status === "submitting"}
                />
                <p className="text-xs font-medium text-gray-500">Adjust travelers, then continue.</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="contact-message" className={labelClass}>
            {contactContent.form.messageLabel}
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder={contactContent.form.messagePlaceholder}
            className={`${inputClass} resize-none`}
            disabled={status === "submitting"}
          />
        </div>

        {status === "success" && (
          <div className="md:col-span-2 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800" aria-live="polite">
            Your email client will open. Send the email to complete your booking request.
          </div>
        )}

        {status === "error" && (
          <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800" aria-live="assertive">
            {errorDetail}
          </div>
        )}

        <div className="md:col-span-2 flex items-center gap-3 md:gap-4">
          <Button
            type="submit"
            disabled={status === "submitting"}
            variant="primary"
            size="md"
            className="md:min-w-[200px]"
          >
            {status === "submitting" ? "Opening email..." : contactContent.form.submit}
          </Button>
          <Button
            type="submit"
            disabled={status === "submitting"}
            variant="icon"
            size="md"
            aria-label={contactContent.form.submit}
          >
            <Arrow direction="up-right" />
          </Button>
        </div>
      </div>
    </form>
  );
}

type TravelerStepperProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
};

function TravelerStepper({ label, value, onChange, disabled }: TravelerStepperProps) {
  const handleDecrease = () => {
    if (disabled) {
      return;
    }
    onChange(Math.max(0, value - 1));
  };

  const handleIncrease = () => {
    if (disabled) {
      return;
    }
    onChange(value + 1);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={disabled || value <= 0}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-lg text-gray-900 transition hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          -
        </button>
        <span className="w-6 text-center text-base font-semibold text-gray-900">{value}</span>
        <button
          type="button"
          onClick={handleIncrease}
          disabled={disabled}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-900 bg-gray-900 text-lg text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  );
}

type IconProps = SVGProps<SVGSVGElement>;

function ChevronDownIcon({ className }: IconProps) {
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
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
