import { helloWorld } from "../src";

describe("helloWorld", () => {
  it("says hello", () => {
    expect(helloWorld()).toEqual("hello");
  });
});
