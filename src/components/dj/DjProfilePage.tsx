import type { DjProfile } from "@/lib/dj-data";
import DjHero from "@/components/dj/DjHero";
import DjAbout from "@/components/dj/DjAbout";
import DjGenres from "@/components/dj/DjGenres";
import DjGallery from "@/components/dj/DjGallery";
import DjOccasions from "@/components/dj/DjOccasions";
import LatestMixes from "@/components/home/LatestMixes";
import EventsWeCover from "@/components/home/EventsWeCover";
import CtaBanner from "@/components/home/CtaBanner";

/** Shared layout for every DJ profile page. */
export default function DjProfilePage({ dj }: { dj: DjProfile }) {
  return (
    <>
      <DjHero dj={dj} />
      <DjAbout dj={dj} />
      <DjGenres dj={dj} />
      <DjGallery dj={dj} />
      <LatestMixes mixes={dj.mixes} />
      <DjOccasions dj={dj} />
      <EventsWeCover />
      <CtaBanner />
    </>
  );
}
