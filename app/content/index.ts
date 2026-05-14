/**
 * Content barrel – re-exports page content and types.
 * Use: import { homeContent, aboutContent } from "@/app/content";
 */

export { homeContent } from "@/app/HomeContent";
export type { HomeContent } from "@/app/HomeContent";

export { aboutContent } from "@/app/about/AboutContent";
export type { AboutContent } from "@/app/about/AboutContent";

export {
  blogContent,
  getBlogBySlug,
  getAllBlogSlugs,
} from "@/app/blog/BlogContent";
export type { BlogContent, BlogPostItem } from "@/app/blog/BlogContent";

export { contactContent } from "@/app/contact/ContactContent";
export type { ContactContent } from "@/app/contact/ContactContent";

export { galleryContent } from "@/app/gallery/GalleryContent";
export type { GalleryContent } from "@/app/gallery/GalleryContent";

export {
  tourContent,
  getTourSlug,
  getTourBySlug,
  getAllTourSlugs,
} from "@/app/tours/TourContent";
export type { TourContent, TourDetailItem } from "@/app/tours/TourContent";
