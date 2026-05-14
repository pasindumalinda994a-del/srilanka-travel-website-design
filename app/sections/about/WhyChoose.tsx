import Image from "next/image";
import { Label, H2Secondary, Paragraph, Button, Arrow } from "@/components/website";

/**
 * Column gap between grid cells (Tailwind gap-3 = 12px).
 * Used consistently across the 12-column layout.
 */
const GRID_GAP = "gap-3";

type WhyChooseFeature = {
  readonly icon?: string;
  readonly iconSrc?: string;
  readonly title: string;
  readonly description: string;
};

type WhyChooseContent = {
  readonly label: string;
  readonly heading: string;
  readonly paragraph: string;
  readonly features: readonly WhyChooseFeature[];
  readonly image?: string;
  readonly imageAlt?: string;
};

const COMMUNITY_PROFILE_IMAGES = [
  "/images/commiunity1.png",
  "/images/commiunity2.png",
  "/images/commiunity3.png",
  "/images/commiunity4.png",
  "/images/commiunity5.jpg",
  "/images/real-movements.png",
] as const;

type WhyChooseProps = {
  content: WhyChooseContent;
};

export default function WhyChoose({ content }: WhyChooseProps) {
  const { label, heading, paragraph, features, image, imageAlt } = content;
  const paragraphLines = paragraph.split("\n");

  return (
    <section className="w-full pb-28 md:pb-30 lg:pb-32 bg-gray-50/60">
      {/* Container: max width 1440px, centered, 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px] px-[8px]">
        {/* Grid: 12 columns, consistent column gap (12px via gap-3) */}
        <div className={`grid grid-cols-12 ${GRID_GAP}`}>
          {/* Row 1: Label + Heading + Supporting Paragraph (Testimonials-style layout) */}
          <div className="col-span-12 flex flex-col gap-8 md:gap-12">
            <div className="self-start">
              <Label>{label}</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end">
              <div className="md:col-span-6 lg:col-span-7">
                <H2Secondary className="font-bold max-w-4xl text-gray-900">
                  {heading}
                </H2Secondary>
              </div>
              <div className="md:col-span-6 lg:col-span-5 flex justify-end">
                <Paragraph className="text-right text-gray-600">
                  {paragraphLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < paragraphLines.length - 1 && <br />}
                    </span>
                  ))}
                </Paragraph>
              </div>
            </div>
          </div>

          {/* Row 2: Three main 4-column containers (12-column grid) */}
          <div className="col-span-12 mt-8 md:mt-12">
            <div className={`grid grid-cols-12 ${GRID_GAP}`}>
              {/* Left: Large feature card with local expertise image */}
              <div className="col-span-12 md:col-span-4">
                <div className="h-full rounded-[32px] bg-white p-6 md:p-8 flex flex-col justify-between gap-6">
                  <div className="relative h-32 md:h-36 rounded-3xl overflow-hidden">
                    <Image
                      src="/images/local-expertise.png"
                      alt="Local expertise global network"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33.33vw"
                    />
                  </div>
                  {features[0] && (
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                        {features[0].title}
                      </h3>
                      <Paragraph className="mt-2 text-gray-600 text-sm md:text-base">
                        {features[0].description}
                      </Paragraph>
                    </div>
                  )}
                </div>
              </div>

              {/* Middle: Two stacked cards */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
                {/* Top card */}
                <div className="rounded-[32px] bg-white p-6 md:p-7 flex flex-col justify-center gap-3 h-full min-h-[140px]">
                  {features[1] && (
                    <>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                        {features[1].title}
                      </h3>
                      <Paragraph className="text-gray-600 text-sm md:text-base">
                        {features[1].description}
                      </Paragraph>
                    </>
                  )}
                </div>

                {/* Bottom card */}
                <div className="rounded-[32px] bg-white p-6 md:p-7 flex flex-col justify-between gap-4 h-full min-h-[160px]">
                  {features[2] && (
                    <>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                          {features[2].title}
                        </h3>
                      </div>
                      <div className="flex items-center -space-x-3">
                        {COMMUNITY_PROFILE_IMAGES.map((src, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                          >
                            <Image
                              src={src}
                              alt="Community member"
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <Paragraph className="text-gray-600 text-sm md:text-base">
                        {features[2].description}
                      </Paragraph>
                    </>
                  )}
                </div>
              </div>

              {/* Right: Tall image card with CTA */}
              <div className="col-span-12 md:col-span-4">
                <div className="relative h-72 md:h-full min-h-[260px] rounded-[32px] overflow-hidden">
                  <Image
                    src={image || "/images/experience-image-3.png"}
                    alt={imageAlt || "Traveler in AlUla desert"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/75 via-black/40 to-transparent flex items-end justify-between gap-4">
                    <Paragraph className="text-white text-base md:text-lg font-medium max-w-xs">
                      See real moments from our trips.
                    </Paragraph>
                    <Button
                      variant="icon"
                      size="md"
                      aria-label="View gallery"
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      <Arrow direction="up-right" className="text-black" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

