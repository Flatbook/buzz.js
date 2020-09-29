import React from "react";

import { fireEvent, render } from "@testing-library/react";
import { ApolloError } from "@apollo/client";

import { loadSchemaFile, setMocks } from "../src";
import { mockUseMutation, mockUseQuery } from "../src/apollo-mocks";

import {
  SimpleMutationComponent,
  SimpleQueryComponent,
  TestQuery,
  TestQueryVariables,
} from "../test-components";

beforeEach(() => {
  loadSchemaFile("./fixtures/test.graphql");
  setMocks({
    ID: () => "example-id",
  });
});

describe("mockUseQuery", () => {
  describe("valid state", () => {
    it("mocks the response with no mocking overhead", () => {
      mockUseQuery<TestQueryVariables>("TestQuery");

      const { getByText } = render(<SimpleQueryComponent />);
      expect(getByText(/^ID: example-id$/).textContent).not.toBeNull();
    });
  });

  describe("validations", () => {
    it("allows expectations to be set on calls", () => {
      const validator = mockUseQuery<TestQueryVariables>("TestQuery");

      render(<SimpleQueryComponent />);
      expect(validator.getCalls().length).toEqual(1);
      expect(validator.getCalls()[0].options.variables.id).toEqual(
        "test-input-id",
      );
    });
  });

  describe("loading state", () => {
    it("renders loading state", () => {
      mockUseQuery<TestQuery, TestQueryVariables>("TestQuery", {
        loading: true,
      });

      const { queryByText } = render(<SimpleQueryComponent />);
      expect(queryByText(/^Loading\.\.\.$/).textContent).not.toBeNull();
      expect(queryByText(/^ID .*$/)).toBeNull();
    });
  });

  describe("error state", () => {
    it("renders error message", () => {
      mockUseQuery<TestQuery, TestQueryVariables>("TestQuery", {
        error: new ApolloError({ errorMessage: "test-error" }),
      });

      const { queryByText } = render(<SimpleQueryComponent />);
      expect(queryByText(/^Error: test-error$/).textContent).not.toBeNull();
    });
  });

  describe("with additionalMocks", () => {
    it("overiddes original mock", () => {
      mockUseQuery<TestQuery, TestQueryVariables>("TestQuery", {
        response: {
          helloWithArgs: {
            message: null,
          },
        },
      });
      const { queryByText } = render(<SimpleQueryComponent />);
      expect(queryByText(/^Message: .*$/)).toBeNull();
    });
  });
});

describe("mockUseMutation", () => {
  describe("on mutate", () => {
    it("mocks out mutation", () => {
      mockUseQuery("TestMutation");
      const mutationValidator = mockUseMutation("TestMutation");

      const { getByText } = render(<SimpleMutationComponent />);
      fireEvent.click(getByText("mutate!"));

      expect(mutationValidator.getCalls().length).toEqual(1);
    });
  });
});
