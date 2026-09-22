import { expect, test } from "@playwright/test";

test("presents Bruno's work without narrowing his positioning", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "I work where business operations become software." })).toBeVisible();
  await expect(page.getByText(/years old/).first()).toBeVisible();

  const languageButton = page.getByRole("button", { name: /EN/ });
  if (!(await languageButton.isVisible())) {
    await page.getByRole("button", { name: /open navigation/i }).click();
  }
  await languageButton.click();
  await page.getByRole("option", { name: "Português" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Eu trabalho onde a operação vira software." })).toBeVisible();
});

test("keeps the main sections accessible and prevents horizontal overflow", async ({ page }) => {
  await page.goto("/");

  for (const id of ["system-map", "story", "work", "technologies", "contact"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.getByText("A system opens one layer at a time.")).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("supports reduced motion without hiding content", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#work")).toBeAttached();
  await context.close();
});
