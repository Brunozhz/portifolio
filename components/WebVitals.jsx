"use client";

import { useReportWebVitals } from "next/web-vitals";
import { reportWebVital } from "@/lib/observability";

export default function WebVitals() {
  useReportWebVitals(reportWebVital);
  return null;
}
