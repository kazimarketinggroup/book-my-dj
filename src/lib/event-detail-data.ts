/**
 * Content for the hand-built event detail pages. Each entry drives the shared
 * layout in components/event-detail, so adding a new page is data-only.
 */

export type Promise = { title: string; blurb: string };
export type Flyer = { src: string; alt: string };
export type DetailFaq = { q: string; a: string };

export type EventDetail = {
  slug: string;
  /** Matches EventRow.title so "Other events" can exclude it. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: { headline: string; blurb: string[]; image: string; alt: string };
  promiseHeading: [string, string];
  promises: Promise[];
  detail: {
    eyebrow: string;
    title: string;
    blurb: string;
    image: string;
    alt: string;
  };
  video: {
    eyebrow: string;
    title: string;
    blurb: string;
    image: string;
    alt: string;
  };
  flyers: Flyer[];
  faqs: DetailFaq[];
};

const CORP = "/images/corporateevents";
const PR = "/images/prevents";
const FEST = "/images/musicfestival";
const LIVE = "/images/liveevents";
const SPECIAL = "/images/specialoccesion";
const MOBILE = "/images/mobiledisco";
const HOSP = "/images/hospitality";

export const eventDetails: EventDetail[] = [
  {
    slug: "corporate-events",
    title: "Corporate Events",
    metaTitle: "Corporate Events — Book My DJ",
    metaDescription:
      "Sharp, on-brand sets for launches, socials, and end-of-year parties built around your audience, not a generic playlist.",
    hero: {
      headline: "A crowd that needs the tone right, not just the volume up.",
      blurb: [
        "Sharp, on-brand sets for launches, socials, and end-of-year parties",
        "built around your audience, not a generic playlist.",
      ],
      image: `${CORP}/11033 1.png`,
      alt: "DJ mixing under blue stage light",
    },
    promiseHeading: ["The boring parts handled,", "so the night isn't."],
    promises: [
      {
        title: "Brand-safe sets",
        blurb:
          "Music vetted against your brief, your guests, and your leadership.",
      },
      {
        title: "Room-reading DJs",
        blurb:
          "Background during speeches, full energy the moment the floor opens.",
      },
      {
        title: "Full AV cover",
        blurb:
          "Sound, lighting and mics handled end to end, venue permitting.",
      },
    ],
    detail: {
      eyebrow: "",
      title: "Built around your run sheet",
      blurb:
        "We map the evening before the DJ ever picks up a mic — arrival, dinner, awards, dancefloor — so nothing is guessed on the night.",
      image: `${CORP}/Gradient.png`,
      alt: "Guest dancing at a corporate party",
    },
    video: {
      eyebrow: "",
      title: "See a corporate set in action",
      blurb:
        "A two-minute cut from a 600-guest end-of-year party in Manchester: speeches, transition, packed floor by 9pm.",
      image: `${CORP}/Gradient (1).png`,
      alt: "DJ performing behind a Smiley branded booth",
    },
    flyers: [
      { src: `${CORP}/Rectangle 13.png`, alt: "Do Not Disturb event flyer, Gorilla Manchester" },
      { src: `${CORP}/Rectangle 19.png`, alt: "Dine & Vibes event flyer, Tap & Spile Birmingham" },
      { src: `${CORP}/Rectangle 20.png`, alt: "Dine & Vibes Sunday session flyer" },
      { src: `${CORP}/Rectangle 21.png`, alt: "Play Nu Vel event flyer" },
    ],
    faqs: [
      {
        q: "Can you work around speeches and awards?",
        a: "Yes — we build the set around your run sheet and handle mic changeovers.",
      },
      {
        q: "Do you provide the sound system?",
        a: "Industry-grade sound and lighting are included unless the venue supplies its own.",
      },
    ],
  },
  {
    slug: "pr-events",
    title: "PR Events",
    metaTitle: "PR Events — Book My DJ",
    metaDescription:
      "Music that supports the moment without overpowering it. We match tempo and tone to the room, keeping press and guests engaged from arrival to close.",
    hero: {
      headline: "Music that supports the moment without overpowering it.",
      blurb: [
        "We match tempo and tone to the room, keeping press and guests",
        "engaged from arrival to close.",
      ],
      image: `${PR}/11033 1.png`,
      alt: "Close-up of a mixer under teal lighting",
    },
    promiseHeading: ["The boring parts handled,", "so the night isn't."],
    promises: [
      {
        title: "Conversation-first",
        blurb: "Levels tuned so interviews and content capture still work.",
      },
      {
        title: "Brand-tied sound",
        blurb:
          "Genre and era matched to the campaign, not the DJ's favourites.",
      },
      {
        title: "Content-ready",
        blurb: "Booth and lighting that photograph well for social cutdowns.",
      },
    ],
    detail: {
      eyebrow: "Detail",
      title: "The arrival hour matters most",
      blurb:
        "First impressions land in the first twenty minutes. We hold a controlled, textured set while the room fills, then lift once the guest list is in.",
      image: `${PR}/Background+Border (1).png`,
      alt: "Guests at a Brunch Booze & Beats launch night",
    },
    video: {
      eyebrow: "Watch",
      title: "Watch a launch night unfold",
      blurb:
        "Brand-brief playlist that kept press and guests hooked through a three-hour London activation.",
      image: `${PR}/Background+Border.png`,
      alt: "Two DJs at a PR launch event",
    },
    flyers: [
      { src: `${PR}/Rectangle 13.png`, alt: "Summer Day Party flyer" },
      { src: `${PR}/Rectangle 20.png`, alt: "Isolation Workout event flyer" },
      { src: `${PR}/Rectangle 21.png`, alt: "Ambience event flyer" },
      { src: `${PR}/Rectangle 22.png`, alt: "Smiley JL event flyer" },
    ],
    faqs: [
      {
        q: "Can you follow a brand music brief?",
        a: "Yes — send references and we build the set from them.",
      },
      {
        q: "Do you do daytime activations?",
        a: "Often. Daytime sets are quieter and more textural by design.",
      },
    ],
  },
  {
    slug: "music-festivals",
    title: "Music Festivals",
    metaTitle: "Music Festivals — Book My DJ",
    metaDescription:
      "Long days, big crowds, zero dead air. Back-to-back sets built to hold energy across stages and hours, not just one-hour slots.",
    hero: {
      headline: "Long days, big crowds, zero dead air.",
      blurb: [
        "Back-to-back sets built to hold energy across stages and hours, not",
        "just one-hour slots.",
      ],
      image: `${FEST}/11033 1.png`,
      alt: "Festival stage rig under warm lighting",
    },
    promiseHeading: ["The boring parts handled,", "so the night isn't."],
    promises: [
      {
        title: "Multi-stage rosters",
        blurb: "DJs booked in blocks so stages never fall silent.",
      },
      {
        title: "Weather-ready rigs",
        blurb: "Covered decks, backup power planning, spare kit on site.",
      },
      {
        title: "Genre depth",
        blurb:
          "House, garage, afrobeats, disco, drum & bass — matched per stage.",
      },
    ],
    detail: {
      eyebrow: "",
      title: "Programming across a whole weekend",
      blurb:
        "We plan the arc of the day: warm-up, peak, wind-down and we brief every DJ on what came before them.",
      image: `${FEST}/Gradient (1).png`,
      alt: "Guests at a Boujiee Brunch festival session",
    },
    video: {
      eyebrow: "",
      title: "Festival reel",
      blurb: "Back-to-back sets across two stages, all weekend, in Leeds.",
      image: `${FEST}/Gradient.png`,
      alt: "Three DJs at a festival stage",
    },
    flyers: [
      { src: `${FEST}/Rectangle 13.png`, alt: "Yxngdane event flyer" },
      { src: `${FEST}/Rectangle 20.png`, alt: "The Main Event flyer" },
      { src: `${FEST}/Rectangle 21.png`, alt: "Taboo featuring DJ Luke Luiz flyer" },
      { src: `${FEST}/Rectangle 22.png`, alt: "Hip Hop N Paint event flyer" },
    ],
    faqs: [
      {
        q: "Can you cover multiple stages?",
        a: "Yes — our roster is booked in blocks across stages.",
      },
      {
        q: "Do you supply backline?",
        a: "We can supply full DJ backline or plug into yours.",
      },
    ],
  },
  {
    slug: "live-events",
    title: "Live Events",
    metaTitle: "Live Events — Book My DJ",
    metaDescription:
      "The right tempo for dinner, drinks, and everything after. Sets that shift with the evening background at dinner, full energy once the night moves on.",
    hero: {
      headline: "The right tempo for dinner, drinks, and everything after.",
      blurb: [
        "Sets that shift with the evening background at dinner, full",
        "energy once the night moves on.",
      ],
      image: `${LIVE}/11033 1.png`,
      alt: "DJ decks lit purple at a live event",
    },
    promiseHeading: ["The boring parts handled,", "so the night isn't."],
    promises: [
      {
        title: "Seamless handovers",
        blurb: "Live acts to DJ sets with no awkward silence between.",
      },
      {
        title: "Volume discipline",
        blurb: "Levels that suit the room at every point of the night.",
      },
      {
        title: "On-the-day support",
        blurb: "A coordinator on comms with your event team.",
      },
    ],
    detail: {
      eyebrow: "",
      title: "One night, three different rooms",
      blurb:
        "Dinner, drinks, dancefloor — same space, three completely different jobs for the DJ. We plan all three.",
      image: `${LIVE}/Gradient (1).png`,
      alt: "Guest on the dancefloor at a live event",
    },
    video: {
      eyebrow: "",
      title: "From dinner to dancefloor",
      blurb: "A single evening compressed into ninety seconds.",
      image: `${LIVE}/Gradient.png`,
      alt: "Guest dancing with a drink under club lighting",
    },
    flyers: [
      { src: `${LIVE}/Rectangle 13.png`, alt: "Boxing Day event flyer" },
      { src: `${LIVE}/Rectangle 20.png`, alt: "After Party event flyer" },
      { src: `${LIVE}/Rectangle 21.png`, alt: "Gender Reveal event flyer" },
      { src: `${LIVE}/Rectangle 22.png`, alt: "New Year balloon drop event flyer" },
    ],
    faqs: [
      {
        q: "Can you follow a live band?",
        a: "Yes — we handle the changeover so the room never drops.",
      },
      {
        q: "How late can you play?",
        a: "As late as your venue licence allows.",
      },
    ],
  },
  {
    slug: "private-events",
    title: "Private Events",
    metaTitle: "Private Events — Book My DJ",
    metaDescription:
      "Personal sets built around your taste and your guest list, for the parties that matter most.",
    hero: {
      headline: "A playlist that actually sounds like you.",
      blurb: [
        "Personal sets built around your taste and your guest list, for",
        "the parties that matter most.",
      ],
      image: `/images/privateevents/11033 1.png`,
      alt: "DJ performing at an intimate private event",
    },
    promiseHeading: ["The boring parts handled,", "so the night isn't."],
    promises: [
      {
        title: "Your taste, first",
        blurb:
          "Playlist built around your references, not the DJ's go-to set.",
      },
      {
        title: "Guest-list aware",
        blurb:
          "We read the room and adapt — from mellow dinner to full dancefloor.",
      },
      {
        title: "Personal touch",
        blurb:
          "Dedications, requests, and surprise drops that mean something to your crowd.",
      },
    ],
    detail: {
      eyebrow: "",
      title: "Every great party starts with your taste",
      blurb:
        "We sit down before the night to understand what makes your crowd tick — the songs that matter, the genres you love, the vibe you want. Then we build around that.",
      image: `/images/privateevents/Gradient.png`,
      alt: "Guests celebrating at a private party",
    },
    video: {
      eyebrow: "",
      title: "See a private set in action",
      blurb:
        "An evening that moved from dinner-time ambient through to a packed dancefloor — all tailored to the host's taste.",
      image: `/images/privateevents/Gradient (1).png`,
      alt: "DJ mixing at a private event",
    },
    flyers: [
      { src: `/images/privateevents/Rectangle 13.png`, alt: "Private party event flyer" },
      { src: `/images/privateevents/Rectangle 20.png`, alt: "Birthday celebration flyer" },
      { src: `/images/privateevents/Rectangle 21.png`, alt: "House party event flyer" },
      { src: `/images/privateevents/Rectangle 22.png`, alt: "Anniversary celebration flyer" },
    ],
    faqs: [
      {
        q: "Can you build a set around my music taste?",
        a: "Yes — send us your favourite artists and songs, and we build the entire set from them.",
      },
      {
        q: "Can you take requests during the set?",
        a: "Absolutely. We're built for it — your guests' requests shape the second half of the night.",
      },
      {
        q: "How many hours can you play?",
        a: "From intimate dinners (2 hours) to all-night parties (8+). We fit your schedule.",
      },
    ],
  },
  {
    slug: "special-occasions",
    title: "Special Occasions",
    metaTitle: "Special Occasions — Book My DJ",
    metaDescription:
      "Birthdays, anniversaries, and celebrations — soundtracked properly, start to finish. A milestone that deserves more than a Spotify playlist.",
    hero: {
      headline: "A milestone that deserves more than a Spotify playlist.",
      blurb: [
        "Birthdays, anniversaries, and celebrations — soundtracked properly,",
        "start to finish.",
      ],
      image: `${SPECIAL}/11033 1.png`,
      alt: "DJ performing at a special occasion celebration",
    },
    promiseHeading: ["The boring parts handled,", "so the night isn't."],
    promises: [
      {
        title: "Milestone moments matter",
        blurb:
          "Whether it's a 30th, anniversary, or life chapter change, the soundtrack matters.",
      },
      {
        title: "Built for celebration",
        blurb:
          "We create the perfect arc — kicks off the right way, peaks at the right moment, lands properly.",
      },
      {
        title: "Surprise-ready",
        blurb:
          "Dedicated tracks, special dedications, and moments that hit harder because they're planned.",
      },
    ],
    detail: {
      eyebrow: "",
      title: "The first hour sets the tone",
      blurb:
        "We kick off with the feel you want — intimate and warming, or straight into energy. Then we read the room and build toward the moment.",
      image: `${SPECIAL}/Gradient.png`,
      alt: "Guests celebrating at a special occasion event",
    },
    video: {
      eyebrow: "",
      title: "See a milestone night come alive",
      blurb:
        "A 40th birthday that hit all the marks — started right, peaked at cake time, and kept dancing until late.",
      image: `${SPECIAL}/Gradient (1).png`,
      alt: "DJ performing at a birthday celebration",
    },
    flyers: [
      { src: `${SPECIAL}/Rectangle 13.png`, alt: "Birthday celebration event flyer" },
      { src: `${SPECIAL}/Rectangle 20.png`, alt: "Anniversary party event flyer" },
      { src: `${SPECIAL}/Rectangle 21.png`, alt: "Milestone celebration flyer" },
      { src: `${SPECIAL}/Rectangle 22.png`, alt: "Special celebration event flyer" },
    ],
    faqs: [
      {
        q: "Can you time special moments like cakes or speeches?",
        a: "Yes — we coordinate with you before the night, so dedications and songs land exactly when you want them.",
      },
      {
        q: "Can you play music for different age groups?",
        a: "Absolutely. We read the crowd and blend eras and styles so everyone's having fun.",
      },
      {
        q: "Do you do anniversary celebrations?",
        a: "Yes — we handle everything from intimate dinners for two to massive milestone parties.",
      },
    ],
  },
  {
    slug: "mobile-disco",
    title: "Mobile Disco",
    metaTitle: "Mobile Disco — Book My DJ",
    metaDescription:
      "Complete sound and lighting setup that travels — no venue too small or too far. Full rig, full lights, anywhere you need it.",
    hero: {
      headline: "Full rig, full lights, anywhere you need it.",
      blurb: [
        "Complete sound and lighting setup that travels — no venue too small or",
        "too far.",
      ],
      image: `${MOBILE}/11033 1.png`,
      alt: "Mobile DJ rig with full lighting setup",
    },
    promiseHeading: ["The boring parts handled,", "so the night isn't."],
    promises: [
      {
        title: "Everything included",
        blurb:
          "Complete sound, lighting, decking — we bring the lot and you bring the party.",
      },
      {
        title: "Fast install",
        blurb:
          "Sound check in under an hour, so your night starts on time.",
      },
      {
        title: "Nationwide",
        blurb:
          "We reach venues across the UK, no matter how far or rural.",
      },
    ],
    detail: {
      eyebrow: "",
      title: "One van, one complete party",
      blurb:
        "Deck, mixer, turntables, speakers, lighting rig — all travels in one van and sets up end to end. You handle the space, we handle the sound.",
      image: `${MOBILE}/Gradient.png`,
      alt: "Mobile disco setup at an outdoor event",
    },
    video: {
      eyebrow: "",
      title: "Setup to sound check",
      blurb:
        "The rig rolls in, sound check, and half an hour later the floor is packed. Full reel of a countryside event with complete mobile setup.",
      image: `${MOBILE}/Gradient (1).png`,
      alt: "Mobile DJ performing at an event",
    },
    flyers: [
      { src: `${MOBILE}/Rectangle 13.png`, alt: "Mobile disco event flyer" },
      { src: `${MOBILE}/Rectangle 20.png`, alt: "Festival mobile disco flyer" },
      { src: `${MOBILE}/Rectangle 21.png`, alt: "Outdoor event with mobile setup flyer" },
      { src: `${MOBILE}/Rectangle 22.png`, alt: "Mobile party setup event flyer" },
    ],
    faqs: [
      {
        q: "Do you supply everything?",
        a: "Yes — decks, mixer, turntables, speakers, lighting rig. We only need you to supply the space and power.",
      },
      {
        q: "Can you work outside?",
        a: "Yes — we work gardens, fields, marquees, anywhere with basic shelter and power.",
      },
      {
        q: "How long is setup?",
        a: "Usually under an hour. We arrive, set up, sound check, and you're ready.",
      },
    ],
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    metaTitle: "Hospitality — Book My DJ",
    metaDescription:
      "Residencies and one-offs for bars, hotels and restaurants. Music is part of the venue experience, not overpowering it.",
    hero: {
      headline: "Residencies and one-offs for bars, hotels and restaurants.",
      blurb: [
        "Customers sit down sound for residency dining. The music is part",
        "of the experience, not overpowering it.",
      ],
      image: `${HOSP}/11033 1.png`,
      alt: "DJ performing at a hospitality venue",
    },
    promiseHeading: ["The boring parts handled,", "so the night isn't."],
    promises: [
      {
        title: "Residency rosters",
        blurb:
          "Same team on same nights, so regulars know who's coming and what to expect.",
      },
      {
        title: "Brand consistency",
        blurb:
          "House sound that fits your venue's vibe, not a different playlist each night.",
      },
      {
        title: "Last-minute cover",
        blurb:
          "Backup DJs available for bookings through last-minute gaps.",
      },
    ],
    detail: {
      eyebrow: "",
      title: "Music as part of the venue",
      blurb:
        "DJ is booked for your space, their brief is consistency — not shift to shift inconsistency, but a Thursday at your bar sounds like a Thursday. Dining noise level through to Thursday and Saturday after-dinner change.",
      image: `${HOSP}/Gradient.png`,
      alt: "Hospitality venue with DJ setup",
    },
    video: {
      eyebrow: "",
      title: "Terrace launch set",
      blurb:
        "Summer terrace opening, resident DJ set. This particular launch had customers talking about the vibe for weeks after.",
      image: `${HOSP}/Gradient (1).png`,
      alt: "DJ performing at a terrace venue",
    },
    flyers: [
      { src: `${HOSP}/Rectangle 13.png`, alt: "Bar residency event flyer" },
      { src: `${HOSP}/Rectangle 20.png`, alt: "Hotel hospitality event flyer" },
      { src: `${HOSP}/Rectangle 21.png`, alt: "Restaurant DJ residency flyer" },
      { src: `${HOSP}/Rectangle 22.png`, alt: "Hospitality venue event flyer" },
    ],
    faqs: [
      {
        q: "Do you offer residencies?",
        a: "Yes — weekly, monthly, or as-needed. Same DJ builds the vibe your venue needs.",
      },
      {
        q: "Can you handle one-off bookings too?",
        a: "Absolutely. Single nights or fill-in cover for holidays and gaps.",
      },
      {
        q: "How late a night do you cover?",
        a: "As late as your licence allows. Residency or one-off, we're here for the whole service.",
      },
    ],
  },
];

export const getEventDetail = (slug: string) =>
  eventDetails.find((d) => d.slug === slug);

/** Slugs that have a hand-built page, so the dynamic route skips them. */
export const detailSlugs = eventDetails.map((d) => d.slug);
