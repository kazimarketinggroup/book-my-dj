import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Book My DJ",
  description: "How Book My DJ collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="August 2026"
      intro="This policy explains what information Book My DJ collects when you enquire or book, why we collect it, and what we do with it."
      sections={[
        {
          heading: "What We Collect",
          body: [
            "When you submit an enquiry we collect the details you give us: your name, phone number, email address, and the specifics of your event — date, location, event type, and any brief you share.",
            "We do not collect payment details through this website.",
          ],
        },
        {
          heading: "How We Use It",
          body: [
            "We use your details to respond to your enquiry, match you with a suitable DJ, and manage your booking. If you opt in, we may also send occasional updates about offers and events.",
            "We do not sell your information to third parties.",
          ],
        },
        {
          heading: "Sharing",
          body: [
            "We share only what a DJ needs to deliver your event — typically the venue, timings, and brief. Suppliers we work with are expected to handle that information with the same care.",
          ],
        },
        {
          heading: "Your Rights",
          body: [
            "You can ask us what we hold about you, request corrections, or ask us to delete it. Contact us and we'll action the request.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "Questions about this policy can be sent to the email address listed on our contact page.",
          ],
        },
      ]}
    />
  );
}
