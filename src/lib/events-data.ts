export const EVENTS_IMG = "/images/events";

export const eventsHero = {
  title: ["For Events That Need", "A DJ Who Reads The Room"],
  blurb:
    "Book My Dj supplies the right DJ for the room you're actually running not a generic booking. Matched to your event type, your crowd, and your brief.",
  image: `${EVENTS_IMG}/hero.png`,
  alt: "DJ facing a festival crowd with smoke jets",
};

export type EventIcon =
  | "corporate"
  | "pr"
  | "festival"
  | "live"
  | "private"
  | "special"
  | "mobile";

export type EventRow = {
  /** Zero-padded index shown above the title. */
  no: string;
  title: string;
  headline: string;
  blurb: string;
  icon: EventIcon;
  /** Detail page this row's "Learn More" links to. */
  href: string;
};

export const eventRows: EventRow[] = [
  {
    no: "01",
    title: "Corporate Events",
    headline: "A crowd that needs the tone right, not just the volume up.",
    blurb:
      "Sharp, on-brand sets for launches, socials, and end-of-year parties built around your audience, not a generic playlist.",
    icon: "corporate",
    href: "/events/corporate-events",
  },
  {
    no: "02",
    title: "PR Events",
    headline: "Music that supports the moment without overpowering it.",
    blurb:
      "We match tempo and tone to the room, keeping press and guests engaged from arrival to close.",
    icon: "pr",
    href: "/events/pr-events",
  },
  {
    no: "03",
    title: "Music Festivals",
    headline: "Long days, big crowds, zero dead air.",
    blurb:
      "Back-to-back sets built to hold energy across stages and hours, not just one hour slots.",
    icon: "festival",
    href: "/events/music-festivals",
  },
  {
    no: "04",
    title: "Live Events",
    headline: "The right tempo for dinner, drinks, and everything after.",
    blurb:
      "Sets that shift with the evening — background at dinner, full energy once the night moves on.",
    icon: "live",
    href: "/events/live-events",
  },
  {
    no: "05",
    title: "Private Events",
    headline: "A playlist that actually sounds like you.",
    blurb:
      "Personal sets built around your taste and your guest list, for the parties that matter most.",
    icon: "private",
    href: "/events/private-events",
  },
  {
    no: "06",
    title: "Special Occasions",
    headline: "A milestone that deserves more than a Spotify playlist.",
    blurb:
      "Birthdays, anniversaries, and celebrations — soundtracked properly, start to finish.",
    icon: "special",
    href: "/events/special-occasions",
  },
  {
    no: "07",
    title: "Mobile Disco",
    headline: "Full rig, full lights, anywhere you need it.",
    blurb:
      "Complete sound and lighting setup that travels — no venue too small or too far.",
    icon: "mobile",
    href: "/events/mobile-disco",
  },
];

export const assuranceHeading = [
  "Events Managers Rely On Book My Dj To",
  "Plan, Power, And Deliver Every Event.",
];

export type Assurance = { title: string; blurb: string };

export const assurances: Assurance[] = [
  {
    title: "Plan Every Set Before It Runs.",
    blurb:
      "We map the brief, the crowd, and the flow of your event before the DJ ever picks up a mic, so nothing's guessed on the night.",
  },
  {
    title: "Power The Room With The Right DJ.",
    blurb:
      "Our roster is matched to event type, not availability the right sound for your crowd, every time.",
  },
  {
    title: "Prove It With A Track Record.",
    blurb:
      "See exactly how our DJs have performed at events like yours, with real case studies, not just reviews.",
  },
];
