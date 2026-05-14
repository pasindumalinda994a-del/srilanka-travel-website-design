import Link from "next/link";
import Arrow from "./Arrow";
import Button from "./Button";

type TourCardProps = {
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
  perPerson?: string;
  onExplore?: () => void;
  /** When set, "Explore Tour" links to this URL instead of using onExplore */
  exploreHref?: string;
};

// Icon components
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.333C4.32 1.333 1.333 4.32 1.333 8C1.333 11.68 4.32 14.667 8 14.667C11.68 14.667 14.667 11.68 14.667 8C14.667 4.32 11.68 1.333 8 1.333ZM8 13.333C5.06 13.333 2.667 10.94 2.667 8C2.667 5.06 5.06 2.667 8 2.667C10.94 2.667 13.333 5.06 13.333 8C13.333 10.94 10.94 13.333 8 13.333ZM8.667 4.667H7.333V8.667L10.667 10.333L11.333 9.333L8.667 8V4.667Z" fill="currentColor"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C5.24 0 3 2.24 3 5C3 9 8 16 8 16C8 16 13 9 13 5C13 2.24 10.76 0 8 0ZM8 6.667C7.08 6.667 6.333 5.92 6.333 5C6.333 4.08 7.08 3.333 8 3.333C8.92 3.333 9.667 4.08 9.667 5C9.667 5.92 8.92 6.667 8 6.667Z" fill="currentColor"/>
  </svg>
);

const PeopleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.333 8C6.806 8 8 6.806 8 5.333C8 3.86 6.806 2.667 5.333 2.667C3.86 2.667 2.667 3.86 2.667 5.333C2.667 6.806 3.86 8 5.333 8ZM5.333 9.333C3.58 9.333 0 10.193 0 11.933V13.333H10.667V11.933C10.667 10.193 7.087 9.333 5.333 9.333ZM10.667 8C11.473 8 12.133 7.34 12.133 6.533C12.133 5.727 11.473 5.067 10.667 5.067C9.86 5.067 9.2 5.727 9.2 6.533C9.2 7.34 9.86 8 10.667 8ZM10.667 9.333C9.86 9.333 8.667 9.667 8.133 10.2C8.8 10.733 9.333 11.6 9.333 12.533V13.333H16V12.533C16 10.793 12.42 9.333 10.667 9.333Z" fill="currentColor"/>
  </svg>
);

export default function TourCard({
  number,
  title,
  description,
  duration,
  meetingPoint,
  groupSize,
  tourType,
  level,
  schedule,
  languages,
  price,
  perPerson = "per person",
  onExplore,
  exploreHref,
}: TourCardProps) {
  return (
    <div className="bg-gray-50 rounded-3xl p-6 md:p-8 h-full flex flex-col">
      {/* Top Section - Title and Number */}
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 flex-1">
          {title}
        </h3>
        <span className="text-sm md:text-base text-gray-500 font-normal ml-4">
          {number}
        </span>
      </div>

      {/* Description Section */}
      <div className="mb-2 space-y-0">
        {description.map((text, index) => (
          <p key={index} className="text-base text-gray-700 font-normal leading-relaxed">
            {text}
          </p>
        ))}
      </div>

      {/* Key Tour Details Section */}
      <div className="py-2 mb-2 space-y-2">
        <div className="flex items-center gap-3">
          <div className="text-gray-900 flex-shrink-0">
            <ClockIcon />
          </div>
          <div className="flex items-center gap-2 text-base text-gray-700">
            <span className="font-normal">Duration:</span>
            <span className="font-medium">{duration}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-gray-900 flex-shrink-0">
            <MapPinIcon />
          </div>
          <div className="flex items-center gap-2 text-base text-gray-700">
            <span className="font-normal">Meeting point:</span>
            <span className="font-medium">{meetingPoint}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-gray-900 flex-shrink-0">
            <PeopleIcon />
          </div>
          <div className="flex items-center gap-2 text-base text-gray-700">
            <span className="font-normal">Group Size:</span>
            <span className="font-medium">{groupSize}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-6"></div>

      {/* Tour Specifications - Two Columns */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 font-normal mb-1">Tour Type</p>
            <p className="text-base text-gray-900 font-medium">{tourType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-normal mb-1">Level / Difficulty</p>
            <p className="text-base text-gray-900 font-medium">{level}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 font-normal mb-1">Schedule</p>
            <p className="text-base text-gray-900 font-medium">{schedule}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-normal mb-1">Languages</p>
            <p className="text-base text-gray-900 font-medium">{languages}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-6"></div>

      {/* Bottom Section - Price and CTA */}
      <div className="flex items-center justify-between gap-4 mt-auto">
        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl md:text-3xl font-bold text-gray-900">${price}</span>
          <span className="text-base text-gray-700 font-normal">/ {perPerson}</span>
        </div>

        {/* CTA Buttons - aligned with Explore section styling */}
        <div className="flex items-center gap-3 md:gap-4">
          {exploreHref ? (
            <Link
              href={exploreHref}
              className="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-base bg-black text-white hover:bg-gray-800 focus:ring-black rounded-full"
            >
              Explore Tour
            </Link>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={onExplore}
            >
              Explore Tour
            </Button>
          )}
          <Button
            variant="icon"
            size="md"
            aria-label="Explore more"
          >
            <Arrow direction="up-right" />
          </Button>
        </div>
      </div>
    </div>
  );
}
