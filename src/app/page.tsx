import Hero from "@/components/home/Hero";
import PastGigs from "@/components/home/PastGigs";
import MeetTheDjs from "@/components/home/MeetTheDjs";
import EventsWeCover from "@/components/home/EventsWeCover";
import LatestMixes from "@/components/home/LatestMixes";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <PastGigs />
      <MeetTheDjs />
      <EventsWeCover />
      <LatestMixes />
      <CtaBanner />
    </>
  );
}
