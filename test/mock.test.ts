import { loadSchemaFile, mockFragment, mockQueryResponse } from "../src";

beforeEach(() => {
  loadSchemaFile("./test/fixtures/test.graphql");
});

describe("mockQueryResponse", () => {
  describe("validations", () => {
    it("throws when an invalid string is passed", () => {
      const invalidString = "invalid string";

      expect(() => {
        mockQueryResponse(invalidString);
      }).toThrowError();
    });

    it("throws an error when a fragment is passed", () => {
      const fragment = `
      fragment TestFragment on HelloResponse {
        id
      }
    `;

      const query = `
      query TestQuery {
        hello {
          id
        }
      }
    `;

      const mutation = `
      mutation TestMutation {
        helloMutation {
          id
        }
      }
    `;

      expect(() => {
        mockQueryResponse(fragment);
      }).toThrowError();

      expect(() => {
        mockQueryResponse(query);
      }).not.toThrowError();

      expect(() => {
        mockQueryResponse(mutation);
      }).not.toThrowError();
    });
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

  it("equals returns default mock values", () => {
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

describe("mockFragment", () => {
  describe("validations", () => {
    it("throws when an invalid string is passed", () => {
      const invalidString = "invalid string";

      expect(() => {
        mockFragment(invalidString);
      }).toThrowError();
    });

    it("throws an error when a query or mutation is passed", () => {
      const fragment = `
      fragment TestFragment on HelloResponse {
        id
      }
    `;

      const query = `
      query TestQuery {
        hello {
          id
        }
      }
    `;

      const mutation = `
      mutation TestMutation {
        helloMutation {
          id
        }
      }
    `;

      expect(() => {
        mockFragment(fragment);
      }).not.toThrowError();

      expect(() => {
        mockFragment(query);
      }).toThrowError();

      expect(() => {
        mockFragment(mutation);
      }).toThrowError();
    });
  });

  const fragment = `
      fragment TestFragment on HelloResponse {
        id
      }
    `;

  it.only("returns default values for fragment", () => {
    expect(mockFragment(fragment)).toEqual({
      id: expect.any(String),
    });
  });
});
