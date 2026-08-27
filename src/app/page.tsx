import Hero from "@/components/home/Hero";
import EventMarquee from "@/components/home/EventMarquee";
import BookingBar from "@/components/home/BookingBar";
import PastGigs from "@/components/home/PastGigs";
import MeetTheDjs from "@/components/home/MeetTheDjs";
import EventsWeCover from "@/components/home/EventsWeCover";
import LatestMixes from "@/components/home/LatestMixes";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <EventMarquee />
      <BookingBar />
      <PastGigs />
      <MeetTheDjs />
      <EventsWeCover />
      <LatestMixes />
      <CtaBanner />
    </>
  );
}
