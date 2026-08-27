import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetailPage from "@/components/event-detail/EventDetailPage";
import { getEventDetail } from "@/lib/event-detail-data";

const detail = getEventDetail("pr-events");

export const metadata: Metadata = {
  title: detail?.metaTitle ?? "PR Events — Book My DJ",
  description: detail?.metaDescription,
};

export default function PrEventsPage() {
  if (!detail) notFound();
  return <EventDetailPage detail={detail} />;
}
