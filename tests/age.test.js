import { describe, expect, it } from "vitest";
import { calculateAge } from "@/lib/age";

describe("calculateAge", () => {
  it("keeps the previous age before July 13", () => {
    expect(calculateAge(new Date(2026, 6, 12))).toBe(21);
  });

  it("updates the age on July 13", () => {
    expect(calculateAge(new Date(2026, 6, 13))).toBe(22);
  });

  it("keeps the updated age after the birthday", () => {
    expect(calculateAge(new Date(2026, 11, 31))).toBe(22);
  });
});
