import type { Metadata } from "next";
import PastGigsIntro from "@/components/past-gigs/PastGigsIntro";
import GigBrowser from "@/components/past-gigs/GigBrowser";
import LatestMixes from "@/components/home/LatestMixes";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Past Gigs — Book My DJ",
  description:
    "From 500-guest product launches to festival stages and black-tie galas — the events we've delivered and the dancefloors we filled.",
};

export default function PastGigsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PastGigsIntro />
      <GigBrowser />
      <LatestMixes />
      <CtaBanner />
    </main>
  );
}
