/**
 * About page content
 * AlUla Desert Travel Agency
 * Storytelling + SEO optimized
 */

export const aboutContent = {
  pageHero: {
    label: "About Us",
    heading: "Trusted Guides",
    description:
      " We organize guided trips, scenic\n routes, and local experiences with\n comfort and clear schedules.",
  },

  experience: {
    label: "Our Experience",
    heading:
      "Meaningful desert journeys created with love for nature, exploration, and authentic local knowledge.",
    paragraph:
      "From sunrise walks to calm evening camps, we design routes that inspire connection and lasting memories. Every tour is thoughtfully planned to showcase the best of AlUla's natural wonders while ensuring safety and comfort for all our guests.",
    cta: "See Our Gallery",
    cards: [
      {
        type: "info",
        icon: "compass",
        description:
          "Explore AlUla's landscapes with routes designed for all experience levels. Each trip includes local guides, and scenic stops for photos and rest.",
        features: [
          { icon: "car", text: "Pickup Included" },
          { icon: "clock", text: "2-3 Hour Trips" },
          { icon: "sun", text: "Sunset Views" },
        ],
        primaryCta: "Contact Us",
      },
      {
        type: "image",
        image: "/images/about-marwa.png",
        imageAlt: "Person walking on sand dune in desert landscape",
        overlayTitle: "Desert Explore",
      },
      {
        type: "gallery",
        images: [
          { src: "/images/about-marwa-c1.avif", alt: "Desert landscape" },
          { src: "/images/about-marwa-c2.avif", alt: "Desert path" },
          { src: "/images/about-marwa-c3.avif", alt: "Rock formations" },
        ],
        description:
          "Stories and moments from travelers who explored AlUla's desert with us.",
      },
    ],
    stats: [
      { value: "5+", label: "years of experience" },
      { value: "760+", label: "happy travelers" },
      { value: "30+", label: "scenic routes" },
      { value: "4.9", label: "average rating" },
    ],
  },

  guides: {
    label: "Local Experts",
    heading: "Meet Your\nDesert Guides",
    featureLabels: [
      "5+ Years Experience",
      "Certified Desert Tours",
      "Small Group Trips",
      "Safe Routes",
      "Multi Language Support",
      "Local Knowledge",
    ],
    leftCard: {
      title: "Guided by people who know every dune and sunrise",
      paragraph:
        "Each tour is led by experienced local guides who turn every route into a calm, safe, and unforgettable journey. Our team combines deep knowledge of AlUla's landscapes with genuine passion for sharing these special places.",
      image: "/images/guide-image1.png",
      imageAlt: "Local AlUla desert guides",
      socialLinks: {
        instagram: "#",
        website: "#",
        linkedin: "#",
      },
    },
    rightSection: {
      image: "/images/guide-image2.png",
      imageAlt: "Founder and Lead Desert Guide",
      founderLabel: "Founder",
      quote:
        "Every traveler who joins us experiences AlUla through our eyes — calm mornings, glowing dunes, and endless horizons that stay in memory forever.",
      name: "Amir Al-Qatifi",
      title: "Founder & Lead Guide",
      galleryImages: [
        { src: "/images/f1.avif", alt: "Modern earth-toned building in desert landscape" },
        { src: "/images/f2.avif", alt: "Outdoor dining setting in desert dunes" },
        { src: "/images/f3.avif", alt: "Lone tree in desert plain" },
        { src: "/images/f4.avif", alt: "Footprints in sand dunes" },
        { src: "/images/f5.avif", alt: "Majestic rock formations in desert" },
        { src: "/images/f6.avif", alt: "Caravan traveling across sand dunes" },
        { src: "/images/f7.avif", alt: "Person in desert at sunset" },
        { src: "/images/f8.avif", alt: "Slot canyon interior" },
        { src: "/images/f9.avif", alt: "Person walking on sand dune" },
      ],
    },
  },

  mission: {
    label: "Our Mission",
    heading: {
      line1: "Connecting people",
      line2: "with nature",
    },
    paragraph:
      "We believe that experiencing the desert's natural beauty can be transformative. Our goal is to make these experiences accessible, safe, and memorable for everyone who visits AlUla.",
    values: [
      {
        title: "Safety First",
        description: "All our routes are pre-checked and we maintain the highest safety standards.",
      },
      {
        title: "Local Knowledge",
        description: "Our guides are locals who know every hidden spot and the best times to visit.",
      },
      {
        title: "Small Groups",
        description: "We keep groups small to ensure a personal and meaningful experience.",
      },
      {
        title: "Respect for Nature",
        description: "We practice sustainable tourism and respect for the natural environment.",
      },
    ],
  },

  whyChoose: {
    label: "Why Choose Us",
    heading: "Why travelers\nchoose Marwa",
    paragraph:
      "Every journey we organize is built on\ntrust, safety, and unforgettable views.",
    image: "/images/real-movements.png",
    imageAlt: "Woman in flowing dark attire standing in desert landscape",
    features: [
      {
        iconSrc: "/icons/compass.svg",
        title: "Expert Local Guides",
        description: "Our guides are certified professionals with deep knowledge of AlUla's landscapes, ensuring safe and enriching experiences.",
      },
      {
        iconSrc: "/icons/car.svg",
        title: "Comfortable Transportation",
        description: "We provide reliable pickup services and comfortable vehicles to make your journey as smooth as the desert sands.",
      },
      {
        iconSrc: "/icons/sun.svg",
        title: "Best Times & Routes",
        description: "We know the perfect times to visit each location for optimal views, weather, and photo opportunities.",
      },
      {
        iconSrc: "/icons/clock.svg",
        title: "Flexible Scheduling",
        description: "Choose from 2-3 hour trips that fit your schedule, with options for sunrise, sunset, and full-day adventures.",
      },
      {
        iconSrc: "/icons/location.svg",
        title: "Hidden Gems",
        description: "Discover secret spots and lesser-known locations that only locals know about, away from crowded tourist areas.",
      },
      {
        iconSrc: "/icons/star.svg",
        title: "Proven Track Record",
        description: "Join over 760+ happy travelers who have rated us 4.9/5 for our exceptional service and unforgettable experiences.",
      },
    ],
  },
} as const;

export type AboutContent = typeof aboutContent;
