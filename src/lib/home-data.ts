export const IMG = "/images/home";

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/last-minute-dj", label: "Last Minute DJ" },
  { href: "/past-gigs", label: "Past Gigs" },
  { href: "/djs", label: "List of DJs" },
  { href: "/areas-we-cover", label: "Areas We Cover" },
  { href: "/contact", label: "Contact" },
];

export type HeroCard = {
  src: string;
  video: string;
  alt: string;
  title: string;
  caption: string;
};

/** Floating cards layered over the hero crowd shot. */
export const heroCards: HeroCard[] = [
  {
    src: `${IMG}/Rectangle 4.png`, // DJ laughing behind the booth
    video:
      "/videos/hero/AQPFNSRT0OZfcBi62RtPx-Jt38T7j8V1embRpba7Wftjgkf1L_IbhJGf9r8TifovwGHCPMBWB6SUSpZQ6KGd-M3InzM4aEQqiWOG3x0.mp4",
    alt: "DJ laughing behind the booth",
    title: "Corporate Event DJ",
    caption: "Covering events across the UK",
  },
  {
    src: `${IMG}/Rectangle 1.png`, // DJ in black shirt mixing
    video:
      "/videos/hero/AQM3bIrQZaO1T7yFVoPs6z7y1Lez2qC6ky8kKWSVun0QeR8J1Uyla_iCl9x_Eshc7MsiPNBLtPMvo222cijQo_qb.mp4",
    alt: "DJ mixing with headphones on",
    title: "Every Occasion",
    caption: "Weddings to corporate, covered",
  },
  {
    src: `${IMG}/Rectangle 2.png`, // DJ in white shirt playing Pioneer decks
    video:
      "/videos/hero/AQPm3U6d_HGDndVLlQTqNO9K1wpDZKvbDwORIPJtLLX0IHZN_znUgKc4B-C1mVPEzwv0rKRP25E4Y2ECJ5oR8gg.mp4",
    alt: "DJ playing on Pioneer decks outdoors",
    title: "Pro Sound & Lighting",
    caption: "Industry grade kit, every time",
  },
  {
    src: `${IMG}/Rectangle 3.png`, // DJ with blue headphones at laptop/gear
    video:
      "/videos/hero/AQMS9Zr3SGYAuhBeI7bcrAganxtwoY19wlVocSI-YDuqRqUuEilJb5TPtNQMKOWgBHoCJKXNLPthQ2SxmqWelrsdt_ZMktEaVi35vwU.mp4",
    alt: "DJ performing at an event",
    title: "Last Minute Booking",
    caption: "A DJ on call when you need one",
  },
];

export type Gig = {
  title: string;
  /** Short line shown in the selectable list on the right. */
  blurb: string;
  /** Longer copy shown in the featured panel when this gig is selected. */
  detail: string;
  image: string;
  alt: string;
  video: string;
};

export const gigs: Gig[] = [
  {
    title: "Gym King PR Event",
    blurb: "Two days, three sets, zero dead air.",
    detail:
      "500 guests, one brief, zero room for error, we built a set that moved effortlessly from mingling music to a packed dancefloor by 8pm and held it there until close.",
    image: `${IMG}/Rectangle 13.png`,
    alt: "DJ performing at the Gym King PR event",
    video: "/videos/Gym king pr event.mp4",
  },
  {
    title: "PR Product Launch, London",
    blurb: "Brand-brief playlist that kept press and guests hooked.",
    detail:
      "A launch night where the music had to carry the brand without drowning the conversation. We built the room slowly, held the press through the speeches, and turned it into a party the moment the formalities ended.",
    image: `${IMG}/Rectangle 15.png`,
    alt: "Two DJs playing at a London product launch",
    video: "/videos/pr product launch london.mp4",
  },
  {
    title: "Regional Music Festival, Leeds",
    blurb: "Back-to-back sets across two stages, all weekend.",
    detail:
      "Two stages, one weekend, and a crowd that never thinned out. Back-to-back sets timed around the headline acts, reading each room and keeping the energy up from first gates to final call.",
    image: `${IMG}/Rectangle 15 (1).png`,
    alt: "DJ playing a set at a regional music festival",
    video: "/videos/Reggional music festival.mp4",
  },
];

export type Dj = {
  name: string;
  role: string;
  image: string;
  alt: string;
  /** Profile page for this DJ. */
  href: string;
};

export const djs: Dj[] = [
  {
    name: "Don",
    role: "Co Founder",
    image: `${IMG}/Rectangle 17.png`,
    alt: "Don, co founder of Book My DJ",
    href: "/djs/don",
  },
  {
    name: "Luke Smith",
    role: "Co Founder",
    image: `${IMG}/Rectangle 18.png`,
    alt: "Luke Smith, co founder of Book My DJ",
    href: "/djs/luke",
  },
];

export type EventCategory = {
  title: string;
  blurb: string;
  image: string;
  alt: string;
  href: string;
};

