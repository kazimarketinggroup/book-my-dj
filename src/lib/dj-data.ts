/**
 * Profile pages for the two founders. Both use the same layout
 * (components/dj/DjProfilePage), so a new DJ is data-only.
 */

export type SocialLink = { label: string; href: string };
export type DjMix = {
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
export type Credential = { title: string; items: string };
export type Occasion = string;

export type DjProfile = {
  slug: string;
  /** Handwritten-style signature above the headline. */
  signature: string;
  name: string;
  headline: string[];
  intro: string;
  hero: { image: string; alt: string };
  socials: SocialLink[];
  about: { paragraphs: string[]; image: string; alt: string };
  genres: string[];
  credentials: Credential[];
  gallery: { src: string; alt: string }[];
  occasions: Occasion[];
  occasionBlurb: string;
  /** Falls back to the shared homepage mixes when omitted. */
  mixes?: DjMix[];
  metaTitle: string;
  metaDescription: string;
};

const DON = "/images/don";
const LUKE = "/images/luke";

const SHARED_GENRES = [
  "Old School R&B",
  "Drum & Bass",
  "House",
  "Afrobeats",
  "Soul",
  "R&B",
  "Grime",
  "Trap",
  "Amapiano",
  "Hip-Hop",
  "Bashment",
  "Dancehall",
  "Reggae",
  "Commercial",
];

const SHARED_OCCASIONS = [
  "Club Nights",
  "Festivals",
  "Corporate Events",
  "Brand Activations",
  "Private Parties",
  "Weddings",
  "International Bookings",
  "VIP & Celebrity Events",
];

const SHARED_SOCIALS: SocialLink[] = [
  { label: "SoundCloud", href: "https://soundcloud.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Mixcloud", href: "https://mixcloud.com" },
];

export const djProfiles: DjProfile[] = [
  {
    slug: "don",
    signature: "Don Smile",
    name: "Don",
    headline: [
      "International",
      "multi-genre DJ with",
      "14+ years on the floor.",
    ],
    intro:
      "From Ibiza residencies to VIP parties and brand activations a set built for the crowd in front of him.",
    hero: { image: `${DON}/11033 1.png`, alt: "Don outside a Boujiee Brunch taxi" },
    socials: [
      { label: "SoundCloud", href: "https://soundcloud.com/d-jsmiley" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Mixcloud", href: "https://mixcloud.com" },
    ],
    about: {
      paragraphs: [
        "With over 14 years of experience, Don is an international multi-genre DJ dedicated to creating unforgettable experiences on the dancefloor. Whether it's a nightclub, festival, private event, brand activation, or exclusive VIP party, he brings the same energy: read the room, build the moment, deliver the night.",
        "Although he's versatile across a wide range of genres, his true passion lies in Old School R&B and Drum & Bass. His sets also include House, Afrobeats, Soul, R&B, Grime, Trap, Amapiano, Hip-Hop, Bashment, Dancehall, Reggae and commercial favourites, allowing him to adapt to any crowd or occasion.",
        "His career has taken him across the globe, performing at renowned party destinations including Ibiza, Ayia Napa, and Morocco, bringing high-energy performances to audiences both in the UK and internationally.",
      ],
      image: `${DON}/Group 162.png`,
      alt: "Don performing behind the decks in a waistcoat",
    },
    genres: SHARED_GENRES,
    credentials: [
      { title: "Global stages", items: "Ibiza · Ayia Napa · Morocco · UK" },
      {
        title: "Artists supported",
        items: "J Hus · Lotto Boyzz · Stefflon Don · Mist · Devilman · B Young · more",
      },
      {
        title: "Brand partners",
        items: "Gym King · Morphe · JD Sports · Foot Locker · Topshop · more",
      },
    ],
    gallery: [
      { src: `${DON}/Rectangle 39.png`, alt: "Don playing an outdoor set" },
      { src: `${DON}/Rectangle 40.png`, alt: "Don in sunglasses behind the booth" },
      { src: `${DON}/Rectangle 41.png`, alt: "Don mixing under blue light" },
      { src: `${DON}/Rectangle 42.png`, alt: "Don performing at a club night" },
    ],
    occasions: SHARED_OCCASIONS,
    occasionBlurb:
      "From private parties to headline festivals and international tours — every booking is built around the brief.",
    metaTitle: "Don — Book My DJ",
    metaDescription:
      "International multi-genre DJ with 14+ years on the floor. From Ibiza residencies to VIP parties and brand activations.",
  },
  {
    slug: "luke",
    signature: "Luke Luiz",
    name: "Luke Luiz",
    headline: ["Co-founder and", "multi-genre DJ built", "for every room."],
    intro:
      "From headline clubs to intimate private parties — Luke brings precision programming and crowd-first energy.",
    hero: { image: `${LUKE}/11033 1.png`, alt: "Luke Luiz behind the decks" },
    socials: [
      { label: "Mixcloud", href: "https://www.mixcloud.com/DJLUKELUIZ/" },
      { label: "Instagram", href: "https://www.instagram.com/Luke_Luiz/" },
    ],
    about: {
      paragraphs: [
        "Luke is a co-founder of Book My DJ and a seasoned multi-genre DJ with a reputation for reading the room and delivering the right set at the right time. He covers everything from warm-up sets to peak-time festival stages, always keeping the dancefloor as the priority.",
        "His musical range spans House, UK Garage, R&B, Hip-Hop, Dancehall, Afrobeats, Amapiano, Soul, Disco and timeless club classics. Whether the brief is a polished corporate set or a sweaty late-night floor, Luke builds the journey from the first record to the last. He's performed across the UK and internationally, including club residencies and private events, and has supported live shows and brand activations for major names and venues. He handles the details — from sound and run sheets to the moment the floor opens so the night feels effortless.",
      ],
      image: `${LUKE}/Group 162.png`,
      alt: "Luke Luiz mixing with headphones on",
    },
    genres: SHARED_GENRES,
    credentials: [
      { title: "Global stages", items: "UK · Europe" },
      {
        title: "Artists supported",
        items: "J Hus · Lotto Boyzz · Stefflon Don · Mist · Devilman · B Young · more",
      },
      {
        title: "Brand partners",
        items: "Gym King · Morphe · JD Sports · Foot Locker · Topshop · more",
      },
    ],
    gallery: [
      { src: `${LUKE}/Rectangle 39.png`, alt: "Luke Luiz at a Shine Together event" },
      { src: `${LUKE}/Rectangle 40.png`, alt: "Luke Luiz behind the booth" },
      { src: `${LUKE}/Rectangle 41.png`, alt: "Luke Luiz playing to a crowd" },
      { src: `${LUKE}/Rectangle 42.png`, alt: "Luke Luiz at a Gym King activation" },
    ],
    occasions: SHARED_OCCASIONS,
    occasionBlurb:
      "From private parties to headline festivals and international tours — every booking is built around the brief.",
    mixes: [
      {
        artist: "@DJLUKELUIZ",
        title: "THE JAMHOUSE SUNDAY FUNDAY PROMO MIX | 01.08.21",
        duration: "45:06",
        cover: `${LUKE}/Rectangle 25.png`,
        alt: "Jamhouse Sunday Funday promo mix artwork",
        mixcloudUrl: "https://www.mixcloud.com/DJLUKELUIZ/the-jamhouse-sunday-funday-promo-mix-010821/",
        mixcloudKey: "/DJLUKELUIZ/the-jamhouse-sunday-funday-promo-mix-010821/",
        genre: "R&B / Garage / Funky House",
      },
      {
        artist: "@DJLUKELUIZ",
        title: "#009 | THE SUMMER MIX 2020",
        duration: "57:01",
        cover: `${LUKE}/Rectangle 26.png`,
        alt: "The Summer Mix 2020 artwork",
        mixcloudUrl: "https://www.mixcloud.com/DJLUKELUIZ/009-summer-mix-2020/",
        mixcloudKey: "/DJLUKELUIZ/009-summer-mix-2020/",
        genre: "Summer / House / R&B",
      },
      {
        artist: "@DJLUKELUIZ",
        title: "#010 2021 MIX",
        duration: "42:43",
        cover: `${LUKE}/Rectangle 27.png`,
        alt: "2021 mix artwork",
        mixcloudUrl: "https://www.mixcloud.com/DJLUKELUIZ/010-2021-mix/",
        mixcloudKey: "/DJLUKELUIZ/010-2021-mix/",
        genre: "Hip-Hop / R&B / UK",
      },
    ],
    metaTitle: "Luke Luiz — Book My DJ",
    metaDescription:
      "Co-founder and multi-genre DJ built for every room. From headline clubs to intimate private parties.",
  },
];

export const getDjProfile = (slug: string) =>
  djProfiles.find((d) => d.slug === slug);
