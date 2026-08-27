import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetailPage from "@/components/event-detail/EventDetailPage";
import { getEventDetail } from "@/lib/event-detail-data";

const detail = getEventDetail("live-events");

export const metadata: Metadata = {
  title: detail?.metaTitle ?? "Live Events — Book My DJ",
  description: detail?.metaDescription,
};

export default function LiveEventsPage() {
  if (!detail) notFound();
  return <EventDetailPage detail={detail} />;
}
