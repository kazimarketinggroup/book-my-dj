import type { EventIcon as Name } from "@/lib/events-data";

/**
 * Line icons drawn with currentColor so they work in both themes and over the
 * expanded row's photo background.
 */
export default function EventIcon({ name }: { name: Name }) {
  const p = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-6 w-6",
  } as const;

  switch (name) {
    case "corporate":
      // Code brackets — matches the design's first row mark
      return (
        <svg {...p}>
          <path d="M9 8 5 12l4 4M15 8l4 4-4 4" />
        </svg>
      );
    case "pr":
      return (
        <svg {...p}>
          <path d="M3 21h18M5 21V9l7-5 7 5v12" />
          <path d="M9 21v-5h6v5" />
        </svg>
      );
    case "festival":
      return (
        <svg {...p}>
          <circle cx="7" cy="17" r="2.5" />
          <circle cx="17" cy="7" r="2.5" />
          <path d="M9.5 16V8l5-2" />
        </svg>
      );
    case "live":
      return (
        <svg {...p}>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
      );
    case "private":
      return (
        <svg {...p}>
          <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" />
          <path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z" />
        </svg>
      );
    case "special":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "mobile":
    default:
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}
