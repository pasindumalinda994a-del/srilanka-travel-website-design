import { Header, PageHero, Footer, gallerySections } from "@/app/sections";
import { homeContent, galleryContent } from "@/app/content";

export default function GalleryPage() {
  return (
    <>
      <Header content={homeContent.header} />
      <PageHero 
        label={galleryContent.pageHero.label}
        heading={galleryContent.pageHero.heading}
        description={galleryContent.pageHero.description}
        showImage={false}
      />
      <gallerySections.Gallery content={galleryContent.gallery} />
      <Footer content={homeContent.footer} />
    </>
  );
}
