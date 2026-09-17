import { describe, expect, it } from "vitest";
import { getPortfolioContent, languageOptions } from "@/lib/content";
import { getShowcaseContent } from "@/lib/showcaseI18n";
import { getStoryContent } from "@/lib/storyI18n";

const languageCodes = ["en", "fr", "pt", "it", "de"];

describe("portfolio content", () => {
  it("keeps every supported locale available", () => {
    expect(languageOptions.map((option) => option.code)).toEqual(languageCodes);
  });

  it.each(languageCodes)("has complete public content for %s", (locale) => {
    const core = getPortfolioContent(locale);
    const showcase = getShowcaseContent(locale);
    const story = getStoryContent(locale);

    expect(core.hero.headline).toBeTruthy();
    expect(core.header.navLinks).toHaveLength(4);
    expect(story.chapters).toHaveLength(6);
    expect(showcase.work.projects).toHaveLength(6);
  });

  it("preserves the portfolio positioning instead of narrowing it to sales systems", () => {
    expect(getPortfolioContent("pt").hero.headline).toBe("Eu trabalho onde a operação vira software.");
  });

  it("does not expose restricted names or VFX", () => {
    const publicContent = languageCodes.map((locale) => ({
      core: getPortfolioContent(locale),
      showcase: getShowcaseContent(locale),
      story: getStoryContent(locale)
    }));

    expect(JSON.stringify(publicContent)).not.toMatch(/frisajo|vfx/i);
  });
});
