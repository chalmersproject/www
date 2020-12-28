module.exports = {
  client: {
    service: {
      name: "api",
      localSchemaFile: "./schema.json",
    },
    includes: ["**/*.{ts,tsx,js,jsx}"],
    excludes: [
      ".next/**",
      "**/node_modules/**",
      "**/__tests__/**",
      "**/__generated__/**",
    ],
  },
};
