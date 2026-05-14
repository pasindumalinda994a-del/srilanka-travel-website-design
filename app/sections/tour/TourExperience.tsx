import Image from "next/image";
import { Label, TourCard, H2Secondary } from "@/components/website";
import { getTourSlug } from "@/app/tours/TourContent";

type ExperienceItem = {
  readonly title: string;
  readonly image: string;
  readonly alt: string;
};

type TourCardData = {
  readonly number: string;
  readonly title: string;
  readonly description: readonly string[];
  readonly duration: string;
  readonly meetingPoint: string;
  readonly groupSize: string;
  readonly tourType: string;
  readonly level: string;
  readonly schedule: string;
  readonly languages: string;
  readonly price: number;
  readonly perPerson?: string;
};

type TourItem = {
  readonly image: {
    readonly src: string;
    readonly alt: string;
  };
  readonly card: TourCardData;
};

type TourExperienceProps = {
  label?: string;
  heading: string | { line1: string; line2?: string };
  description?: string;
  experiences?: ReadonlyArray<ExperienceItem>;
  cta?: string;
  tours?: ReadonlyArray<TourItem>;
  // Legacy props for backward compatibility
  tourImage?: {
    readonly src: string;
    readonly alt: string;
  };
  tourCard?: TourCardData;
};

export default function TourExperience({
  label,
  heading,
  description,
  experiences = [],
  cta,
  tours = [],
  tourImage,
  tourCard,
}: TourExperienceProps) {
  // Handle heading as string with line breaks
  const headingText =
    typeof heading === "string"
      ? heading
      : `${heading.line1}${heading.line2 ? `\n${heading.line2}` : ""}`;
  const headingLines = headingText.split("\n");

  const descriptionLines = description ? description.split("\n") : [];

  // Convert legacy single tour to array format if provided
  const tourItems: ReadonlyArray<TourItem> =
    tours.length > 0
      ? tours
      : tourImage && tourCard
      ? [{ image: tourImage, card: tourCard }]
      : [];

  return (
    <section className="w-full pb-28 md:pb-30 lg:pb-32">
      {/* Container with max-width 1440px, centered, and 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px] px-2">
        {/* 12-column grid with consistent gap-3 (12px) */}
        <div className="grid grid-cols-12 gap-3">
          {/* Label on the left */}
          <div className="col-span-1">
            {label && <Label className="self-start">{label}</Label>}
          </div>

          {/* Heading on the right with exact line breaks */}
          <div className="col-span-11 flex flex-col pl-32 md:pl-48">
            <H2Secondary className="font-bold" textAlign="left">
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </H2Secondary>
          </div>
        </div>

        {/* Tour Items Section - Alternating pattern */}
        {tourItems.length > 0 && (
          <div className="space-y-6 md:space-y-8 mt-6 md:mt-8">
            {tourItems.map((tour, index) => {
              const isEven = index % 2 === 0;
              const imageFirst = isEven; // Even index: image left, card right. Odd index: card left, image right

              return (
                <div key={index} className="grid grid-cols-12 gap-3">
                  {/* Image */}
                  <div
                    className={`col-span-12 md:col-span-6 relative rounded-3xl overflow-hidden aspect-[4/3] ${
                      imageFirst ? "order-1" : "order-2"
                    }`}
                  >
                    <Image
                      src={tour.image.src}
                      alt={tour.image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Tour Card */}
                  <div
                    className={`col-span-12 md:col-span-6 aspect-[4/3] ${
                      imageFirst ? "order-2" : "order-1"
                    }`}
                  >
                    <TourCard
                      number={tour.card.number}
                      title={tour.card.title}
                      description={[...tour.card.description]}
                      duration={tour.card.duration}
                      meetingPoint={tour.card.meetingPoint}
                      groupSize={tour.card.groupSize}
                      tourType={tour.card.tourType}
                      level={tour.card.level}
                      schedule={tour.card.schedule}
                      languages={tour.card.languages}
                      price={tour.card.price}
                      perPerson={tour.card.perPerson}
                      exploreHref={`/tours/${getTourSlug(tour.card.title)}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

