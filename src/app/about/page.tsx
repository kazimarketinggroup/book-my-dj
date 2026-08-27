import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import StorySection from "@/components/about/StorySection";
import TeamSection from "@/components/about/TeamSection";
import Pillars from "@/components/about/Pillars";
import EventsWeCover from "@/components/home/EventsWeCover";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { faqs } from "@/lib/about-data";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "About — Book My DJ",
  description:
    "Book My Dj was founded on a simple premise: events don't need a mobile disco, they need a DJ who understands the room.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <TeamSection />
      <Pillars />
      <EventsWeCover />
      <FaqAccordion heading="Frequently asked questions" items={faqs} />
      <CtaBanner />
    </>
  );
}
