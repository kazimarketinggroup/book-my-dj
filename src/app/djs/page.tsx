import type { Metadata } from "next";
import DjsHero from "@/components/djs/DjsHero";
import DjsFounders from "@/components/djs/DjsFounders";
import DjsRosterGrid from "@/components/djs/DjsRosterGrid";
import DjsBrands from "@/components/djs/DjsBrands";
import EventsWeCover from "@/components/home/EventsWeCover";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "List of DJs — Book My DJ",
  description:
    "One roster, every sound you need. Discover 15 resident and touring DJs across London, the Midlands and the North.",
};

export default function DjsPage() {
  return (
    <div className="flex flex-col bg-background text-foreground transition-colors duration-200">
      <DjsHero />
      <DjsFounders />
      <DjsRosterGrid />
      <DjsBrands />
      <EventsWeCover />
      <CtaBanner />
    </div>
  );
}
