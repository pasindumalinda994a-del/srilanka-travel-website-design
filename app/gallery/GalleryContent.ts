/**
 * Gallery page content
 * AlUla Desert Travel Agency
 * Storytelling + SEO optimized
 */

export const galleryContent = {
  pageHero: {
    label: "Gallery",
    heading: {
      line1: "Photo Gallery",
      
    },
    description:
      "Captured moments from our \ndesert trips and scenic routes.",
  },

  gallery: {
    label: "Gallery",
    heading: {
      line1: "Moments captured",
      line2: "from our tours",
    },
    images: [
      {
        src: "/images/hero-image.png",
        alt: "Desert landscape at sunset",
      },
      {
        src: "/images/experience-image-1.png",
        alt: "Desert experience",
      },
      {
        src: "/images/experience-image-2.png",
        alt: "Desert exploration",
      },
      {
        src: "/images/experience-image-3.png",
        alt: "Desert moment",
      },
      {
        src: "/images/ready-image1.png",
        alt: "Desert adventure",
      },
      {
        src: "/images/tours-image1.png",
        alt: "Desert tour",
      },
      {
        src: "/images/tours-image-2.png",
        alt: "Desert journey",
      },
      {
        src: "/images/tours-image-3.png",
        alt: "Desert hike",
      },
      {
        src: "/images/tours-image-4.png",
        alt: "Desert sunset",
      },
      {
        src: "/images/explore-image-1.png",
        alt: "Desert exploration",
      },
      {
        src: "/images/explore-image-2.png",
        alt: "Desert landscape",
      },
      {
        src: "/images/testimonial-image.png",
        alt: "Desert experience",
      },
      {
        src: "/images/blog-image-1.png",
        alt: "Desert travel",
      },
      {
        src: "/images/faq-image.png",
        alt: "Desert FAQ",
      },
    ],
  },
} as const;

export type GalleryContent = typeof galleryContent;
