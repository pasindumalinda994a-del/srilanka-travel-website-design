/**
 * Contact page content
 * AlUla Desert Travel Agency
 */

export const contactContent = {
  pageHero: {
    label: "Contact",
    heading: "Book your tour",
    description:
      "Get in touch to reserve your desert experience\nor ask any questions about our tours.",
  },

  form: {
    nameLabel: "Name",
    namePlaceholder: "Your full name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    phoneLabel: "Phone Number",
    phonePlaceholder: "+966 55 123 4567",
    tourLabel: "Select Your Tour",
    tourPlaceholder: "Choose your tour...",
    dateLabel: "Preferred Date",
    datePlaceholder: "mm/dd/yyyy",
    travelersLabel: "Number of Travelers",
    adultsLabel: "Adults",
    childrenLabel: "Children",
    messageLabel: "Message / Special Requests",
    messagePlaceholder: "Anything else we should know?",
    submit: "Reserve Your Spot",
    successMessage: "Booking received. We will confirm shortly.",
    errorMessage: "Something went wrong. Please try again.",
  },

  info: {
    heading: "Or reach us directly",
    email: "hello@marwa-tours.com",
    region: "AlUla Region, Saudi Arabia",
  },

  contactCards: [
    {
      title: "Call & WhatsApp",
      lines: ["+966 55 123 4567", "+966 53 987 6543"],
      icon: "phone",
    },
    {
      title: "Working Hours",
      lines: ["Daily: 8am-5pm", "Friday: Closed"],
      icon: "clock",
    },
    {
      title: "Write to Us",
      lines: ["info@marwa.com", "booking@marwa.com"],
      icon: "mail",
    },
  ],
} as const;

export type ContactContent = typeof contactContent;
