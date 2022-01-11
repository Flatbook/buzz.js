import React from "react";
import gql from "graphql-tag";

import { render } from "@testing-library/react";
import { ApolloError } from "@apollo/client";

import { loadSchemaFile, setMocks } from "../src";
import { mockUseMutation, mockUseQuery } from "../src/apollo-mocks";

import {
  MutationEmitter,
  SimpleQueryComponent,
  RefetchQueryComponent,
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

  describe("refetch", () => {
    it("can call refetch successfully", () => {
      mockUseQuery<TestQuery, TestQueryVariables>("TestQuery");
      const onLoading = jest.fn();
      const onData = jest.fn();
      const onError = jest.fn();
      const onRefetch = jest.fn();
      const onFetchMore = jest.fn();

      render(
        <RefetchQueryComponent
          query={query}
          variables={{ id: "test-input-id" }}
          onLoading={onLoading}
          onData={onData}
          onError={onError}
          onRefetch={onRefetch}
          onFetchMore={onFetchMore}
        />,
      );

      expect(onRefetch).toHaveBeenCalledWith(expect.any(Function));
      expect(onFetchMore).toHaveBeenCalledWith(expect.any(Function));
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

  describe("onCompleted", () => {
    it("calls onCompleted with valid data", () => {
      mockUseQuery<TestQuery, TestQueryVariables>("TestQuery");

      const onCompleted = jest.fn();
      const onError = jest.fn();
      render(
        <SimpleQueryComponent
          query={query}
          variables={{ id: "test-input-id" }}
          queryOptions={{
            onCompleted,
            onError,
          }}
        />,
      );

      expect(onError).not.toHaveBeenCalled();
      expect(onCompleted).toHaveBeenCalledWith({
        helloWithArgs: expect.objectContaining({
          id: expect.any(String),
          message: expect.any(String),
        }),
      });
    });

    it("does not call onCompleted when 'testing' is true", () => {
      mockUseQuery<TestQuery, TestQueryVariables>("TestQuery", {
        loading: true,
      });

      const onCompleted = jest.fn();
      const onError = jest.fn();
      render(
        <SimpleQueryComponent
          query={query}
          variables={{ id: "test-input-id" }}
          queryOptions={{
            onCompleted,
            onError,
          }}
        />,
      );

      expect(onError).not.toHaveBeenCalled();
      expect(onCompleted).not.toHaveBeenCalled();
    });
  });

  describe("onError", () => {
    it("calls onError function when error mocked", () => {
      mockUseQuery<TestQuery, TestQueryVariables>("TestQuery", {
        error: new ApolloError({ errorMessage: "test-error" }),
      });

      const onCompleted = jest.fn();
      const onError = jest.fn();
      render(
        <SimpleQueryComponent
          query={query}
          variables={{ id: "test-input-id" }}
          queryOptions={{
            onCompleted,
            onError,
          }}
        />,
      );

      expect(onError).toHaveBeenCalledWith(expect.any(ApolloError));
      expect(onCompleted).not.toHaveBeenCalled();
    });
  });
});

describe("mockUseMutation", () => {
  const mutation = gql`
    mutation TestMutation($id: ID!) {
      helloWithArgsMutation(id: $id) {
        id
        message
      }
    }
  `;

  describe("onCompleted", () => {
    it("calls onCompleted with valid data", () => {
      mockUseMutation("TestMutation");
      const mutationEmitter = new MutationEmitter();

      const onCompleted = jest.fn();
      const onError = jest.fn();
      render(
        <SimpleQueryComponent
          query={mutation}
          variables={{ id: "test-input-id" }}
          mutationEmitter={mutationEmitter}
          mutationOptions={{
            onCompleted,
            onError,
          }}
        />,
      );

      mutationEmitter.callMutation();

      expect(onError).not.toHaveBeenCalled();
      expect(onCompleted).toHaveBeenCalledWith({
        helloWithArgsMutation: expect.objectContaining({
          id: expect.any(String),
          message: expect.any(String),
        }),
      });
    });

    it("does not call onCompleted when loading is true", () => {
      mockUseMutation("TestMutation", {
        loading: true,
      });
      const mutationEmitter = new MutationEmitter();

      const onCompleted = jest.fn();
      const onError = jest.fn();
      render(
        <SimpleQueryComponent
          query={mutation}
          variables={{ id: "test-input-id" }}
          mutationEmitter={mutationEmitter}
          mutationOptions={{
            onCompleted,
            onError,
          }}
        />,
      );

      mutationEmitter.callMutation();

      expect(onError).not.toHaveBeenCalled();
      expect(onCompleted).not.toHaveBeenCalled();
    });
  });

  describe("onError", () => {
    it("calls onError function when error mocked", () => {
      mockUseMutation("TestMutation", {
        error: new ApolloError({ errorMessage: "test-error" }),
      });
      const mutationEmitter = new MutationEmitter();

      const onCompleted = jest.fn();
      const onError = jest.fn();
      render(
        <SimpleQueryComponent
          query={mutation}
          variables={{ id: "test-input-id" }}
          mutationEmitter={mutationEmitter}
          mutationOptions={{
            onCompleted,
            onError,
          }}
        />,
      );

      mutationEmitter.callMutation();

      expect(onError).toHaveBeenCalledWith(expect.any(ApolloError));
      expect(onCompleted).not.toHaveBeenCalled();
    });
  });

  describe("on mutate", () => {
    it("mocks out mutation", async () => {
      const mutationValidator = mockUseMutation("TestMutation");
      const mutationEmitter = new MutationEmitter();

      render(
        <SimpleQueryComponent
          query={mutation}
          mutationEmitter={mutationEmitter}
          variables={{
            id: "example-id",
          }}
        />,
      );

      mutationEmitter.callMutation();

      return new Promise(res => {
        expect(mutationValidator.getCalls().length).toEqual(1);
        expect(
          mutationValidator.getMostRecentCall().options?.variables,
        ).toEqual({
          id: "example-id",
        });

        mutationEmitter.onMutationResult(data => {
          expect(data).not.toBeNull();
          res();
        });
      });
    });
  });

  describe("loading state", () => {
    it("renders loading state", () => {
      mockUseMutation("TestMutation", {
        loading: true,
      });
      const mutationEmitter = new MutationEmitter();

      const onLoading = jest.fn();
      const onData = jest.fn();
      const onError = jest.fn();

      render(
        <SimpleQueryComponent
          query={mutation}
          variables={{ id: "test-input-id" }}
          onLoading={onLoading}
          onData={onData}
          onError={onError}
          mutationEmitter={mutationEmitter}
        />,
      );

      mutationEmitter.callMutation();

      expect(onLoading).toHaveBeenCalledWith(true);
      expect(onData).toHaveBeenCalledWith(null);
      expect(onError).toHaveBeenCalledWith(null);
    });
  });

  describe("error state", () => {
    it("renders error message", () => {
      mockUseMutation("TestMutation", {
        error: new ApolloError({ errorMessage: "test-error" }),
      });
      const mutationEmitter = new MutationEmitter();

      const onLoading = jest.fn();
      const onData = jest.fn();
      const onError = jest.fn();

      render(
        <SimpleQueryComponent
          query={mutation}
          variables={{ id: "test-input-id" }}
          onLoading={onLoading}
          onData={onData}
          onError={onError}
          mutationEmitter={mutationEmitter}
        />,
      );

      mutationEmitter.callMutation();

      expect(onData).toHaveBeenCalledWith(null);
      expect(onLoading).toHaveBeenCalledWith(false);
      expect(onError).toHaveBeenCalledWith(expect.any(ApolloError));
    });
  });

  describe("with additionalMocks", () => {
    it("overiddes original mock", () => {
      mockUseMutation("TestMutation", {
        response: {
          helloWithArgs: {
            message: "example-message",
          },
        },
      });
      const mutationEmitter = new MutationEmitter();

      const onLoading = jest.fn();
      const onData = jest.fn();
      const onError = jest.fn();

      render(
        <SimpleQueryComponent
          query={mutation}
          variables={{ id: "test-input-id" }}
          onLoading={onLoading}
          onData={onData}
          onError={onError}
          mutationEmitter={mutationEmitter}
        />,
      );

      mutationEmitter.callMutation();

      expect(onData).toHaveBeenCalled();
      expect(onLoading).toHaveBeenCalledWith(false);
      expect(onError).toHaveBeenCalledWith(null);
    });
  });
});
