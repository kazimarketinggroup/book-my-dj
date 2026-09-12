export type RosterDj = {
  id: string;
  name: string;
  location: string;
  genres: string[];
  image: string | null;
  placeholderLabel?: string;
  href?: string;
};

export const DJ_GENRES = [
  "Multi-genre",
  "Commercial",
  "Party Anthems",
  "Motown",
  "Soul",
  "Old School R&B",
  "R&B",
  "Hip-Hop",
  "Bashment / Reggae",
  "House",
  "Funky",
  "Garage",
  "Afrobeats",
];

export const FOUNDERS = [
  {
    name: "Don",
    role: "Co Founder",
    image: "/images/djs/Rectangle_17_188_1463.png",
    alt: "Don - Co Founder",
    href: "/djs/don",
  },
  {
    name: "Luke Smith",
    role: "Co Founder",
    image: "/images/djs/Rectangle_18_188_1464.png",
    alt: "Luke Smith - Co Founder",
    href: "/djs/luke",
  },
];

export const FULL_ROSTER: RosterDj[] = [
  {
    id: "sunder",
    name: "Sunder",
    location: "London Area",
    genres: ["Multi-genre", "House", "R&B"],
    image: "/images/djs/Gradient_188_871.jpg",
    href: "/contact?dj=Sunder",
  },
  {
    id: "boston-campbell",
    name: "Boston Campbell",
    location: "Midlands",
    genres: ["Multi-genre"],
    image: null,
    placeholderLabel: "PHOTO — BOSTON CAMPBELL",
    href: "/contact?dj=Boston+Campbell",
  },
  {
    id: "jamski",
    name: "Jamski",
    location: "Midlands",
    genres: ["Multi-genre"],
    image: "/images/djs/Gradient_188_932.jpg",
    href: "/contact?dj=Jamski",
  },
  {
    id: "ollie-sorenson",
    name: "Ollie Sorenson",
    location: "Midlands",
    genres: ["Commercial", "Multi-genre", "Party Anthems"],
    image: "/images/djs/Gradient_188_959.jpg",
    href: "/contact?dj=Ollie+Sorenson",
  },
  {
    id: "das",
    name: "DAS",
    location: "Midlands",
    genres: ["House"],
    image: null,
    placeholderLabel: "PHOTO — DAS",
    href: "/contact?dj=DAS",
  },
  {
    id: "dl",
    name: "DL",
    location: "Midlands",
    genres: ["Commercial", "Multi-genre"],
    image: "/images/djs/Gradient_188_990.jpg",
    href: "/contact?dj=DL",
  },
  {
    id: "5-star-kid",
    name: "5 Star Kid",
    location: "Midlands",
    genres: ["Afro", "Salsa"],
    image: "/images/djs/Gradient_188_1019.jpg",
    href: "/contact?dj=5+Star+Kid",
  },
  {
    id: "dj-adek",
    name: "DJ Adek",
    location: "Liverpool & Northern locations",
    genres: ["Multi-genre"],
    image: "/images/djs/Gradient_188_1270.jpg",
    href: "/contact?dj=DJ+Adek",
  },
  {
    id: "3rd-gen",
    name: "3rd Gen",
    location: "Midlands",
    genres: ["Bashment", "Reggae"],
    image: null,
    placeholderLabel: "PHOTO — 3RD GEN",
    href: "/contact?dj=3rd+Gen",
  },
  {
    id: "dj-kez",
    name: "DJ Kez",
    location: "Midlands",
    genres: ["Punjabi"],
    image: "/images/djs/Gradient_188_1075.jpg",
    href: "/contact?dj=DJ+Kez",
  },
  {
    id: "mike-cray",
    name: "Mike Cray",
    location: "Midlands",
    genres: ["Commercial", "Multi-genre", "Party Anthems"],
    image: "/images/djs/Gradient_188_1102.jpg",
    href: "/contact?dj=Mike+Cray",
  },
  {
    id: "rohan",
    name: "Rohan",
    location: "Manchester & Northern locations",
    genres: ["Multi-genre"],
    image: "/images/djs/Gradient_188_1243.jpg",
    href: "/contact?dj=Rohan",
  },
  {
    id: "dj-price",
    name: "DJ Price",
    location: "Midlands",
    genres: ["House"],
    image: null,
    placeholderLabel: "PHOTO — DJ PRICE",
    href: "/contact?dj=DJ+Price",
  },
  {
    id: "j-dubz",
    name: "J Dubz",
    location: "Midlands",
    genres: ["Multi-genre"],
    image: "/images/djs/Gradient_188_1160.jpg",
    href: "/contact?dj=J+Dubz",
  },
  {
    id: "dj-wage",
    name: "DJ Wage",
    location: "Midlands",
    genres: ["Multi-genre"],
    image: "/images/djs/Gradient_188_1187.jpg",
    href: "/contact?dj=DJ+Wage",
  },
];

export const WORKED_BRANDS = [
  "Gymking",
  "Topshop Christmas Party",
  "Selfridges",
  "Foundry Gym (nationwide)",
  "ESN",
  "Morphe & MC (nationwide stores)",
  "Weddings",
  "Miss UK Beauty Pageant",
  "Birmingham Rockets Basketball",
  "Birmingham City End of Season Party",
  "Boxxer Events (boxing, NEC)",
  "Opening events for multiple award-winning businesses",
];
