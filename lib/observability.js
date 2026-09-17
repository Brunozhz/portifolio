const METRIC_EVENT = "portfolio:web-vital";

function sendToConfiguredEndpoint(payload) {
  const endpoint = process.env.NEXT_PUBLIC_OBSERVABILITY_ENDPOINT;
  if (!endpoint || typeof navigator === "undefined" || typeof navigator.sendBeacon !== "function") return;

  navigator.sendBeacon(endpoint, JSON.stringify(payload));
}

export function reportWebVital(metric) {
  const detail = {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    navigationType: metric.navigationType,
    path: typeof window === "undefined" ? undefined : window.location.pathname,
    timestamp: Date.now()
  };

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(METRIC_EVENT, { detail }));
  }

  sendToConfiguredEndpoint({ type: "web-vital", ...detail });
}

export function reportClientError(error, context = {}) {
  const detail = {
    message: error instanceof Error ? error.message : String(error),
    digest: error?.digest,
    path: typeof window === "undefined" ? undefined : window.location.pathname,
    context,
    timestamp: Date.now()
  };

  sendToConfiguredEndpoint({ type: "client-error", ...detail });

  if (process.env.NODE_ENV !== "production") {
    console.error("[portfolio:error]", detail);
  }
}

export { METRIC_EVENT };
