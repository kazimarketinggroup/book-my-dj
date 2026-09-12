import type { Metadata } from "next";
import LastMinuteHero from "@/components/last-minute/LastMinuteHero";
import RosterPanel from "@/components/last-minute/RosterPanel";
import BookingBar from "@/components/home/BookingBar";
import Testimonial from "@/components/last-minute/Testimonial";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CtaBanner from "@/components/home/CtaBanner";
import { lastMinuteFaqs } from "@/lib/last-minute-data";

export const metadata: Metadata = {
  title: "Last Minute DJ — Book My DJ",
  description:
    "DJ cancelled? We keep DJs on standby across the UK, ready to step in with full sound and lighting — often within hours.",
};

export default function LastMinuteDjPage() {
  return (
    <>
      <LastMinuteHero />
      <RosterPanel />
      <BookingBar buttonVariant="white" />
      <Testimonial />
      <FaqAccordion
        id="lm-faq"
        heading={
          <>
            Last Minute
            <br />
            Questions, Answered
          </>
        }
        items={lastMinuteFaqs}
      />
      <CtaBanner />
    </>
  );
}
