export const JOIN_IMG = "/images/join us";

export const joinHero = {
  title: ["DJs who can hold a", "room, we want you on", "the roster"],
  blurb:
    "Book My DJ is growing across the UK. If you take the craft seriously and treat clients properly, we'll keep your diary full and handle everything that isn't the music.",
  primaryCta: { label: "Apply to join", href: "#apply" },
  secondaryCta: { label: "How it works", href: "#how-it-works" },
  /** Back shot sits higher-left, front shot overlaps lower-right. */
  images: [
    { src: `${JOIN_IMG}/Rectangle 23.png`, alt: "Three DJs behind the booth at a live event" },
    { src: `${JOIN_IMG}/Rectangle 24.png`, alt: "Two DJs on stage between sets" },
  ],
};

export type JoinStat = { value: string; label: string };

export const joinStats: JoinStat[] = [
  { value: "7 days", label: "Payment terms" },
  { value: "UK wide", label: "Coverage" },
  { value: "14+ yrs", label: "Industry experience" },
];

export type Benefit = { title: string; blurb: string };

export const benefits: Benefit[] = [
  {
    title: "Consistent bookings",
    blurb:
      "Corporate, weddings, festivals and club nights — matched to your genres and your diary, not scattergun.",
  },
  {
    title: "Fair, fast pay",
    blurb:
      "Transparent fees agreed up front and paid within 7 days of the event. No chasing clients for invoices.",
  },
  {
    title: "Kit when you need it",
    blurb:
      "Access to our sound, lighting and booth stock so you're never turning down a gig over equipment.",
  },
  {
    title: "Covered and contracted",
    blurb:
      "PLI, contracts and client comms handled by us. You turn up, plug in and play.",
  },
  {
    title: "A real crew",
    blurb:
      "Shared knowledge, back-to-back sets and cover between DJs who actually rate each other.",
  },
  {
    title: "Brand building",
    blurb:
      "Photo and video content from your gigs, plus a profile page on the site to grow your own name.",
  },
];

export type JoinStep = { title: string; blurb: string };

export const joinSteps: JoinStep[] = [
  {
    title: "Send your details",
    blurb: "Fill the short form with your genres, base location and links to mixes.",
  },
  {
    title: "Have a chat",
    blurb: "A 20 minute call with Don or Luke to talk about your style and availability.",
  },
  {
    title: "Showcase set",
    blurb:
      "A live or recorded set so we can hear how you read a room, not just a tracklist.",
  },
  {
    title: "First booking",
    blurb: "You're on the roster and we start matching you to events that fit.",
  },
];

export const lookingFor = {
  title: "Who we're looking for",
  criteria: [
    "2+ years playing to live crowds",
    "Reliable, professional and on time",
    "Confident reading and rebuilding a room",
    "Own headphones and a mixer you know inside out",
    "Based in or able to travel across the UK",
    "Comfortable with corporate and private clients",
  ],
  footnote:
    "New to paid gigs but genuinely good? Still apply, we run occasional warm-up slots alongside our senior DJs.",
  images: [
    { src: `${JOIN_IMG}/Rectangle 13.png`, alt: "Crowd dancing at a party" },
    { src: `${JOIN_IMG}/Rectangle 23 (1).png`, alt: "DJ pointing to the crowd mid-set" },
  ],
};

export const applySection = {
  title: "Apply to join",
  blurb: "Takes two minutes. We reply to every application within five working days.",
  emailNote: "Prefer email? Send your mixes and a short intro and we'll take it from there.",
  email: "djs@bookmydj.co.uk",
  formHeading: "Send Us Your Details",
  disclaimer: "We only use your details to review your application.",
};
