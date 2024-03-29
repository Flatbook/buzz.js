import { getDefaultSchema, loadSchemaFile } from "../src";

describe("DefaultSchema", () => {
  it("is null by default", () => {
    expect(getDefaultSchema()).toBeNull();
  });
});

describe("loadSchemaFile", () => {
  it("sets DefaultSchema", () => {
    loadSchemaFile("./fixtures/test.graphql");

    expect(getDefaultSchema()).not.toBeNull();
  });
});
