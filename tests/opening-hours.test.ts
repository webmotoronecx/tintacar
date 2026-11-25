import { describe, expect, test } from "vitest";
import { openingHoursSpecification, parseHoursRange } from "@/lib/opening-hours";

describe("parseHoursRange", () => {
  test("reads the time formats used in the store data", () => {
    expect(parseHoursRange("8am – 5pm")).toEqual({ opens: "08:00", closes: "17:00" });
    expect(parseHoursRange("7.30am – 1pm")).toEqual({ opens: "07:30", closes: "13:00" });
    expect(parseHoursRange("6:30am – 6:00 pm")).toEqual({ opens: "06:30", closes: "18:00" });
    expect(parseHoursRange("07:30 – 16:00")).toEqual({ opens: "07:30", closes: "16:00" });
    expect(parseHoursRange("8am – 12")).toEqual({ opens: "08:00", closes: "12:00" });
    expect(parseHoursRange("8am – 12pm")).toEqual({ opens: "08:00", closes: "12:00" });
  });

  test("skips appointment-only, closed and unreadable entries", () => {
    expect(parseHoursRange("By Appointment")).toBeNull();
    expect(parseHoursRange("8am – 12pm (by appointment)")).toBeNull();
    expect(parseHoursRange("closed")).toBeNull();
    expect(parseHoursRange("9am")).toBeNull();
    expect(parseHoursRange("5pm – 9am")).toBeNull();
  });
});

describe("openingHoursSpecification", () => {
  test("builds schema.org entries for regular trading days only", () => {
    const spec = openingHoursSpecification([
      { day: "Monday", hours: "6:30am – 6:30pm" },
      { day: "Saturday", hours: "By Appointment" },
    ]);
    expect(spec).toEqual([{ "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/Monday", opens: "06:30", closes: "18:30" }]);
  });

  test("ignores unknown day names", () => {
    expect(openingHoursSpecification([{ day: "Weekdays", hours: "8am – 5pm" }])).toEqual([]);
  });
});
