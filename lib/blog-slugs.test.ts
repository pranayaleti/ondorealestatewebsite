/**
 * Asserts that every slug linked from the blog index page resolves to a valid route.
 * Prevents 404s: all BLOG_INDEX_SLUGS must exist in ALL_VALID_BLOG_SLUGS (dynamic POSTS or static dir).
 */
import { describe, it, expect } from "vitest";
import { ALL_VALID_BLOG_SLUGS, BLOG_INDEX_SLUGS } from "./blog-slugs";

describe("blog slugs", () => {
  it("every slug linked from the blog index has a valid route (no 404s)", () => {
    const missing = BLOG_INDEX_SLUGS.filter((slug) => !ALL_VALID_BLOG_SLUGS.has(slug));
    expect(
      missing,
      `Blog index links to slugs that do not resolve. Add them to [slug] POSTS or create app/blog/<slug>/page.tsx: ${missing.join(", ")}`
    ).toEqual([]);
  });
});
