export const MIN_LEAD_MINUTES = 120;

/** Earliest deliverable moment, rounded up to the next 5-minute mark. */
export function getMinDeliveryDate(): Date {
  const date = new Date(Date.now() + MIN_LEAD_MINUTES * 60 * 1000);
  const remainder = date.getMinutes() % 5;
  if (remainder !== 0) {
    date.setMinutes(date.getMinutes() + (5 - remainder));
  }
  date.setSeconds(0, 0);
  return date;
}

/** Formats a Date as the value a <input type="datetime-local"> expects/accepts. */
export function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function isDeliveryTimeValid(value: string): boolean {
  if (!value) return false;
  const selected = new Date(value);
  if (Number.isNaN(selected.getTime())) return false;
  return selected.getTime() >= getMinDeliveryDate().getTime();
}

export function formatDeliveryTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}