export const eventCategories: EventCategory[] = [
  {
    title: "Corporate Events",
    blurb: "Sharp sets that fit the brand and the boardroom.",
    image: `${IMG}/11033 1.png`,
    alt: "Crowd with hands raised under stage lighting",
    href: "/events/corporate-events",
  },
  {
    title: "PR Events",
    blurb: "Music that matches the moment and holds the room.",
    image: `${IMG}/aerial-view-of-shipping-yard-and-freeway-2026-03-25-00-51-33-utc 1.png`,
    alt: "Crowd dancing in front of a lit stage",
    href: "/events/pr-events",
  },
  {
    title: "Music Festivals",
    blurb: "Back-to-back sets built for big crowds and long days.",
    image: `${IMG}/business-team-collaborating-on-a-tablet-outdoors-2026-01-09-01-10-21-utc 1.png`,
    alt: "DJ facing a festival crowd with smoke jets",
    href: "/events/music-festivals",
  },
  {
    title: "Live Events",
    blurb: "Seamless energy from walk-in to headline act.",
    image: `${IMG}/woman-choosing-groceries-in-supermarket-2026-03-20-03-29-01-utc 1.png`,
    alt: "Audience filming a live show on a phone",
    href: "/events/live-events",
  },
  {
    title: "Hospitality",
    blurb: "The right tempo for dinner, drinks, and everything after.",
    image: `${IMG}/woman-choosing-groceries-in-supermarket-2026-03-20-03-29-01-utc 1 (1).png`,
    alt: "DJ playing at a hospitality venue",
    href: "/events/hospitality",
  },
  {
    title: "Private Events",
    blurb: "Personal playlists for parties that matter most.",
    image: `${IMG}/woman-choosing-groceries-in-supermarket-2026-03-20-03-29-01-utc 1 (2).png`,
    alt: "DJ performing at a private party",
    href: "/events/private-events",
  },
  {
    title: "Special Occasions",
    blurb: "Milestones deserve a set built just for them.",
    image: `${IMG}/woman-choosing-groceries-in-supermarket-2026-03-20-03-29-01-utc 1 (3).png`,
    alt: "DJ wearing headphones at a celebration",
    href: "/events/special-occasions",
  },
  {
    title: "Mobile Disco",
    blurb: "Full rig, full lights, anywhere you need it.",
    image: `${IMG}/woman-choosing-groceries-in-supermarket-2026-03-20-03-29-01-utc 1 (4).png`,
    alt: "Mobile disco setup with pink lighting",
    href: "/events/mobile-disco",
  },
];

export const djSmileySoundCloudUrl = "https://soundcloud.com/d-jsmiley";
export const djLukeLuizMixcloudUrl = "https://www.mixcloud.com/DJLUKELUIZ/";

export type Mix = {
  artist: string;
  title: string;
  duration: string;
  cover: string;
  alt: string;
  soundCloudUrl?: string;
  soundCloudTrackId?: string;
  mixcloudUrl?: string;
  mixcloudKey?: string;
  genre?: string;
};

export const mixes: Mix[] = [
  {
    artist: "DJ Smiley",
    title: "Tree House Promo Mix | Vocal House | Chilled | Anthems | Classics",
    duration: "2:28:15",
    cover: `${IMG}/Rectangle 25.png`,
    alt: "Treehouse cocktail and champagne bar mix artwork",
    soundCloudUrl: "https://soundcloud.com/d-jsmiley/tree-house-promo-mix-vocal-house-chilled-anthems-classics",
    soundCloudTrackId: "882721030",
    genre: "House",
  },
  {
    artist: "DJ Smiley",
    title: "SMILEY SERIES HOUSE",
    duration: "55:08",
    cover: `${IMG}/smiley-series-house.jpg`,
    alt: "Smiley Series House mix artwork",
    soundCloudUrl: "https://soundcloud.com/d-jsmiley/smiley-series-house",
    soundCloudTrackId: "819234445",
    genre: "House",
  },
  {
    artist: "DJ Smiley",
    title: "Reagge Mix Tribute To My Grandad 1926-2020",
    duration: "36:12",
    cover: `${IMG}/Rectangle 26.png`,
    alt: "Tribute mix artwork for Noel Smile",
    soundCloudUrl: "https://soundcloud.com/d-jsmiley/reagge-mix-tribute-to-my-grandad-1926-2020",
    soundCloudTrackId: "805295890",
    genre: "Reggae",
  },
  {
    artist: "DJ Smiley",
    title: "LOCAL SUMMER TERRACE LAUNCH MIX by Resident - DJ Smiley",
    duration: "45:34",
    cover: `${IMG}/Rectangle 27.png`,
    alt: "Summer terrace launch mix artwork",
    soundCloudUrl: "https://soundcloud.com/d-jsmiley/local-summer-terrace-launch-mix-by-resident-dj-smiley",
    soundCloudTrackId: "437917458",
    genre: "House",
  },
  {
    artist: "DJ Smiley",
    title: "Local Promo Mix By Dj Smiley N Luke Luiz",
    duration: "55:27",
    cover: `${IMG}/smiley-n-luke.jpg`,
    alt: "Local Promo Mix by DJ Smiley & Luke Luiz",
    soundCloudUrl: "https://soundcloud.com/d-jsmiley/local-promo-mix-by-smiley-n-luke-luiz",
    soundCloudTrackId: "517668039",
    genre: "Open Format",
  },
];

export type FooterLink = { label: string; href: string };

export const footerColumns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Case Studies", href: "/past-gigs" },
      { label: "Resources", href: "/past-gigs" },
      { label: "Join Us", href: "/join-us" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Events",
    links: [
      { label: "Corporate Events", href: "/events/corporate-events" },
      { label: "PR Events", href: "/events/pr-events" },
      { label: "Music Festivals", href: "/events/music-festivals" },
      { label: "Live Events", href: "/events/live-events" },
      { label: "Hospitality", href: "/events/hospitality" },
    ],
  },
  {
    heading: "",
    links: [
      { label: "Private Events", href: "/events/private-events" },
      { label: "Special Occasions", href: "/events/special-occasions" },
      { label: "Mobile Disco", href: "/events/mobile-disco" },
      { label: "Last Minute DJ", href: "/last-minute-dj" },
      { label: "Others", href: "/events" },
    ],
  },
  {
    heading: "Get In Touch",
    links: [
      { label: "Get A Free Quote", href: "/contact" },
      { label: "WhatsApp Us", href: "/contact" },
      { label: "[Phone number]", href: "/contact" },
      { label: "[Email address]", href: "/contact" },
    ],
  },
];
