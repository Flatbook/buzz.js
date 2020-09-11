import { loadSchemaFile, mockQueryResponse } from "../src";

describe("mockQueryResponse", () => {
  beforeEach(() => {
    loadSchemaFile("./test/fixtures/test.graphql");
  });

  const query = `
      query TestQuery {
        hello {
          id
          hello
          message
        }
      }
    `;

  it("equals hello", () => {
    const result = mockQueryResponse(query);

    expect(result).toEqual({
      hello: {
        id: expect.any(String),
        hello: expect.any(Boolean),
        message: expect.any(String),
      },
    });
  });

  describe("with mocks", () => {
    it("supports custom mocks", () => {
      const result = mockQueryResponse(query, {
        additionalMocks: {
          HelloResponse: {
            id: "Hello|1",
            hello: true,
          },
        },
      });

      expect(result).toEqual({
        hello: {
          id: "Hello|1",
          hello: true,
          message: expect.any(String),
        },
      });
    });
  });
});
