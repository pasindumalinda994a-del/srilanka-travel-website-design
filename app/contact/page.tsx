import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { Header, PageHero, Footer } from "@/app/sections";
import { homeContent, contactContent, tourContent, getTourSlug } from "@/app/content";
import BookingForm from "@/app/contact/BookingForm";

export default function ContactPage() {
  const tourOptions = tourContent.tourExperience.tours.map((t) => ({
    id: getTourSlug(t.card.title),
    title: t.card.title,
  }));

  return (
    <>
      <Header content={homeContent.header} />
      <PageHero
        label={contactContent.pageHero.label}
        heading={contactContent.pageHero.heading}
        description={contactContent.pageHero.description}
        showImage={false}
      />

      <section className="w-full pb-28 md:pb-30 lg:pb-32">
        <div className="mx-auto max-w-[1440px] px-2">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <BookingForm
              className="col-span-12 lg:col-span-8"
              tourOptions={tourOptions}
              contactEmail={contactContent.info.email}
            />

            <div className="col-span-12 lg:col-span-4">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-[32px]">
                <Image
                  src="/images/ready-image1.png"
                  alt="Guests enjoying the desert tour"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  priority={false}
                />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {contactContent.contactCards.map((card) => {
                const Icon = iconMap[card.icon] ?? PhoneIcon;
                return (
                  <div
                    key={card.title}
                    className="rounded-[28px] border border-gray-100 bg-white px-8 py-10 text-center shadow-[0_25px_45px_rgba(15,23,42,0.06)]"
                  >
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
                      <Icon className="h-5 w-5 text-gray-900" />
                    </div>
                    <h4 className="text-base font-semibold text-gray-900">{card.title}</h4>
                    <div className="mt-3 space-y-1 text-sm text-gray-700">
                      {card.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer content={homeContent.footer} />
    </>
  );
}

type IconProps = SVGProps<SVGSVGElement>;

const iconMap: Record<string, ComponentType<IconProps>> = {
  phone: PhoneIcon,
  clock: ClockIcon,
  mail: MailIcon,
};

function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" fill="none" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.8 3h2.4a1 1 0 0 1 1 .88l.4 3a1 1 0 0 1-.6 1.05l-1.5.6a12 12 0 0 0 6.47 6.47l.6-1.5a1 1 0 0 1 1.05-.6l3 .4a1 1 0 0 1 .88 1v2.4a1 1 0 0 1-1.06 1 17 17 0 0 1-15-15A1 1 0 0 1 6.8 3Z"
      />
    </svg>
  );
}

function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" fill="none" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l2.5 1.5" />
    </svg>
  );
}

function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" fill="none" {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}
