import { loadSchemaFile, mockQueryResponse } from "../src";
import { mergeResult } from "../src/mock";

beforeEach(() => {
  loadSchemaFile("./fixtures/test.graphql");
});

describe("mockQueryResponse", () => {
  describe("validations", () => {
    it("throws when an invalid string is passed", () => {
      const invalidString = "invalid string";

      expect(() => {
        mockQueryResponse(invalidString);
      }).toThrow();
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
      }).toThrow();

      expect(() => {
        mockQueryResponse(query);
      }).not.toThrow();

      expect(() => {
        mockQueryResponse(mutation);
      }).not.toThrow();
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
        response: {
          hello: {
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

describe("mergeResult", () => {
  describe("simple objects", () => {
    it("merges", () => {
      const a = { a: 1, b: 2 };
      const b = { a: 2 };

      expect(mergeResult(a, b)).toEqual({
        a: 2,
        b: 2,
      });
    });
  });

  describe("nested objects", () => {
    it("merges", () => {
      const a = { a: 1, b: { c: 3 } };
      const b = { b: { c: 4 } };

      expect(mergeResult(a, b)).toEqual({
        a: 1,
        b: { c: 4 },
      });
    });
  });

  describe("nested array", () => {
    it("overwrites when src is empty array", () => {
      const a = { a: [{ c: 3 }] };
      const b = { a: [] };

      expect(mergeResult(a, b)).toEqual({
        a: [],
      });
    });

    it("merges values in array", () => {
      const a = { a: [{ c: 3 }] };
      const b = { a: [{ c: 4 }, { c: 5 }] };

      expect(mergeResult(a, b)).toEqual({
        a: [{ c: 4 }, { c: 5 }],
      });
    });
  });
});
