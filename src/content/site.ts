import { media } from "./media";

export const site = {
  name: "Hungry Monkey Catering Cyprus",
  description:
    "Premium catering and private dining experiences across Cyprus, crafted with Michelin-star level attention and island-born hospitality.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Our Partners", href: "/partners" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" }
  ],
  contact: {
    address: "Apostolou Louka 48, Kouklia, Paphos, 8500, Cyprus",
    phone: "+357 26 002049",
    email: "info@hungrymonkeycyprus.com",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Apostolou+Louka+48+Kouklia+Paphos+8500+Cyprus",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com" },
      { label: "Facebook", href: "https://www.facebook.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com" }
    ]
  },
  hero: {
    title: "Culinary moments crafted for Cyprus' most memorable celebrations",
    subtitle:
      "From intimate villa dinners to grand weddings, our team delivers refined menus, seamless service, and unforgettable presentation.",
    primaryCta: "Request a Service",
    secondaryCta: "View Services",
    image: media.hero
  },
  services: [
    {
      id: "event-catering",
      name: "Event Catering",
      description: "Signature menus for high-touch events and unforgettable celebrations.",
      bullets: [
        "Curated menus for weddings and galas",
        "On-site culinary leadership",
        "Luxury presentation styling",
        "Full staffing and logistics"
      ],
      image: media.gallery[0]
    },
    {
      id: "cocktail-parties",
      name: "Cocktail Parties",
      description: "Sophisticated bites and bespoke cocktails for elegant evenings.",
      bullets: [
        "Canapés designed for flow",
        "Signature cocktail pairings",
        "Interactive culinary stations",
        "Evening service teams"
      ],
      image: media.gallery[1]
    },
    {
      id: "private-chef",
      name: "Private Chef",
      description: "Michelin-level dining curated for villas, yachts, and retreats.",
      bullets: [
        "Seasonal tasting menus",
        "Dedicated chef and service",
        "Wine pairing guidance",
        "Discreet on-site execution"
      ],
      image: media.gallery[3]
    },
    {
      id: "confectionery",
      name: "Confectionery",
      description: "Sculpted desserts and patisserie designed to impress.",
      bullets: [
        "Custom wedding cakes",
        "Dessert tables & petits fours",
        "Artisan chocolates",
        "Luxury gifting"
      ],
      image: media.gallery[4]
    },
    {
      id: "private-plane-catering",
      name: "Private Plane Catering",
      description: "First-class menus and logistics tailored for private aviation.",
      bullets: [
        "Flight-ready gourmet menus",
        "International compliance",
        "24-hour readiness",
        "Temperature-controlled packaging"
      ],
      image: media.gallery[6]
    }
  ],
  badges: [
    { label: "HACCP Certified", image: media.badges[0] },
    { label: "We Love Cyprus", image: media.badges[1] },
    { label: "Presidential Aircraft Catering", image: media.badges[2] },
    { label: "Chamber Membership", image: media.badges[3] }
  ],
  team: [
    {
      name: "Asimakis Chaniotis",
      role: "Executive Chef",
      bio: "Michelin-starred leadership shaping our culinary vision.",
      image: media.team[0]
    },
    {
      name: "Maria Xelioti",
      role: "Hospitality Director",
      bio: "Orchestrating service that feels effortless and warm.",
      image: media.team[1]
    },
    {
      name: "Marios Ioannou",
      role: "Sous Chef",
      bio: "Seasonal craftsmanship and precision on every plate.",
      image: media.team[2]
    },
    {
      name: "Emmeleia Triantafyllou",
      role: "Event Stylist",
      bio: "Designing the visual language of every celebration.",
      image: media.team[3]
    }
  ],
  testimonials: [
    {
      name: "Sofia Markou",
      role: "Wedding Host",
      quote:
        "Every course felt like a signature moment. Guests still talk about the cocktail hour and the dessert artistry.",
      image: media.reviews[0]
    },
    {
      name: "Daniel Grey",
      role: "Private Villa Client",
      quote:
        "Impeccable service, discreet team, and food that felt like a five-star restaurant at home.",
      image: media.reviews[1]
    },
    {
      name: "Elena Georgiou",
      role: "Corporate Event Planner",
      quote:
        "They handled every detail. From the plating to the tempo of service, it was flawless.",
      image: media.reviews[0]
    }
  ],
  partners: [
    {
      name: "Liopetro Wedding Venue",
      description:
        "A dream limestone estate in Kouklia where countryside elegance meets coastal light.",
      story:
        "Together with Liopetro, we craft immersive wedding weekends with curated menus, vineyard storytelling, and seamless guest experiences.",
      images: media.partners
    }
  ],
  gallery: media.gallery
};

export type Service = (typeof site.services)[number];
