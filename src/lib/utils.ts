/**
 * Join class names, dropping falsy values.
 * Useful for conditional Tailwind classes: cn("p-4", isActive && "bg-indigo-600")
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a date as e.g. "Aug 8, 2026". */
export function formatDate(date: Date | string): string {
  const value = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(value);
}
