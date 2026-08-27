import type { Metadata } from "next";
import { Chivo, Great_Vibes, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { themeInitScript } from "@/components/ThemeToggle";
import "./globals.css";

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Handwritten signature face for the team / DJ names.
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Book My DJ — DJs For Every Occasion, Nationwide",
  description:
    "From weddings to boardrooms, festivals to black-tie galas. Trusted by events managers and planners across the UK.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${chivo.variable} ${inter.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <head>
        <script
          // Sets data-theme before first paint to avoid a flash of the wrong theme.
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
