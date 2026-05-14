import Image from "next/image";
import type { GalleryContent } from "@/app/gallery/GalleryContent";

type GalleryProps = {
  content: GalleryContent["gallery"];
};

export default function Gallery({ content }: GalleryProps) {
  const gallery = content;
  const images = gallery.images || [];

  return (
    <section className="w-full pb-28 md:pb-30 lg:pb-32">
      {/* Container: Max width 1440px, centered, 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px] px-[8px]">
        {/* Grid: 12 columns with consistent 12px gap */}
        <div className="grid grid-cols-12 gap-3">
          {images.map((image, index) => {
            // Alternate pattern: 8-col, 4-col, 4-col, 8-col, etc.
            // Every 3rd image (0, 3, 6, 9...) is large (8 cols)
            const isLarge = index % 3 === 0;

            return (
              <div
                key={index}
                className={`col-span-12 ${
                  isLarge ? "md:col-span-8" : "md:col-span-4"
                } relative overflow-hidden rounded-3xl h-[500px]`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes={
                    isLarge
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

