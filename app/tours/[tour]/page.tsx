import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header, PageHero, Startnow, Footer, Button, Arrow } from "@/app/sections";
import { FAQCard } from "@/components/website";
import {
  homeContent,
  tourContent,
  getTourSlug,
  getTourBySlug,
  getAllTourSlugs,
} from "@/app/content";

type PageProps = {
  params: Promise<{ tour: string }>;
};

export async function generateStaticParams() {
  return getAllTourSlugs().map((tour) => ({ tour }));
}

export default async function TourPage({ params }: PageProps) {
  const { tour: slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const { image, card } = tour;

  const moreTours = tourContent.tourExperience.tours
    .filter((t) => t.card.title !== card.title)
    .slice(0, 2);

  return (
    <>
      <Header content={homeContent.header} />
      <PageHero
        heading={card.title}
        showImage={false}
      />

      {/* Tour detail section */}
      <section className="w-full pb-28 md:pb-30 lg:pb-32">
        <div className="mx-auto max-w-[1440px] px-2">
          <div className="grid grid-cols-12 gap-3 md:gap-6">
            <div className="col-span-12 lg:col-span-8 space-y-8 md:space-y-10">
              <div className="relative rounded-3xl overflow-hidden h-[320px] md:h-[380px] lg:h-[475px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Overview block */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Overview
                </h3>
                <div className="space-y-4 text-base text-gray-700 leading-relaxed">
                  {card.description.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Tour Schedule block (when available) */}
              {"tourSchedule" in tour && tour.tourSchedule && tour.tourSchedule.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Tour Schedule
                  </h3>
                  <ul className="space-y-4">
                    {tour.tourSchedule.map((item, i) => (
                      <li key={i} className="flex gap-4 text-base">
                        <span className="font-mono font-medium text-gray-900 shrink-0 w-14">
                          {item.time}
                        </span>
                        <span className="text-gray-700">— {item.activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Why Travelers Love It */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 md:mb-8">
                  Why Travelers Love It
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-14 h-14 mb-4 flex items-center justify-center text-black [&>svg]:w-12 [&>svg]:h-12">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                        <circle cx="12" cy="9.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Local Experts</h4>
                    <p className="text-sm md:text-base text-gray-900 leading-relaxed">
                      All tours guided by certified local experts who share stories and hidden desert gems.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-14 h-14 mb-4 flex items-center justify-center text-black [&>svg]:w-12 [&>svg]:h-12">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Flexible Timings</h4>
                    <p className="text-sm md:text-base text-gray-900 leading-relaxed">
                      Choose your preferred schedule — morning, afternoon, or sunset adventures.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-14 h-14 mb-4 flex items-center justify-center text-black [&>svg]:w-12 [&>svg]:h-12">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Scenic Spots</h4>
                    <p className="text-sm md:text-base text-gray-900 leading-relaxed">
                      Capture the most iconic desert spots and panoramic viewpoints along the route — calm and timeless.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Info</h3>
                <div className="space-y-4 text-base text-gray-900 leading-relaxed">
                  <p>Please note: tours may be rescheduled in case of weather changes or unexpected conditions.</p>
                  <p>Comfortable clothing, closed shoes, and sun protection are recommended.</p>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">FAQ</h3>
                <div className="space-y-3">
                  {homeContent.faq.items.map((item, index) => (
                    <FAQCard key={index} question={item.question} answer={item.answer} />
                  ))}
                </div>
              </div>

              {/* More Experiences */}
              {moreTours.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 md:mb-8">More Experiences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {moreTours.map((t) => {
                      const tourSlug = getTourSlug(t.card.title);
                      return (
                        <Link
                          key={tourSlug}
                          href={`/tours/${tourSlug}`}
                          className="group relative rounded-3xl overflow-hidden aspect-[4/3] block"
                        >
                          <Image
                            src={t.image.src}
                            alt={t.image.alt}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute top-4 right-4 z-10">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                              <Arrow direction="up-right" className="text-black" />
                            </div>
                          </div>
                          <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                            <h4 className="font-bold text-xl md:text-2xl mb-1">{t.card.title}</h4>
                            <p className="opacity-90">
                              <span className="text-lg font-semibold">${t.card.price}</span>
                              <span className="text-sm"> / {t.card.perPerson ?? "per person"}</span>
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-gray-50 rounded-3xl p-6 md:p-8 h-[475px] flex flex-col sticky top-12">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    ${card.price}
                  </span>
                  <span className="text-base text-gray-700 font-normal">
                    / {card.perPerson ?? "per person"}
                  </span>
                </div>

                <ul className="space-y-3 text-base text-gray-700 mb-6">
                  <li className="flex gap-2">
                    <span className="text-gray-500 shrink-0">Duration:</span>
                    <span className="font-medium">{card.duration}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 shrink-0">Meeting point:</span>
                    <span className="font-medium">{card.meetingPoint}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500 shrink-0">Group size:</span>
                    <span className="font-medium">{card.groupSize}</span>
                  </li>
                </ul>
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-base text-gray-700">
                    <div>
                      <p className="text-gray-500 text-sm mb-0.5">Tour type</p>
                      <p className="font-medium text-gray-900">{card.tourType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-0.5">Level</p>
                      <p className="font-medium text-gray-900">{card.level}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-0.5">Schedule</p>
                      <p className="font-medium text-gray-900">{card.schedule}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-0.5">Languages</p>
                      <p className="font-medium text-gray-900">{card.languages}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-200 flex items-center gap-3 md:gap-4">
                  <Link href="/contact">
                    <Button variant="primary" size="md">
                      {tourContent.ourTours.cta}
                    </Button>
                  </Link>
                  <Link href="/contact" aria-label={tourContent.ourTours.cta}>
                    <Button variant="icon" size="md" aria-label={tourContent.ourTours.cta}>
                      <Arrow direction="up-right" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Startnow content={homeContent.startnow} />
      <Footer content={homeContent.footer} />
    </>
  );
}
