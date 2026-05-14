import { Header, Footer, homeSections } from "@/app/sections";
import { homeContent } from "@/app/content";

export default function Home() {
  return (
    <>
      <Header content={homeContent.header} />
      <homeSections.Hero content={homeContent.hero} />
      <homeSections.Explore content={homeContent.explore} />
      <homeSections.OurTours content={homeContent.ourTours} />
      <homeSections.Experience content={homeContent.experience} />
      <homeSections.VideoTour content={homeContent.videoTour} />
      <homeSections.Ready content={homeContent.ready} />
      <homeSections.Testimonials content={homeContent.testimonials} />
      <homeSections.Guides content={homeContent.guides} />
      <homeSections.Blog content={homeContent.blog} />
      <homeSections.FAQ content={homeContent.faq} />
      <homeSections.Startnow content={homeContent.startnow} />
      <Footer content={homeContent.footer} />
    </>
  );
}
