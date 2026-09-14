import { IMG } from "@/lib/home-data";

export const PG_IMG = "/images/pastgigs";

export const pastGigsHero = {
  title: ["Every Room Is Different.", "We've Played Most Of Them."],
  blurb:
    "From 500-guest product launches to festival stages and black-tie galas here's a look at the events we've delivered, the briefs we solved, and the dancefloors we filled.",
};

export const pastGigsQuote = {
  quote:
    "We booked Book My Dj for our summer social not knowing what to expect, and they read the room perfectly — the dancefloor didn't clear until we shut the bar.",
  image: `${PG_IMG}/Group 81.png`,
  video: "/videos/Reggional music festival.mp4",
  alt: "DJ playing to a packed crowd at a club night",
};

/** Filter buttons down the left of the gig list. */
export const gigCategories = [
  "All Gigs",
  "PR Events",
  "Music Festivals",
  "Live Events",
  "Private Events",
  "Special Occasions",
  "Mobile Disco",
] as const;

export type GigCategory = (typeof gigCategories)[number];

export type PastGig = {
  title: string;
  blurb: string;
  detail: string;
  image: string;
  video?: string;
  alt: string;
  category: Exclude<GigCategory, "All Gigs">;
};

export const pastGigs: PastGig[] = [
  {
    title: "Gym King PR Event",
    blurb: "Two days, three sets, zero dead air.",
    detail:
      "500 guests, one brief, zero room for error, we built a set that moved effortlessly from mingling music to a packed dancefloor by 8pm and held it there until close.",
    image: `${IMG}/Rectangle 13.png`,
    video: "/videos/Gym king pr event.mp4",
    alt: "DJ performing at the Gym King PR event",
    category: "PR Events",
  },
  {
    title: "PR Product Launch, London",
    blurb: "Brand-brief playlist that kept press and guests hooked.",
    detail:
      "A launch night where the music had to carry the brand without drowning the conversation. We built the room slowly, held the press through the speeches, and turned it into a party the moment the formalities ended.",
    image: `${IMG}/Rectangle 15.png`,
    video: "/videos/pr product launch london.mp4",
    alt: "Two DJs playing at a London product launch",
    category: "PR Events",
  },
  {
    title: "Regional Music Festival, Leeds",
    blurb: "Back-to-back sets across two stages, all weekend.",
    detail:
      "Two stages, one weekend, and a crowd that never thinned out. Back-to-back sets timed around the headline acts, reading each room and keeping the energy up from first gates to final call.",
    image: `${IMG}/Rectangle 15 (1).png`,
    video: "/videos/Reggional music festival.mp4",
    alt: "DJ playing a set at a regional music festival",
    category: "Music Festivals",
  },
  {
    title: "Summer Terrace Launch",
    blurb: "Golden-hour house that ran straight into the night.",
    detail:
      "An all-day terrace opening that had to work in daylight and after dark. We eased through afternoon house, lifted the tempo as the sun dropped, and closed on a full floor.",
    image: `${IMG}/Rectangle 17.png`,
    video: "/videos/Gym king pr event.mp4",
    alt: "DJ playing an outdoor terrace launch",
    category: "Live Events",
  },
  {
    title: "Private 40th, Manchester",
    blurb: "A guest list with very specific taste.",
    detail:
      "A milestone birthday where the playlist mattered as much as the venue. We worked from the family's own shortlist, bridged three decades of music, and kept every generation on the floor.",
    image: `${IMG}/Rectangle 18.png`,
    video: "/videos/pr product launch london.mp4",
    alt: "DJ performing at a private birthday party",
    category: "Private Events",
  },
  {
    title: "Black-Tie Awards Gala",
    blurb: "Dinner ambience, then a full room after the speeches.",
    detail:
      "Careful background music through a three-course dinner and awards, then a hard pivot into a dancefloor set the moment the last trophy was handed out.",
    image: `${IMG}/Rectangle 15.png`,
    video: "/videos/pr product launch london.mp4",
    alt: "DJ set up at a black-tie awards gala",
    category: "Special Occasions",
  },
  {
    title: "Village Hall Mobile Disco",
    blurb: "Full rig, small room, big night.",
    detail:
      "A rural booking with no in-house sound or lighting. We brought the complete rig, set it up around a tight stage area, and ran the night end to end.",
    image: `${IMG}/Rectangle 13.png`,
    video: "/videos/Gym king pr event.mp4",
    alt: "Mobile disco rig set up in a village hall",
    category: "Mobile Disco",
  },
];
