import type { Route } from "next";

export const ABOUT_IMG = "/images/about";

export const aboutHero = {
  title: "We're The Team Behind Every Great Set",
  blurb:
    "Book My Dj was founded on a simple premise: events don't need a mobile disco, they need a DJ who understands the room. We advise on the right sound for your event, then deliver it live.",
  image: `${ABOUT_IMG}/11033 1.png`,
  alt: "Close-up of a DJ's hands on a mixer",
};

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "1,200+", label: "Events Played" },
  { value: "8", label: "Event Specialisms" },
  { value: "24h", label: "Quote Turnaround" },
  { value: "4.9★", label: "Client Rating" },
];

export const story = {
  title: "A Dancefloor That Never Goes Quiet",
  video: `${ABOUT_IMG}/Group 162.png`,
  videoAlt: "DJ playing to a packed crowd",
  paragraphs: [
    "Most DJ hire is booked on price and hoped for on the night. We work the other way round. We're a DJ agency first, not a box-ticking booking site — every set starts with understanding your event, your guests, and your brief, not a generic playlist.",
    "We advise on where the energy needs to build, then bring the sound, lighting, and DJ that make it happen.",
  ],
};

export type TeamMember = {
  name: string;
  /** Flowing signature spelling shown in the script face. */
  signature: string;
  /** Instagram handle, set beside the signature. */
  handle: string;
  role: string;
  bio: string;
  /** DJ profile this member links through to. */
  href: Route;
  /** Large portrait shown first in the collage. */
  main: string;
  mainAlt: string;
  /** Three supporting shots. */
  gallery: { src: string; alt: string }[];
};

export const team: TeamMember[] = [
  {
    name: "Don",
    signature: "Don Smile",
    handle: "@dj_smiley_1",
    role: "Co-Founder",
    bio: "Leads DJ bookings and client relationships. Builds the brief that makes every set land right.",
    href: "/djs/don",
    main: `${ABOUT_IMG}/Rectangle 17.png`,
    mainAlt: "Don behind the decks at an event",
    gallery: [
      { src: `${ABOUT_IMG}/Group 168.png`, alt: "Don playing an outdoor set" },
      { src: `${ABOUT_IMG}/Group 169.png`, alt: "Don mixing under stage lights" },
      { src: `${ABOUT_IMG}/Group 170.png`, alt: "Don in a suit playing a wedding" },
    ],
  },
  {
    name: "Luke Luiz",
    signature: "Luke Luiz",
    handle: "@djlukeluiz",
    role: "Co-Founder",
    bio: "Runs event delivery and the DJ roster. Makes sure the sound, lighting, and timing never miss.",
    href: "/djs/luke",
    main: `${ABOUT_IMG}/Rectangle 18.png`,
    mainAlt: "Luke Luiz behind the decks",
    gallery: [
      { src: `${ABOUT_IMG}/Group 171.png`, alt: "Luke Luiz mixing at a club night" },
      { src: `${ABOUT_IMG}/Rectangle 17 (1).png`, alt: "Luke Luiz playing an afternoon set" },
      { src: `${ABOUT_IMG}/Group 173.png`, alt: "Luke Luiz at the booth" },
    ],
  },
];

export type Pillar = { title: string; blurb: string; icon: "dj" | "kit" | "backup" };

export const pillars: Pillar[] = [
  {
    title: "The Right DJ",
    blurb: "Matched to your event type, crowd, and brief — not a generic booking.",
    icon: "dj",
  },
  {
    title: "The Right Kit",
    blurb: "Industry-grade sound and lighting on every job, no matter the venue.",
    icon: "kit",
  },
  {
    title: "The Right Backup",
    blurb: "Last-minute cover and on-the-day support, so nothing falls through.",
    icon: "backup",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What does Book My Dj actually do?",
    a: "We're a DJ agency that supplies professional DJs for events across the UK — corporate, weddings, festivals, and everything in between. We match the right DJ to your brief, then handle the sound, lighting, and delivery on the night, so you get a set that's built for your event, not a generic playlist.",
  },
  {
    q: "How far in advance do I need to book?",
    a: "Most clients book four to eight weeks out, which gives us the widest choice of DJs for your date. That said, we hold last-minute cover for exactly this reason — if your date is this week, call us and we'll tell you straight away what's possible.",
  },
  {
    q: "Do you cover events outside major cities?",
    a: "Yes. We cover the whole UK. Our roster is spread across the country, so we match you with a DJ who can reach your venue without a long-haul travel fee attached to your quote.",
  },
  {
    q: "What's included with sound and lighting?",
    a: "Every booking includes industry-grade PA and lighting sized to your venue and guest count. We confirm the specifics once we know the room — a 60-guest private dining room and a 500-guest warehouse need very different rigs.",
  },
  {
    q: "Can you match a DJ to a specific music style?",
    a: "That's the core of what we do. Tell us the genres, the era, or just the feeling you want in the room, and we'll put forward DJs who genuinely play that style rather than someone working from a request list.",
  },
];
