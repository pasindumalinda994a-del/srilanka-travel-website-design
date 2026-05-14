import Image from "next/image";
import { H1Secondary, Paragraph, Label } from "@/components/website";

type PageHeroProps = {
  label?: string;
  heading: string | { line1: string; line2?: string };
  description?: string;
  className?: string;
  showImage?: boolean;
  imageSrc?: string;
  imageAlt?: string;
};

export default function PageHero({ label, heading, description, className = "", showImage = true, imageSrc = "/images/hero-image.png", imageAlt = "Page hero image" }: PageHeroProps) {
  const headingLines = typeof heading === "string" 
    ? { line1: heading, line2: undefined }
    : heading;
  
  const descriptionLines = description ? description.split("\n") : [];

  return (
    <section className={`w-full py-12 md:py-16 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-[1440px] px-2">
        <div className="grid grid-cols-12 gap-3 md:gap-6">
          <div className="col-span-12 md:col-span-6 flex flex-col gap-4 md:gap-6">
            {label && (
              <Label className="self-start">
                {label}
              </Label>
            )}
            <H1Secondary className="font-bold">
              {headingLines.line1}
              {headingLines.line2 && (
                <>
                  <br />
                  {headingLines.line2}
                </>
              )}
            </H1Secondary>
          </div>
          {description && (
            <div className="col-span-12 md:col-span-6 flex items-end justify-end">
              <Paragraph className="text-lg md:text-xl">
                {descriptionLines.map((line, i) => (
                  <span key={i}>{line}{i < descriptionLines.length - 1 && <br />}</span>
                ))}
              </Paragraph>
            </div>
          )}
        </div>
        {showImage && (
          <div className="grid grid-cols-12 gap-3 md:gap-6 mt-6 md:mt-8">
            <div className="col-span-12 relative rounded-3xl overflow-hidden" style={{ height: "500px" }}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
