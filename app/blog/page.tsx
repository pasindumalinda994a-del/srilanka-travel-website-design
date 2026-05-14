import { Header, PageHero, Footer, blogSections } from "@/app/sections";
import { homeContent, blogContent } from "@/app/content";

export default function BlogPage() {
  const content = blogContent.blog;

  return (
    <>
      <Header content={homeContent.header} />
      <PageHero
        label={blogContent.pageHero.label}
        heading={blogContent.pageHero.heading}
        description={blogContent.pageHero.description}
        showImage={false}
      />
      <blogSections.TravelStories content={content} />
      <blogSections.Startnow content={homeContent.startnow} />
      <Footer content={homeContent.footer} />
    </>
  );
}
