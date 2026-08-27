import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DjProfilePage from "@/components/dj/DjProfilePage";
import { getDjProfile } from "@/lib/dj-data";

const dj = getDjProfile("don");

export const metadata: Metadata = {
  title: dj?.metaTitle,
  description: dj?.metaDescription,
};

export default function Page() {
  if (!dj) notFound();
  return <DjProfilePage dj={dj} />;
}
