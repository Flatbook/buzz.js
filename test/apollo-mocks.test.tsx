import React from "react";

import gql from "graphql-tag";

import { render } from "@testing-library/react";
import { ApolloError } from "apollo-client";
import { useQuery } from "react-apollo";

import { loadSchemaFile, setMocks } from "../src";
import { mockUseQuery } from "../src/apollo-mocks";

const SimpleComponent = (): JSX.Element => {
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

beforeEach(() => {
  loadSchemaFile("./test/fixtures/test.graphql");
  setMocks({
    ID: "example-id",
  });
});

describe("mockUseQuery", () => {
  describe("valid state", () => {
    it("mocks the response with no mocking overhead", () => {
      mockUseQuery();

      const { getByText } = render(<SimpleComponent />);
      expect(getByText(/^ID: example-id$/).textContent).not.toBeNull();
    });
  });

  describe("validations", () => {
    it("allows expectations to be set on calls", () => {
      const validator = mockUseQuery();

      render(<SimpleComponent />);
      expect(validator.getCalls().length).toEqual(1);
      expect(validator.getCalls()[0].options.variables.id).toEqual(
        "test-input-id",
      );
    });
  });

  describe("loading state", () => {
    it("renders loading state", () => {
      mockUseQuery({
        loading: true,
      });

      const { queryByText } = render(<SimpleComponent />);
      expect(queryByText(/^Loading\.\.\.$/).textContent).not.toBeNull();
      expect(queryByText(/^ID .*$/)).toBeNull();
    });
  });

  describe("error state", () => {
    it("renders error message", () => {
      mockUseQuery({
        error: new ApolloError({ errorMessage: "test-error" }),
      });

      const { queryByText } = render(<SimpleComponent />);
      expect(queryByText(/^Error: test-error$/).textContent).not.toBeNull();
    });
  });
});
