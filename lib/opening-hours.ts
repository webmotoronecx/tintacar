// Turns the free-text store hours ("7.30am – 5pm", "07:30 – 16:00") into schema.org opening hours

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME = /^(\d{1,2})(?:[:.](\d{2}))?\s*(am|pm)?$/i;

export type HoursRange = { opens: string; closes: string };

export type OpeningHoursSpecification = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string;
  opens: string;
  closes: string;
};

/** Minutes after midnight, or null when the text isn't a time; times without am/pm are read as 24-hour */
function toMinutes(text: string): number | null {
  const match = text.trim().match(TIME);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = match[2] ? Number(match[2]) : 0;
  const meridiem = match[3]?.toLowerCase();
  if (hours > 23 || minutes > 59 || (meridiem && (hours < 1 || hours > 12))) return null;
  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function format(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

/** Regular trading hours only: appointment-only, closed and unreadable entries return null */
export function parseHoursRange(text: string): HoursRange | null {
  if (/appointment|closed/i.test(text)) return null;
  const parts = text.split(/\s*[–—-]\s*/);
  if (parts.length !== 2) return null;
  const opens = toMinutes(parts[0]);
  const closes = toMinutes(parts[1]);
  if (opens === null || closes === null || closes <= opens) return null;
  return { opens: format(opens), closes: format(closes) };
}

export function openingHoursSpecification(hours: { day: string; hours: string }[]): OpeningHoursSpecification[] {
  return hours.flatMap(({ day, hours: text }) => {
    const range = DAYS.includes(day) ? parseHoursRange(text) : null;
    return range ? [{ "@type": "OpeningHoursSpecification" as const, dayOfWeek: `https://schema.org/${day}`, ...range }] : [];
  });
}
