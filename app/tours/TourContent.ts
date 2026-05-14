/**
 * Tours page content
 * AlUla Desert Travel Agency
 * Storytelling + SEO optimized
 */

export const tourContent = {
  pageHero: {
    label: "Our Tours",
    heading: "Sri Lanka Tours",
    description:
      "Discover guided experiences\nacross the island's unique landscapes.",
  },

  ourTours: {
    label: "Our Tours",
    heading: {
      line1: "Explore all",
      line2: "available tours",
    },
    cta: "Book Now",
    tours: [
      { title: "Cultural Discovery", price: 49, perPerson: "per person" },
      { title: "Beach Escape", price: 55, perPerson: "per person" },
      { title: "Hill Country Trail", price: 39, perPerson: "per person" },
      { title: "Wildlife Evening", price: 60, perPerson: "per person" },
    ],
  },

  tourDetails: [
    {
      title: "Cultural Discovery",
      duration: "4–5 hours",
      description: "Explore Sri Lanka's rich heritage through ancient temples, forts, and traditional villages.",
    },
    {
      title: "Beach Escape",
      duration: "5–6 hours",
      description: "Experience Sri Lanka's golden beaches and turquoise waters with stunning sunset views.",
    },
    {
      title: "Hill Country Trail",
      duration: "5 hours",
      description: "Discover tea country on foot through emerald valleys and misty hills.",
    },
    {
      title: "Wildlife Evening",
      duration: "3–4 hours",
      description: "An evening safari through premier wildlife sanctuaries to spot elephants and exotic species.",
    },
  ],

  filters: {
    label: "Filter Tours",
    categories: [
      { id: "all", label: "All Tours" },
      { id: "short", label: "Short Tours (2-4 hours)" },
      { id: "full", label: "Full Day Tours" },
      { id: "sunrise", label: "Sunrise Tours" },
      { id: "sunset", label: "Sunset Tours" },
    ],
    sortBy: [
      { id: "price-low", label: "Price: Low to High" },
      { id: "price-high", label: "Price: High to Low" },
      { id: "duration", label: "Duration" },
      { id: "popular", label: "Most Popular" },
    ],
  },

  features: {
    label: "What's Included",
    heading: "Every tour includes",
    items: [
      {
        icon: "guide",
        title: "Expert Local Guides",
        description: "Certified guides with deep knowledge of Sri Lanka's landscapes and history.",
      },
      {
        icon: "transport",
        title: "Transport Included",
        description: "Comfortable pickup and drop-off from your location on the island.",
      },
      {
        icon: "safety",
        title: "Safety First",
        description: "All routes are pre-checked and safe, with emergency support available.",
      },
      {
        icon: "photo",
        title: "Photo Opportunities",
        description: "Multiple stops at scenic spots perfect for capturing memories.",
      },
    ],
  },

  tourExperience: {
    label: "Experiences",
    heading: "Choose from cultural tours, beach escapes, hill country hikes,\nor wildlife safaris — all starting from convenient meeting points.",
    description: "Each tour is carefully crafted to provide you with an unforgettable journey through Sri Lanka's stunning landscapes and rich cultural heritage.",
    experiences: [
      {
        title: "Desert Exploration",
        image: "/images/experience-image-1.png",
        alt: "Desert dunes landscape",
      },
      {
        title: "Scenic Routes",
        image: "/images/experience-image-2.png",
        alt: "Desert landscape with path",
      },
      {
        title: "Natural Wonders",
        image: "/images/experience-image-3.png",
        alt: "Rock formations landscape",
      },
    ],
    cta: "Learn More",
    tours: [
      {
        image: {
          src: "/images/tourpage/p-tour-image-1.jpeg",
          alt: "Cultural discovery tour in Sri Lanka with temples and heritage sites",
        },
        card: {
          number: "01",
          title: "Cultural Discovery",
          description: [
            "Explore Sri Lanka's rich heritage through ancient temples, forts, and traditional villages.",
            "This guided tour brings you face-to-face with UNESCO sites, local crafts, and the stories that have shaped the island for centuries.",
          ],
          duration: "4–5 hours",
          meetingPoint: "Colombo City Centre",
          groupSize: "Up to 6 people",
          tourType: "Walking / Transport",
          level: "Moderate",
          schedule: "Morning",
          languages: "English / Sinhala",
          price: 49,
          perPerson: "per person",
        },
        tourSchedule: [
          { time: "08:00", activity: "Pickup from Colombo or your hotel" },
          { time: "09:00", activity: "Visit ancient temple complex and heritage site" },
          { time: "10:30", activity: "Guided walk through historic fort and old town" },
          { time: "12:00", activity: "Break with local tea and traditional sweets" },
          { time: "13:00", activity: "Artisan village and craft demonstrations" },
          { time: "14:30", activity: "Return to Colombo" },
        ],
      },
      {
        image: {
          src: "/images/tourpage/p-tour-image-2.jpeg",
          alt: "Beach escape along Sri Lanka's golden coastline",
        },
        card: {
          number: "02",
          title: "Beach Escape",
          description: [
            "Experience the magic of Sri Lanka's golden beaches and turquoise waters.",
            "Perfect for relaxation, swimming, and coastal photography with stunning sunset views.",
          ],
          duration: "5–6 hours",
          meetingPoint: "Galle Fort Entrance",
          groupSize: "Up to 8 people",
          tourType: "Transport / Beach",
          level: "Easy",
          schedule: "Full Day",
          languages: "English / Sinhala",
          price: 55,
          perPerson: "per person",
        },
      },
      {
        image: {
          src: "/images/tourpage/p-tour-image-3.jpeg",
          alt: "Hill country trail through tea plantations and green valleys",
        },
        card: {
          number: "03",
          title: "Hill Country Trail",
          description: [
            "Discover Sri Lanka's lush tea country on foot with experienced guides.",
            "Walk through emerald valleys, tea estates, and misty hills with breathtaking viewpoints.",
          ],
          duration: "5 hours",
          meetingPoint: "Nuwara Eliya Town",
          groupSize: "Up to 6 people",
          tourType: "Walking",
          level: "Moderate",
          schedule: "Morning",
          languages: "English / Sinhala",
          price: 39,
          perPerson: "per person",
        },
      },
      {
        image: {
          src: "/images/tourpage/p-tour-image-4.jpeg",
          alt: "Wildlife evening safari in Sri Lankan national park",
        },
        card: {
          number: "04",
          title: "Wildlife Evening",
          description: [
            "An evening safari through one of Sri Lanka's premier wildlife sanctuaries.",
            "Spot elephants, leopards, and exotic birds as the golden hour paints the landscape.",
          ],
          duration: "3–4 hours",
          meetingPoint: "Park Entrance Gate",
          groupSize: "Up to 6 people",
          tourType: "Jeep Safari",
          level: "Easy",
          schedule: "Evening",
          languages: "English / Sinhala",
          price: 60,
          perPerson: "per person",
        },
      },
    ],
  },

  cta: {
    heading: "Ready to start your Sri Lanka adventure?",
    paragraph: "Book your tour today and experience the natural beauty of the island.",
    button: "View All Tours",
  },
} as const;

export type TourContent = typeof tourContent;

/** Convert tour title to URL slug (e.g. "Desert Journey" -> "desert-journey") */
export function getTourSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
}

/** Full tour item with image and card (for detail pages) */
export type TourDetailItem = (typeof tourContent.tourExperience.tours)[number];

/** Get a single tour by slug, or undefined if not found */
export function getTourBySlug(slug: string): TourDetailItem | undefined {
  const normalized = slug.toLowerCase().trim();
  return tourContent.tourExperience.tours.find(
    (t) => getTourSlug(t.card.title) === normalized
  );
}

/** All slugs for tours that have detail pages (for generateStaticParams) */
export function getAllTourSlugs(): string[] {
  return tourContent.tourExperience.tours.map((t) => getTourSlug(t.card.title));
}
