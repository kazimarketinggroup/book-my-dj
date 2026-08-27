import type { EventDetail } from "@/lib/event-detail-data";
import DetailHero from "@/components/event-detail/DetailHero";
import DetailPromises from "@/components/event-detail/DetailPromises";
import DetailShowcase from "@/components/event-detail/DetailShowcase";
import DetailFlyers from "@/components/event-detail/DetailFlyers";
import OtherEvents from "@/components/event-detail/OtherEvents";
import LatestMixes from "@/components/home/LatestMixes";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CtaBanner from "@/components/home/CtaBanner";

/** Shared layout for every hand-built event detail page. */
export default function EventDetailPage({ detail }: { detail: EventDetail }) {
  return (
    <>
      <DetailHero detail={detail} />
      <DetailPromises detail={detail} />
      <DetailShowcase detail={detail} />
      <LatestMixes />
      <DetailFlyers detail={detail} />
      <FaqAccordion
        id={`${detail.slug}-faq`}
        heading={
          <>
            Frequently asked
            <br />
            questions
          </>
        }
        items={detail.faqs}
      />
      <OtherEvents current={detail.title} />
      <CtaBanner />
    </>
  );
}
