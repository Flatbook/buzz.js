import gql from "graphql-tag";

import { getDefaultSchema, loadSchema } from "../src";
import { setDefaultSchema } from "../src/loadSchema";

const schemaString = `
    type Query {
      hello: String!
    }
  `;

describe("DefaultSchema", () => {
  it("is null by default", () => {
    expect(getDefaultSchema()).toBeNull();
  });
});

describe("loadSchema", () => {
  beforeEach(() => {
    setDefaultSchema(null);
  });

  describe("string", () => {
    it("sets DefaultSchema", () => {
      loadSchema(schemaString);

      expect(getDefaultSchema()).not.toBeNull();
    });
  });

  describe("DocumentNode", () => {
    it("sets DefaultSchema", () => {
      loadSchema(
        gql`
          ${schemaString}
        `,
      );

      expect(getDefaultSchema()).not.toBeNull();
    });
  });
});
