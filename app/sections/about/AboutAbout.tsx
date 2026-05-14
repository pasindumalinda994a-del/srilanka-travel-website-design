import Image from "next/image";
import Link from "next/link";
import { Label, H2Secondary, Paragraph, Button, Arrow } from "@/components/website";
import type { AboutContent } from "@/app/about/AboutContent";

/**
 * Column gap between grid cells (Tailwind gap-3 = 12px).
 * Used consistently across the 12-column layout.
 */
const GRID_GAP = "gap-3";

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m16.24 7.76-2.12 4.24-4.24 2.12 2.12-4.24 4.24-2.12Z" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  );
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 17h14v-5H5v5Z" />
      <path d="M5 12 7 7h10l2 5" />
      <circle cx="7.5" cy="16.5" r="1.5" />
      <circle cx="16.5" cy="16.5" r="1.5" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

const FEATURE_ICONS = {
  car: CarIcon,
  clock: ClockIcon,
  sun: SunIcon,
} as const;

type AboutAboutProps = {
  content: AboutContent["experience"];
};

export default function AboutAbout({ content }: AboutAboutProps) {
  const { label, heading, cards, stats } = content;
  if (!cards || cards.length !== 3) return null;

  const [infoCard, imageCard, galleryCard] = cards;

  return (
    <section className="w-full pb-28 md:pb-30 lg:pb-32 bg-gray-50/60">
      {/* Container: max width 1440px, centered, 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px] px-[8px]">
        {/* Grid: 12 columns, consistent column gap (12px via gap-3) */}
        <div className={`grid grid-cols-12 ${GRID_GAP}`}>
          {/* Row 1: Label + Heading */}
          <div className="col-span-1">
            <Label className="self-start">{label}</Label>
          </div>
          <div className="col-span-11 flex flex-col pl-3">
            <H2Secondary className="font-bold max-w-4xl self-end text-gray-900">
              {heading}
            </H2Secondary>
          </div>

          {/* Row 2: Three containers, each span 4 cols (stack to full width on mobile) */}
          {infoCard.type === "info" && (
            <div className="col-span-12 md:col-span-4 h-[400px]">
              <div className="h-full rounded-3xl bg-white p-6 md:p-8 flex flex-col gap-6">
                <CompassIcon className="w-8 h-8 md:w-10 md:h-10 text-black shrink-0" />
                <Paragraph className="text-gray-900 text-base md:text-lg">
                  {infoCard.description}
                </Paragraph>
                <div className="flex flex-wrap gap-4 md:gap-6 mt-auto">
                  {infoCard.features.map((f) => {
                    const Icon = FEATURE_ICONS[f.icon];
                    return (
                      <div
                        key={f.text}
                        className="flex items-center gap-2 text-gray-900"
                      >
                        {Icon && <Icon className="w-4 h-4 shrink-0" />}
                        <span className="text-sm md:text-base font-medium">
                          {f.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Link href="#contact">
                    <Button variant="primary" size="md">
                      {infoCard.primaryCta}
                    </Button>
                  </Link>
                  <Link href="#contact" aria-label="Contact us">
                    <Button variant="icon" size="md" aria-label="Contact us">
                      <Arrow direction="up-right" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {imageCard.type === "image" && (
            <div className="col-span-12 md:col-span-4 h-[400px]">
              <div className="relative h-full rounded-3xl overflow-hidden">
                <Image
                  src={imageCard.image}
                  alt={imageCard.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33.33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
                <h3 className="absolute left-5 top-5 md:left-6 md:top-6 text-white text-xl md:text-2xl font-bold tracking-tight">
                  {imageCard.overlayTitle}
                </h3>
              </div>
            </div>
          )}

          {galleryCard.type === "gallery" && (
            <div className="col-span-12 md:col-span-4 h-[400px]">
              <div className="h-full rounded-3xl bg-white p-6 md:p-8 flex flex-col gap-6">
                <div className="flex -space-x-4 md:-space-x-6 items-center justify-center min-h-[120px]">
                  {galleryCard.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative rounded-2xl overflow-hidden w-24 h-24 md:w-28 md:h-28 flex-shrink-0 border-2 border-white shadow-lg"
                      style={{
                        zIndex: galleryCard.images.length - i,
                        transform: `rotate(${
                          i === 0 ? -6 : i === 1 ? 0 : 6
                        }deg)`,
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                  ))}
                </div>
                <Paragraph className="text-gray-900 text-base md:text-lg mt-2">
                  {galleryCard.description}
                </Paragraph>
              </div>
            </div>
          )}

          {/* Row 3: Stats – centered below containers */}
          {stats && stats.length > 0 && (
            <div className="col-span-12 flex justify-center">
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-24 mt-12 md:mt-16">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center text-black"
                  >
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-sm md:text-base font-normal mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

