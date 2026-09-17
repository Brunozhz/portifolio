import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import LiveAge from "@/components/LiveAge";

describe("LiveAge", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders Bruno's current age from his birth date", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-16T12:00:00-03:00"));

    render(<LiveAge suffix="anos" />);

    expect(screen.getByText("22 anos")).toBeInTheDocument();
  });
});
