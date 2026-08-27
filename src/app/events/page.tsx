import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import EventTypes from "@/components/events/EventTypes";
import Assurances from "@/components/events/Assurances";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Events — Book My DJ",
  description:
    "Book My Dj supplies the right DJ for the room you're actually running. Matched to your event type, your crowd, and your brief.",
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <EventTypes />
      <Assurances />
      <CtaBanner />
    </>
  );
}
