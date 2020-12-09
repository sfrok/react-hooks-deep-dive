module.exports = {
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/jest/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest/__mocks__/fileMock.js",
  },
  testRegex: "/src/.*\\.test.(js|jsx)$",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  setupFiles: ["<rootDir>/jest/setupTests.js"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.(js|jsx)"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/build/",
    "/coverage/",
    "<rootDir>/src/index.js",
  ],
};
