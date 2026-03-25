module.exports = function(eleventyConfig) {
    // Pass through static files using explicit source-to-target mapping
    // This ensures files in src/ subdirectories are properly copied to _site/
    eleventyConfig.addPassthroughCopy({"src/css": "css"});
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
