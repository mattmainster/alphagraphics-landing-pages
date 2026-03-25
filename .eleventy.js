module.exports = function(eleventyConfig) {
      // Pass through static files using explicit source-to-target mapping
      // css/ is at project root (not in src/), so use root-relative path
      eleventyConfig.addPassthroughCopy({"css": "css"});
      // images/ and admin/ are inside src/, so use src/ prefix
      eleventyConfig.addPassthroughCopy({"src/images": "images"});
      eleventyConfig.addPassthroughCopy({"src/admin": "admin"});

      return {
              dir: {
                        input: "src",
                        output: "_site",
                        includes: "_includes",
                        data: "_data"
              }
      };
};
