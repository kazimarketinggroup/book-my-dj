export const LM_IMG = "/images/lastminiutedj";

export const lastMinuteHero = {
  title: ["Need A DJ For Tonight,", "Tomorrow, Or This Weekend?"],
  blurb:
    "DJ cancelled? Plans changed last minute? We keep DJs on standby across the UK, ready to step in with full sound and lighting — often within hours.",
  cta: "Check Availability Now",
  image: `${LM_IMG}/11033 1.png`,
  alt: "Two DJs performing under a night sky",
};

export type Step = { title: string; blurb: string };

export const steps: Step[] = [
  {
    title: "Tell Us What Happened",
    blurb: "Call, WhatsApp, or fill in the quick form event type, location, and time.",
  },
  {
    title: "We Check The Roster",
    blurb: "We match you with the nearest available DJ who fits the brief.",
  },
  {
    title: "Confirmed, Fast",
    blurb: "You get a confirmed DJ, kit included, often within the hour.",
  },
];

export const rosterPanel = {
  stepsHeading: ["Booked In", "Three Steps"],
  stepsImage: `${LM_IMG}/Rectangle 23 (1).png`,
  stepsImageAlt: "Guests dancing at a party under coloured lights",
  title: "A Roster Built For This Exact Situation",
  blurb:
    "Every DJ on our books is vetted, equipped, and ready — so when something falls through, we're not scrambling either. It's the same standard as a planned booking, just faster to confirm.",
  image: `${LM_IMG}/Rectangle 23.png`,
  imageAlt: "DJ smiling behind the decks at an event",
};

export const testimonial = {
  quote:
    "Our DJ pulled out two days before the wedding. Book My Dj had someone confirmed within the afternoon, and no one at the wedding could tell it wasn't the plan all along.",
  name: "[Name]",
  meta: "[Event Type], [Location]",
};

export type Faq = { q: string; a: string };

export const lastMinuteFaqs: Faq[] = [
  {
    q: "How last minute can you actually go?",
    a: "We're a DJ agency that supplies professional DJs for events across the UK corporate, weddings, festivals, and everything in between. We match the right DJ to your brief, then handle the sound, lighting, and delivery on the night, so you get a set that's built for your event, not a generic playlist.",
  },
  {
    q: "Do you charge more for urgent bookings?",
    a: "Not automatically. Same-day and next-day bookings are priced on what the job actually needs — travel distance, kit, and set length. If a premium applies we tell you upfront, before you commit to anything.",
  },
  {
    q: "Will I still get full sound and lighting?",
    a: "Yes. Our standby DJs carry the same industry-grade PA and lighting as a planned booking. We size the rig to your venue and guest count, so a last-minute call doesn't mean a stripped-back setup.",
  },
  {
    q: "What if my event is outside a major city?",
    a: "Our roster is spread across the UK rather than clustered in a few cities, so we can usually reach venues well outside the major hubs. Tell us the postcode and we'll confirm what's reachable in your timeframe.",
  },
  {
    q: "Can I book by phone instead of the form?",
    a: "Absolutely — for urgent bookings a call or WhatsApp is usually fastest. Give us the event type, location, and start time, and we'll come back with availability straight away.",
  },
];
