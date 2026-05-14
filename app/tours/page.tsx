import { Header, PageHero, Startnow, Footer, tourSections } from "@/app/sections";
import { homeContent, tourContent } from "@/app/content";

export default function ToursPage() {
  const tours = tourContent.tourExperience.tours;

  return (
    <>
      <Header content={homeContent.header} />
      <PageHero
        label={tourContent.pageHero.label}
        heading={tourContent.pageHero.heading}
        description={tourContent.pageHero.description}
        imageSrc="/images/tourpage/p-tour-hero.jpeg"
        imageAlt="Terraced green hills and lush plantation landscape"
      />
      <tourSections.TourExperience
        label={tourContent.tourExperience.label}
        heading={tourContent.tourExperience.heading}
        description={tourContent.tourExperience.description}
        experiences={tourContent.tourExperience.experiences}
        cta={tourContent.tourExperience.cta}
        tours={tours}
      />
      <Startnow content={homeContent.startnow} />
      <Footer content={homeContent.footer} />
    </>
  );
}
