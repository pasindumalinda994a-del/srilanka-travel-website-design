import type { AdminFormField } from "@/components/admin/AdminForm";

/**
 * Shared tour form fields — aligned with app/tours/[tour] and TourContent.ts.
 * Used by create and edit pages. Parse submitted values with parseTourFormValues from @/app/tours/types.
 */
export const TOUR_FIELDS: AdminFormField[] = [
  { type: "section", name: "_section_identity", label: "Identity" },
  {
    name: "title",
    label: "Tour title",
    placeholder: "E.g. Cultural Discovery",
    type: "text",
  },
  {
    name: "cardNumber",
    label: "Card number",
    placeholder: "E.g. 01",
    type: "text",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Draft", value: "draft" },
      { label: "Published", value: "published" },
    ],
  },

  { type: "section", name: "_section_image", label: "Image" },
  {
    name: "imageSrc",
    label: "Image URL",
    placeholder: "/images/tourpage/example.jpeg",
    type: "text",
  },
  {
    name: "imageAlt",
    label: "Image alt text",
    placeholder: "Describe the image for accessibility",
    type: "text",
  },

  { type: "section", name: "_section_overview", label: "Overview" },
  {
    name: "description",
    label: "Description (one paragraph per line)",
    placeholder: "First paragraph.\n\nSecond paragraph.",
    type: "textarea",
  },

  { type: "section", name: "_section_details", label: "Details" },
  {
    name: "duration",
    label: "Duration",
    placeholder: "E.g. 4–5 hours",
    type: "text",
  },
  {
    name: "meetingPoint",
    label: "Meeting point",
    placeholder: "E.g. Colombo City Centre",
    type: "text",
  },
  {
    name: "groupSize",
    label: "Group size",
    placeholder: "E.g. Up to 6 people",
    type: "text",
  },
  {
    name: "tourType",
    label: "Tour type",
    type: "select",
    options: [
      { label: "Walking / Transport", value: "Walking / Transport" },
      { label: "Transport / Beach", value: "Transport / Beach" },
      { label: "Walking", value: "Walking" },
      { label: "Jeep Safari", value: "Jeep Safari" },
    ],
  },
  {
    name: "level",
    label: "Level",
    type: "select",
    options: [
      { label: "Easy", value: "Easy" },
      { label: "Moderate", value: "Moderate" },
    ],
  },
  {
    name: "schedule",
    label: "Schedule",
    type: "select",
    options: [
      { label: "Morning", value: "Morning" },
      { label: "Full Day", value: "Full Day" },
      { label: "Evening", value: "Evening" },
    ],
  },
  {
    name: "languages",
    label: "Languages",
    placeholder: "E.g. English / Sinhala",
    type: "text",
  },

  { type: "section", name: "_section_price", label: "Price" },
  {
    name: "price",
    label: "Price",
    placeholder: "49",
    type: "number",
  },
  {
    name: "perPerson",
    label: "Per person",
    placeholder: "per person",
    type: "text",
  },

  { type: "section", name: "_section_schedule", label: "Tour schedule (optional)" },
  {
    name: "tourSchedule",
    label: "Schedule (one line per item: HH:MM | Activity)",
    placeholder: "08:00 | Pickup from hotel\n09:00 | Visit temple",
    type: "textarea",
  },
];
