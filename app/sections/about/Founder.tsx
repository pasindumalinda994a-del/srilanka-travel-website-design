import Image from "next/image";
import { H2Secondary, Paragraph } from "@/components/website";
import type { AboutContent } from "@/app/about/AboutContent";

type FounderProps = {
  content: AboutContent["guides"]["rightSection"];
};

export default function Founder({ content }: FounderProps) {
  const { image, imageAlt, quote, name, title, galleryImages } = content;

  return (
    <section className="w-full pb-28 md:pb-30 lg:pb-32">
      {/* Container: Max width 1440px, centered, 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px] px-[8px]">
        {/* Grid: 12 columns with consistent 12px gap */}
        <div className="grid grid-cols-12 gap-3">
          {/* Top Section: Centered Quote and Attribution */}
          <div className="col-span-12 flex flex-col items-center gap-8 md:gap-12 mb-16 md:mb-20">
            {/* Quote */}
            <blockquote className="max-w-4xl">
              <H2Secondary textAlign="center" className="text-gray-900">
                "{quote}"
              </H2Secondary>
            </blockquote>

            {/* Attribution with Profile Picture */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                {/* Circular Profile Picture */}
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                {/* Name and Title */}
                <div className="flex flex-col">
                  <Paragraph className="text-base md:text-lg font-semibold text-gray-900">
                    {name}
                  </Paragraph>
                  <Paragraph className="text-sm md:text-base text-gray-600 font-normal">
                    {title}
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: 9-Column Grid with 9 Images */}
          <div className="col-span-12">
            <style>{`
              .founder-gallery-grid {
                grid-template-columns: repeat(3, minmax(0, 1fr));
              }
              @media (min-width: 768px) {
                .founder-gallery-grid {
                  grid-template-columns: repeat(6, minmax(0, 1fr));
                }
              }
              @media (min-width: 1024px) {
                .founder-gallery-grid {
                  grid-template-columns: repeat(9, minmax(0, 1fr));
                }
              }
            `}</style>
            <div className="founder-gallery-grid grid gap-3 mb-8 md:mb-12">
              {galleryImages?.map((galleryImage, index) => {
                const isMiddleImage = index === 4; // 5th image (middle of 9)
                return (
                  <div
                    key={index}
                    className={`relative rounded-3xl overflow-hidden aspect-square ${
                      isMiddleImage ? "-mt-4 md:-mt-6" : ""
                    }`}
                  >
                    <Image
                      src={galleryImage.src}
                      alt={galleryImage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33.33vw, (max-width: 1024px) 16.66vw, 11.11vw"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

