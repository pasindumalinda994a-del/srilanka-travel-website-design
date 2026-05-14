import { Header, PageHero, Footer, aboutSections } from "@/app/sections";
import { homeContent, aboutContent } from "@/app/content";

export default function AboutPage() {
  return (
    <>
      <Header content={homeContent.header} />
      <PageHero 
        label={aboutContent.pageHero.label}
        heading={aboutContent.pageHero.heading}
        description={aboutContent.pageHero.description}
        imageSrc="/images/about-hero.avif"
        imageAlt="About hero image"
      />
      <aboutSections.Founder content={aboutContent.guides.rightSection} />

      <aboutSections.AboutAbout content={aboutContent.experience} />

      <aboutSections.WhyChoose content={aboutContent.whyChoose} />

      <aboutSections.Story
        label="The Story"
        heading="The Story Behind Marwa"
        paragraph="A glimpse into how it all began — from quiet trails in AlUla to journeys shared with travelers from around the world."
        image="/images/story.png"
        imageAlt="Group of travelers sitting together and enjoying drinks outdoors"
        highlights={[
          {
            title: "Our Mission:",
            description:
              "To make exploring the desert simple, accessible, and full of real local stories — not just sightseeing.",
          },
          {
            title: "Our Vision:",
            description:
              "To connect people with nature through responsible travel and authentic desert adventures.",
          },
        ]}
      />
      
    </>
  );
}
