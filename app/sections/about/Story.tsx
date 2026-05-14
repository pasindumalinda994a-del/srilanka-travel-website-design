import Image from "next/image";
import { Label, H2Secondary, Paragraph } from "@/components/website";

/**
 * Column gap between grid cells (Tailwind gap-3 = 12px).
 * Used consistently across the 12-column layout.
 */
const GRID_GAP = "gap-3";

type StoryHighlight = {
  readonly title: string;
  readonly description: string;
};

type StoryProps = {
  readonly label: string;
  readonly heading: string;
  readonly paragraph: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly highlights?: readonly StoryHighlight[];
};

/**
 * Story section
 * - Max content width: 1440px
 * - Centered container with 8px horizontal padding
 * - Uses a 12-column CSS Grid with a consistent column gap
 */
export default function Story({
  label,
  heading,
  paragraph,
  image,
  imageAlt,
  highlights = [],
}: StoryProps) {
  const paragraphLines = paragraph.split("\n");

  return (
    <section className="w-full pb-28 md:pb-30 lg:pb-32 bg-white">
      {/* Container: max width 1440px, centered, 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px] px-[8px]">
        {/* Grid: 12 columns, consistent column gap (12px via gap-3) */}
        <div className={`grid grid-cols-12 ${GRID_GAP} items-stretch`}>
          {/* Left: Image container (6 columns on desktop) */}
          <div className="col-span-12 md:col-span-6">
            <div className="relative w-full h-[260px] md:h-[360px] lg:h-[420px] rounded-[32px] overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Label, heading, main story copy + mission/vision (6 columns on desktop) */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-8 md:pl-6 lg:pl-10">
            <div className="self-start">
              <Label>{label}</Label>
            </div>
            <H2Secondary className="font-bold max-w-3xl text-gray-900">
              {heading}
            </H2Secondary>
            <Paragraph className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
              {paragraphLines.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < paragraphLines.length - 1 && <br />}
                </span>
              ))}
            </Paragraph>

            {/* Optional highlight cards (e.g. Mission & Vision), side-by-side on desktop */}
            {highlights.length > 0 && (
              <div className={`grid grid-cols-12 ${GRID_GAP} mt-6`}>
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="col-span-12 md:col-span-6"
                  >
                    <div className="h-full rounded-3xl bg-gray-50 p-5 md:p-6 flex flex-col gap-2">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <Paragraph className="text-gray-600 text-sm md:text-base">
                        {item.description}
                      </Paragraph>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

