// Eleventy configuration for the LSR website.
// Input:  src/        (templates + Markdown content)
// Output: _site/      (built by GitHub Actions; never commit it)
const path = require("node:path");

module.exports = function (eleventyConfig) {
  // Copy the assets folder (css, images) straight into the built site.
  eleventyConfig.addPassthroughCopy("assets");

  // The "news" collection: every .md file in src/news/, newest first.
  // The home page renders these as the "Latest news" cards.
  // (Skip template files whose names start with an underscore, e.g. _template.md.)
  eleventyConfig.addCollection("news", (collection) =>
    collection
      .getFilteredByGlob("src/news/*.md")
      .filter((t) => !path.basename(t.inputPath).startsWith("_"))
      .sort((a, b) => (b.data.date > a.data.date ? 1 : -1))
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    // Let .html templates use Nunjucks ({% extends %}, {% for %}, ...).
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
