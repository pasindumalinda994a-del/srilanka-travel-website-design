/**
 * Public website sections – barrel export.
 * Use: import { Header, Hero, Footer } from "@/app/sections";
 */

// Layout sections
export { default as Header } from "./Header";
export { default as Footer } from "./Footer";
export { default as PageHero } from "./PageHero";

// Grouped page section namespaces
import * as homeSections from "./home";
import * as aboutSections from "./about";
import * as gallerySections from "./gallery";
import * as blogSections from "./blog";
import * as tourSections from "./tour";

export { homeSections, aboutSections, gallerySections, blogSections, tourSections };

// Individual section exports kept for backwards compatibility
export { default as Hero } from "./home/Hero";
export { default as Explore } from "./home/Explore";
export { default as Experience } from "./home/Experience";
export { default as OurTours } from "./home/OurTours";
export { default as VideoTour } from "./home/VideoTour";
export { default as Guides } from "./home/Guides";
export { default as Testimonials } from "./home/Testimonials";
export { default as Blog } from "./home/Blog";
export { default as FAQ } from "./home/FAQ";
export { default as Startnow } from "./home/Startnow";
export { default as Ready } from "./home/Ready";

export { default as AboutAbout } from "./about/AboutAbout";
export { default as Founder } from "./about/Founder";
export { default as WhyChoose } from "./about/WhyChoose";
export { default as Story } from "./about/Story";
export { default as TravelStories } from "./blog/TravelStories";
export { default as Gallery } from "./gallery/Gallery";
export { default as TourExperience } from "./tour/TourExperience";

// Section primitives (buttons, cards, typography) – re-exported from shared website components
export * from "@/components/website";
