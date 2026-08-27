import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetailPage from "@/components/event-detail/EventDetailPage";
import { getEventDetail } from "@/lib/event-detail-data";

const detail = getEventDetail("mobile-disco");

export const metadata: Metadata = {
  title: detail?.metaTitle ?? "Mobile Disco — Book My DJ",
  description: detail?.metaDescription,
};

export default function MobileDiscoPage() {
  if (!detail) notFound();
  return <EventDetailPage detail={detail} />;
}
