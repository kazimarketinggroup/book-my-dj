import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetailPage from "@/components/event-detail/EventDetailPage";
import { getEventDetail } from "@/lib/event-detail-data";

const detail = getEventDetail("special-occasions");

export const metadata: Metadata = {
  title: detail?.metaTitle ?? "Special Occasions — Book My DJ",
  description: detail?.metaDescription,
};

export default function SpecialOccasionsPage() {
  if (!detail) notFound();
  return <EventDetailPage detail={detail} />;
}
