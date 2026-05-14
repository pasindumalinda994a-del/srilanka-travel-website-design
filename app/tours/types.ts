/**
 * Shared tour schema — aligns admin form payloads and public tour package display.
 * Matches the shape used in TourContent.tourExperience.tours and app/tours/[tour].
 */

export type TourScheduleItem = {
  time: string;
  activity: string;
};

export type TourCard = {
  number: string;
  title: string;
  description: string[];
  duration: string;
  meetingPoint: string;
  groupSize: string;
  tourType: string;
  level: string;
  schedule: string;
  languages: string;
  price: number;
  perPerson: string;
};

export type TourDetailItem = {
  image: {
    src: string;
    alt: string;
  };
  card: TourCard;
  tourSchedule?: TourScheduleItem[];
};

/** Admin form submits Record<string, string>. Parsed shape for API/write layer. */
export type TourFormPayload = {
  imageSrc: string;
  imageAlt: string;
  cardNumber: string;
  title: string;
  description: string[];
  duration: string;
  meetingPoint: string;
  groupSize: string;
  tourType: string;
  level: string;
  schedule: string;
  languages: string;
  price: string;
  perPerson: string;
  tourSchedule: TourScheduleItem[];
  status: string;
};

/**
 * Parse admin form values into TourFormPayload.
 * - description: newline-separated → string[]
 * - tourSchedule: "HH:MM | Activity" per line → { time, activity }[]
 */
export function parseTourFormValues(values: Record<string, string>): TourFormPayload {
  const descRaw = (values.description ?? "").trim();
  const description = descRaw ? descRaw.split(/\n+/).map((p) => p.trim()).filter(Boolean) : [];

  const scheduleRaw = (values.tourSchedule ?? "").trim();
  const tourSchedule: TourScheduleItem[] = scheduleRaw
    ? scheduleRaw.split(/\n/).map((line) => {
        const match = line.trim().match(/^(.+?)\s*\|\s*(.+)$/);
        if (match) return { time: match[1].trim(), activity: match[2].trim() };
        return { time: "", activity: line.trim() };
      }).filter((item) => item.time || item.activity)
    : [];

  return {
    imageSrc: values.imageSrc ?? "",
    imageAlt: values.imageAlt ?? "",
    cardNumber: values.cardNumber ?? "",
    title: values.title ?? "",
    description,
    duration: values.duration ?? "",
    meetingPoint: values.meetingPoint ?? "",
    groupSize: values.groupSize ?? "",
    tourType: values.tourType ?? "",
    level: values.level ?? "",
    schedule: values.schedule ?? "",
    languages: values.languages ?? "",
    price: values.price ?? "",
    perPerson: values.perPerson ?? "per person",
    tourSchedule,
    status: values.status ?? "draft",
  };
}

/**
 * Input shape for tourToFormValues (accepts static content with readonly arrays).
 */
type TourForForm = {
  image: { src: string; alt: string };
  card: {
    number: string;
    title: string;
    description: readonly string[] | string[];
    duration: string;
    meetingPoint: string;
    groupSize: string;
    tourType: string;
    level: string;
    schedule: string;
    languages: string;
    price: number;
    perPerson: string;
  };
  tourSchedule?: readonly { time: string; activity: string }[];
};

/**
 * Serialize a tour into flat form values for admin edit.
 */
export function tourToFormValues(tour: TourForForm): Record<string, string> {
  const schedule = tour.tourSchedule ?? [];
  const tourScheduleStr = schedule.map((s) => `${s.time} | ${s.activity}`).join("\n");

  return {
    imageSrc: tour.image.src ?? "",
    imageAlt: tour.image.alt ?? "",
    cardNumber: tour.card.number ?? "",
    title: tour.card.title ?? "",
    description: [...(tour.card.description ?? [])].join("\n\n"),
    duration: tour.card?.duration ?? "",
    meetingPoint: tour.card.meetingPoint ?? "",
    groupSize: tour.card.groupSize ?? "",
    tourType: tour.card.tourType ?? "",
    level: tour.card.level ?? "",
    schedule: tour.card.schedule ?? "",
    languages: tour.card.languages ?? "",
    price: String(tour.card.price ?? ""),
    perPerson: tour.card.perPerson ?? "per person",
    tourSchedule: tourScheduleStr,
    status: "published",
  };
}
