import React from "react";
import gql from "graphql-tag";

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

const query = gql`
  query TestQuery($id: ID!) {
    helloWithArgs(id: $id) {
      id
      message
    }
  }
`;

describe("mockUseQuery", () => {
  describe("validations", () => {
    it("allows expectations to be set on calls", () => {
      const validator = mockUseQuery<TestQueryVariables>("TestQuery");

      render(
        <SimpleQueryComponent
          query={query}
          variables={{ id: "test-input-id" }}
        />,
      );
      expect(validator.getCalls().length).toEqual(1);
      expect(validator.getCalls()[0].options.variables.id).toEqual(
        "test-input-id",
      );
    });
  });

  describe("valid state", () => {
    it("mocks the response with no mocking overhead", () => {
      mockUseQuery<TestQueryVariables>("TestQuery");
      const onData = jest.fn();
      const onLoading = jest.fn();
      const onError = jest.fn();

      render(
        <SimpleQueryComponent
          query={query}
          onData={onData}
          onLoading={onLoading}
          onError={onError}
          variables={{ id: "example-id" }}
        />,
      );

      expect(onError).toHaveBeenCalledWith(null);
      expect(onLoading).toHaveBeenCalledWith(false);
      expect(onData).toHaveBeenCalledWith({
        helloWithArgs: expect.objectContaining({
          id: "example-id",
          message: expect.any(String),
        }),
      });
    });
  });

  describe("loading state", () => {
    it("renders loading state", () => {
      mockUseQuery<TestQuery, TestQueryVariables>("TestQuery", {
        loading: true,
      });
      const onLoading = jest.fn();
      const onData = jest.fn();
      const onError = jest.fn();

      render(
        <SimpleQueryComponent
          query={query}
          variables={{ id: "test-input-id" }}
          onLoading={onLoading}
          onData={onData}
          onError={onError}
        />,
      );

      expect(onLoading).toHaveBeenCalledWith(true);
      expect(onData).toHaveBeenCalledWith(null);
      expect(onError).toHaveBeenCalledWith(null);
    });
  });

  describe("error state", () => {
    it("renders error message", () => {
      mockUseQuery<TestQuery, TestQueryVariables>("TestQuery", {
        error: new ApolloError({ errorMessage: "test-error" }),
      });

      const onError = jest.fn();
      const onData = jest.fn();
      const onLoading = jest.fn();

      render(
        <SimpleQueryComponent
          query={query}
          variables={{ id: "test-input-id" }}
          onLoading={onLoading}
          onData={onData}
          onError={onError}
        />,
      );

      expect(onData).toHaveBeenCalledWith(null);
      expect(onLoading).toHaveBeenCalledWith(false);
      expect(onError).toHaveBeenCalledWith(expect.any(ApolloError));
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

      const onError = jest.fn();
      const onData = jest.fn();
      const onLoading = jest.fn();

      render(
        <SimpleQueryComponent
          query={query}
          variables={{ id: "test-input-id" }}
          onLoading={onLoading}
          onData={onData}
          onError={onError}
        />,
      );

      expect(onData).toHaveBeenCalledWith({
        helloWithArgs: expect.objectContaining({
          id: "example-id",
          message: null,
        }),
      });

      expect(onLoading).toHaveBeenCalledWith(false);
      expect(onError).toHaveBeenCalledWith(null);
    });
  });
});

// describe("mockUseMutation", () => {
//   describe("on mutate", () => {
//     it("mocks out mutation", () => {
//       mockUseQuery("TestMutation");
//       const mutationValidator = mockUseMutation("TestMutation");
//
//       const { getByText } = render(<SimpleMutationComponent />);
//       fireEvent.click(getByText("mutate!"));
//
//       expect(mutationValidator.getCalls().length).toEqual(1);
//       expect(mutationValidator.getMostRecentCall().options?.variables).toEqual({
//         id: "example-id",
//       });
//     });
//   });
// });
