const API_URL = process.env.NEXT_API_URL;

module.exports = {
  rewrites: async () => [
    {
      source: "/api/:slug",
      destination: `${API_URL}/:slug`,
      basePath: false,
    },
  ],
};
