export default {
  testRunner: "vitest",
  mutate: ["lib/age.js"],
  reporters: ["clear-text", "progress", "html"],
  thresholds: { high: 90, low: 70, break: 60 }
};
