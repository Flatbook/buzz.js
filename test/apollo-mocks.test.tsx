import React from "react";

import gql from "graphql-tag";

import { fireEvent, render } from "@testing-library/react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";

import { loadSchemaFile, setMocks } from "../src";
import { mockUseMutation, mockUseQuery } from "../src/apollo-mocks";

const SimpleQueryComponent = (): JSX.Element => {
  const query = gql`
    query TestQuery($id: ID!) {
      helloWithArgs(id: $id) {
        id
        hello
        message
      }
    }
  `;

  const { data, loading, error } = useQuery(query, {
    variables: {
      id: "test-input-id",
    },
  });

  const renderMessage = (): string => {
    if (error) {
      return `Error: ${error.message}`;
    } else if (loading) {
      return "Loading...";
    } else {
      return `ID: ${data.helloWithArgs.id}`;
    }
  };

  return (
    <>
      <div>{renderMessage()}</div>
    </>
  );
};

const SimpleMutationComponent = (): JSX.Element => {
  const mutation = gql`
    mutation TestMutation {
      helloMutation {
        id
      }
    }
  `;

  const [mutate] = useMutation(mutation);

  const handleClick = () => {
    mutate();
  };

  return <button onClick={handleClick}>mutate!</button>;
};

beforeEach(() => {
  loadSchemaFile("./test/fixtures/test.graphql");
  setMocks({
    ID: "example-id",
  });
});

describe("mockUseQuery", () => {
  describe("valid state", () => {
    it("mocks the response with no mocking overhead", () => {
      mockUseQuery("TestQuery");

      const { getByText } = render(<SimpleQueryComponent />);
      expect(getByText(/^ID: example-id$/).textContent).not.toBeNull();
    });
  });

  describe("validations", () => {
    it("allows expectations to be set on calls", () => {
      const validator = mockUseQuery("TestQuery");

      render(<SimpleQueryComponent />);
      expect(validator.getCalls().length).toEqual(1);
      expect(validator.getCalls()[0].options.variables.id).toEqual(
        "test-input-id",
      );
    });
  });

  describe("loading state", () => {
    it("renders loading state", () => {
      mockUseQuery("TestQuery", {
        loading: true,
      });

      const { queryByText } = render(<SimpleQueryComponent />);
      expect(queryByText(/^Loading\.\.\.$/).textContent).not.toBeNull();
      expect(queryByText(/^ID .*$/)).toBeNull();
    });
  });

  describe("error state", () => {
    it("renders error message", () => {
      mockUseQuery("TestQuery", {
        error: new ApolloError({ errorMessage: "test-error" }),
      });

      const { queryByText } = render(<SimpleQueryComponent />);
      expect(queryByText(/^Error: test-error$/).textContent).not.toBeNull();
    });
  });

  describe("when query not mocked", () => {
    it("calls original useQuery", () => {});
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

  describe("when mutation not mocked", () => {
    it("calls original useMutation", () => {});
  });
});