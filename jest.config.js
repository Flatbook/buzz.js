module.exports = {
  preset: "ts-jest",
  testRegex: "(/test/.*|(\\.|/)(test))\\.(ts|tsx)?$",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "ts", "tsx", "node"],
  transform: {
    "^.+\\.ts?x$": "ts-jest",
  },
  setupFilesAfterEnv: ["./jest/clear-default-schema.ts"],
  testEnvironment: "jsdom",
};
