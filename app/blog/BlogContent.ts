/**
 * Blog page content
 * AlUla Desert Travel Agency
 * Storytelling + SEO optimized
 */

export const blogContent = {
  pageHero: {
    label: "Blog",
    heading: {
      line1: "Marwa Journal",
      
    },
    description:
      "Your guide to exploring AlUla — \nfrom the best seasons and routes.",
  },

  blog: {
    label: "Travel Stories",
    heading: {
      line1: "Latest articles",
      line2: "and travel guides",
    },
    cta: "View All Articles",
    items: [
      {
        slug: "best-time-to-visit-alula-desert",
        date: "Dec 6, 2025",
        title: "Best Time to Visit AlUla Desert",
        image: "/images/blog-image-1.png",
        body: [
          "The best time to visit AlUla Desert is between October and March, when daytime temperatures are mild and evenings are cool. Summer months can be extremely hot, so plan your trip for the cooler season to enjoy hiking, jeep tours, and stargazing comfortably.",
          "Peak season runs from November to February. If you prefer fewer crowds, consider visiting in early October or late March. Desert blooms sometimes appear after rare rains, adding an extra touch of magic to the landscape.",
        ],
      },
      {
        slug: "what-to-pack-for-a-desert-tour",
        date: "Dec 5, 2025",
        title: "What to Pack for a Desert Tour",
        image: "/images/blog-image-2.png",
        body: [
          "Pack light, breathable clothing in neutral colors, a wide-brimmed hat, sunscreen (SPF 50+), and reusable water bottles. Closed-toe shoes or sturdy sandals are essential for walking on sand and rocky terrain.",
          "Bring a small backpack for essentials, a power bank for your phone, and a light jacket for cooler evenings. Avoid single-use plastics — many tour operators support sustainable practices.",
        ],
      },
      {
        slug: "photography-tips-for-desert-landscapes",
        date: "Dec 4, 2025",
        title: "Photography Tips for Desert Landscapes",
        image: "/images/blog-image-1.png",
        body: [
          "Golden hour — just after sunrise and before sunset — offers the best light for desert photography. The low angle creates long shadows and warm tones that bring dunes and rock formations to life.",
          "Use a polarizing filter to reduce glare and deepen the sky. Shoot in RAW when possible for more flexibility in post-processing. Include a person or vehicle for scale against the vast landscape.",
        ],
      },
      {
        slug: "sunrise-vs-sunset-tours-which-to-choose",
        date: "Dec 3, 2025",
        title: "Sunrise vs Sunset Tours: Which to Choose",
        image: "/images/blog-image-2.png",
        body: [
          "Sunrise tours are ideal if you prefer cooler temperatures and fewer people. The morning light is soft and perfect for photography. Sunset tours offer dramatic golden and orange skies and are popular for romantic or family experiences.",
          "Both options include expert guides and stunning views. Choose sunrise for serenity and sunset for that classic desert golden-hour atmosphere.",
        ],
      },
      {
        slug: "safety-guidelines-for-desert-exploration",
        date: "Dec 2, 2025",
        title: "Safety Guidelines for Desert Exploration",
        image: "/images/blog-image-1.png",
        body: [
          "Always travel with a licensed guide or approved operator. Stay hydrated and carry more water than you think you need. Inform someone of your route and expected return time.",
          "Wear appropriate clothing and footwear, and avoid venturing off marked trails alone. In case of emergency, keep your phone charged and know the local emergency numbers. Respect wildlife and leave no trace.",
        ],
      },
      {
        slug: "local-culture-and-traditions-in-alula",
        date: "Dec 1, 2025",
        title: "Local Culture and Traditions in AlUla",
        image: "/images/blog-image-2.png",
        body: [
          "AlUla is rich in heritage and living culture. From ancient Nabataean sites to traditional crafts and storytelling, the region offers a deep connection to Saudi history and hospitality.",
          "When visiting, dress modestly in public areas, ask before photographing people, and support local artisans. Many tours include cultural stops where you can learn about customs and traditions firsthand.",
        ],
      },
    ],
  },
} as const;

export type BlogContent = typeof blogContent;

export type BlogPostItem = (typeof blogContent.blog.items)[number];

/** Get a single blog post by slug, or undefined if not found */
export function getBlogBySlug(slug: string): BlogPostItem | undefined {
  const normalized = slug.toLowerCase().trim();
  return blogContent.blog.items.find((p) => p.slug === normalized);
}

/** All blog slugs for generateStaticParams */
export function getAllBlogSlugs(): string[] {
  return blogContent.blog.items.map((p) => p.slug);
}
