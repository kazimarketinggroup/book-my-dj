import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — Book My DJ",
  description: "The terms that apply to bookings made through Book My DJ.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="August 2026"
      intro="These terms apply to enquiries and bookings made through Book My DJ. They're written to be readable — if anything is unclear, ask us before you book."
      sections={[
        {
          heading: "Bookings",
          body: [
            "An enquiry is not a confirmed booking. A booking is confirmed once we've agreed the date, fee, and requirements with you in writing.",
            "We'll tell you upfront what's included — set length, sound, and lighting — before you commit.",
          ],
        },
        {
          heading: "Changes And Cancellations",
          body: [
            "If your plans change, tell us as early as you can and we'll do what we can to move the booking. Cancellation terms depend on how close to the date you cancel and are set out when we confirm.",
            "If a DJ becomes unavailable through no fault of yours, we cover the booking with an equivalent DJ at no extra cost.",
          ],
        },
        {
          heading: "On The Day",
          body: [
            "We need reasonable access to the venue for setup and a safe, powered space to work in. Delays caused by venue access outside our control may shorten the set.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "Our DJs carry appropriate insurance. We're not liable for losses outside our reasonable control, including venue closures or restrictions imposed on the day.",
          ],
        },
        {
          heading: "Questions",
          body: [
            "Anything you're unsure about, contact us before booking and we'll put it in writing.",
          ],
        },
      ]}
    />
  );
}
