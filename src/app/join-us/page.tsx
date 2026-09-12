import type { Metadata } from "next";
import JoinHero from "@/components/join/JoinHero";
import WhyJoin from "@/components/join/WhyJoin";
import HowItWorks from "@/components/join/HowItWorks";
import LookingFor from "@/components/join/LookingFor";
import ApplySection from "@/components/join/ApplySection";

export const metadata: Metadata = {
  title: "Join Us — DJ Roster Applications | Book My DJ",
  description:
    "Join the Book My DJ roster. Consistent bookings, fair pay within 7 days, kit when you need it, and contracts handled — so you can focus on the music.",
};

export default function JoinUsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <JoinHero />
      <WhyJoin />
      <HowItWorks />
      <LookingFor />
      <ApplySection />
    </main>
  );
}
