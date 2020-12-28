const { gitDescribe } = require("git-describe");

const API_URL = process.env.NEXT_API_URL;

module.exports = {
  rewrites: async () => [
    {
      source: "/api/:slug",
      destination: `${API_URL}/:slug`,
      basePath: false,
    },
  ],
  generateBuildId: async () => {
    const { raw } = await gitDescribe(__dirname);
    return raw;
  },
};
