module.exports = {
  preset: "ts-jest",
  testRegex: "(/test/.*|(\\.|/)(test))\\.(ts)?$",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "ts", "node"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
