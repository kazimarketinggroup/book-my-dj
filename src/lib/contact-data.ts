export const contactIntro = {
  title: "Let's Talk About Your Event",
  blurb:
    "Whether you're ready to book or just have a question, our team's on hand across the UK.",
};

export type ContactChannel = { title: string; blurb: string };

export const channels: ContactChannel[] = [
  { title: "Call Us", blurb: "Speak to the team directly - [phone number]" },
  { title: "WhatsApp Us", blurb: "Quick questions, quick answers - [WhatsApp link]" },
  { title: "Email Us", blurb: "For detailed briefs and enquiries - [email address]" },
  { title: "Address", blurb: "Registered Address" },
];

export const hurry = {
  title: "Need A DJ In A Hurry?",
  blurb: "Skip the form - check live availability instead.",
  cta: "Last Minute DJ Booking",
  href: "/last-minute-dj",
};

export const eventTypeOptions = [
  "Corporate Event",
  "PR Event",
  "Music Festival",
  "Live Event",
  "Private Event",
  "Special Occasion",
  "Mobile Disco",
  "Other",
];

export const consentOptions = [
  { name: "privacy", label: "I've read and agree to the Privacy Policy", required: true },
  { name: "updates", label: "Keep me updated on offers and events (optional)", required: false },
  { name: "urgent", label: "This is a last-minute or urgent booking", required: false },
];

/* ---------------------------------------------------------------------------
   Booking wizard
   Postcode intro, then one question per step, then a thank-you panel.
--------------------------------------------------------------------------- */

export const wizardIntro = {
  heading: "Where is your event?",
  blurb: "Start with your postcode and we will find DJs covering your area.",
  placeholder: "Your postcode",
  meta: "Takes 2-3 mins",
  cta: "Let’s Start",
};

/** Radio-group steps are driven by this shape; the date and details steps are bespoke. */
export type ChoiceStep = {
  /** Key the answer is stored under. */
  name: "eventType" | "guests" | "supplies" | "timeline" | "role";
  heading: string;
  blurb: string;
  options: string[];
};

export const choiceSteps: ChoiceStep[] = [
  {
    name: "eventType",
    heading: "What type of event is it?",
    blurb: "Pick the closest match.",
    options: [
      "Corporate",
      "PR Events",
      "Music Festivals",
      "Live Events",
      "Hospitality",
      "Private Events",
      "Special Occasions",
      "Mobile Disco",
      "Last Minute DJ",
      "Other",
    ],
  },
  {
    name: "guests",
    heading: "How many guests are you expecting?",
    blurb: "A rough number is fine.",
    options: ["Up to 50", "50 - 100", "100 - 200", "200 - 500", "500+"],
  },
  {
    name: "supplies",
    heading: "What do you need supplied?",
    blurb: "Tell us what the venue already has so we can quote accurately.",
    options: [
      "Full DJ, sound and lighting package",
      "DJ and sound only",
      "DJ only — venue supplies everything",
      "Not sure yet",
    ],
  },
  {
    name: "timeline",
    heading: "How soon are you looking to confirm a DJ?",
    blurb: "We just need a little more info based on your previous answers.",
    options: [
      "As soon as possible",
      "In the next few weeks",
      "In the next few months",
      "Not sure",
    ],
  },
  {
    name: "role",
    heading: "Which of these best describes your role?",
    blurb: "Please select one.",
    options: [
      "Office Coordinator",
      "Professional Event Planner",
      "Venue Manager",
      "Agency / Brand",
      "Other",
    ],
  },
];

export const dateStep = {
  heading: "When is your event taking place?",
  blurb: "If you are not sure, an approximate date is fine you can change it later.",
  labels: {
    date: "Date of event",
    start: "Estimated start",
    duration: "Duration (Hours)",
  },
  defaultDuration: "4",
};

export const detailsStep = {
  heading: "You're just one step away",
  blurb: "Last details and we are done.",
  reassurance: "We reply within 24 hours, sooner for urgent bookings",
  cta: "Book My DJ",
};

export const thanksStep = {
  /** Rendered as `Thank you, {firstName}`. */
  heading: "Thank you",
  cta: "Browse our DJs",
  href: "/djs/don",
};
