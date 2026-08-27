import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetailPage from "@/components/event-detail/EventDetailPage";
import { getEventDetail } from "@/lib/event-detail-data";

const detail = getEventDetail("music-festivals");

export const metadata: Metadata = {
  title: detail?.metaTitle ?? "Music Festivals — Book My DJ",
  description: detail?.metaDescription,
};

export default function MusicFestivalsPage() {
  if (!detail) notFound();
  return <EventDetailPage detail={detail} />;
}
