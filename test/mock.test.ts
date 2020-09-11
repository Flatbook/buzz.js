import { loadSchemaFile, mockQueryResponse } from "../src";

describe("mock", () => {
  beforeEach(() => {
    loadSchemaFile("./test/fixtures/test.graphql");
  });

  const query = `
      query TestQuery {
        hello
      }
    `;

  it("equals hello", () => {
    const result = mockQueryResponse(query);

    expect(result).toEqual({ hello: "Hello World" });
  });

  describe("with mocks", () => {
    it("supports custom mocks", () => {
      const result = mockQueryResponse(query, {
        additionalMocks: {
          String: "test-mock-override",
        },
      });

      expect(result).toEqual({ hello: "test-mock-override" });
    });
  });
});
