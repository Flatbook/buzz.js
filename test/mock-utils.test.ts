import { mergeMocks, expandMockValue } from "../src/mock-utils";

describe("expandMockValue", () => {
  describe("function", () => {
    it("does not mutate value", () => {
      const value = (): string => "test";

      expect(typeof expandMockValue(value)).toEqual("function");
      expect(expandMockValue(value)()).toEqual("test");
    });

    it("expands function result", () => {
      const value = () => ({
        TypeOne: "test",
      });

      const expanded = expandMockValue(value);

      expect(typeof expanded).toEqual("function");

      expect(typeof expanded()).toEqual("object");
      expect(typeof expanded().TypeOne).toEqual("function");
      expect(expanded().TypeOne()).toEqual("test");
    });
  });

  describe("primitive", () => {
    it("returns function returning value", () => {
      const value = "test";

      expect(typeof expandMockValue(value)).toEqual("function");
      expect(expandMockValue(value)()).toEqual("test");
    });
  });

  describe("array", () => {
    it("returns function returning array", () => {
      const value = ["test-one", "test-two"];

      const expanded = expandMockValue(value);

      expect(typeof expanded).toEqual("function");
      expect(expanded()[0]()).toEqual("test-one");
      expect(expanded()[1]()).toEqual("test-two");
    });
  });

  describe("object", () => {
    it("returns mapped values", () => {
      const value = {
        TypeOne: "one",
        TypeTwo: {
          SubTypeTwo: "two",
        },
      };

      const expanded = expandMockValue(value);

      expect(typeof expanded).toEqual("object");
      expect(typeof expanded.TypeOne).toEqual("function");
      expect(expanded.TypeOne()).toEqual("one");

      expect(typeof expanded.TypeTwo).toEqual("function");
      expect(expanded.TypeTwo().SubTypeTwo()).toEqual("two");
    });
  });
});

describe("mergeMocks", () => {
  it("merges a mockObject with a mockObject", () => {
    const o1 = {
      TypeOne: "one",
      TypeTwo: {
        SubTypeTwo: "two",
      },
    };

    const o2 = {
      TypeOne: "one",
      TypeTwo: {
        SubTypeTwo: "overriden-two",
      },
    };

    const merged = mergeMocks(o1, o2);

    expect(typeof merged).toEqual("object");
    expect(typeof merged.TypeOne).toEqual("function");
    expect(merged.TypeOne()).toEqual("one");

    expect(typeof merged.TypeTwo).toEqual("function");
    expect(merged.TypeTwo().SubTypeTwo()).toEqual("overriden-two");
  });
});
