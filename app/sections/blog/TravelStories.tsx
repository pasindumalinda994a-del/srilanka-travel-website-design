import Image from "next/image";
import Link from "next/link";

export type TravelStoriesItem = {
  slug: string;
  title: string;
  date: string;
  image: string;
};

type TravelStoriesProps = {
  content: {
    label?: string;
    heading?: { line1: string; line2?: string };
    cta?: string;
    items: readonly TravelStoriesItem[];
  };
};

export default function TravelStories({ content }: TravelStoriesProps) {
  const travelStories = content;
  return (
    <section className="w-full pb-28 md:pb-30 lg:pb-32">
      <div className="mx-auto max-w-[1440px] px-[8px]">
        <div className="grid grid-cols-12 gap-3">
          {travelStories.items.map((item, index) => (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className={`col-span-12 ${
                index !== 0 ? "md:col-span-4" : ""
              } relative rounded-3xl overflow-hidden block group`}
              style={{ height: "500px" }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 z-10 text-white">
                <p className="text-sm opacity-90 mb-2">{item.date}</p>
                <h3 className="font-500 text-3xl">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

