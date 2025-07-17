module.exports = {
  preset: "ts-jest",
  testRegex: "(/test/.*|(\\.|/)(test))\\.(ts|tsx)?$",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "tsx", "node"],
  transform: {
    "^.+\\.ts?x$": "ts-jest",
  },
  setupFilesAfterEnv: [
    "./jest/clear-default-schema.ts",
    "@testing-library/jest-dom",
  ],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    "^react-native$": "react-native-web",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
