import { beforeEach, describe, expect, it, vi } from "vitest";
import { METRIC_EVENT, reportClientError, reportWebVital } from "@/lib/observability";

describe("client observability", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("exposes web vitals to integrations without coupling the site to one vendor", () => {
    const listener = vi.fn();
    window.addEventListener(METRIC_EVENT, listener);

    reportWebVital({ id: "metric-1", name: "LCP", value: 1200, rating: "good", navigationType: "navigate" });

    expect(listener).toHaveBeenCalledOnce();
    expect(listener.mock.calls[0][0].detail).toMatchObject({ name: "LCP", value: 1200, rating: "good" });
    window.removeEventListener(METRIC_EVENT, listener);
  });

  it("does not fail when no external observability endpoint is configured", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => reportClientError(new Error("test"), { boundary: "test" })).not.toThrow();
  });
});
