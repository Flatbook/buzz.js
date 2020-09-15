import * as ReactHooks from "@apollo/react-hooks";
import * as ReactApollo from "react-apollo";

import { ApolloError } from "apollo-client";
import { DocumentNode } from "graphql";
import { QueryResult, OperationVariables } from "react-apollo";

import { Mock } from "./mock-utils";
import { mockQueryResponse } from "./mock";
import { QueryValidator } from "./QueryValidator";

interface MockUseQueryOptions<T> {
  error?: ApolloError;
  loading?: boolean;
  additionalMocks?: Mock<T>;
}

function mockedUseQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options: ReactHooks.QueryHookOptions<TData, TVariables>,
  validator: QueryValidator<TData, TVariables>,
  mockOptions?: MockUseQueryOptions<TData>,
): QueryResult<TData, TVariables> {
  const queryString = query.loc.source.body;

  const data = mockQueryResponse(queryString, {
    additionalMocks: mockOptions?.additionalMocks,
    variables: options.variables,
  });

  validator.addCall(query, options);

  if (mockOptions?.loading) {
    // @ts-ignore intentionally incomplete response
    return {
      loading: true,
      data: null,
      error: null,
      called: true,
    };
  } else if (mockOptions?.error) {
    // @ts-ignore intentionally incomplete response
    return {
      loading: false,
      data: null,
      error: mockOptions.error,
    };
  } else {
    // @ts-ignore intentionally incomplete response
    return {
      loading: false,
      data: data as TData,
      error: null,
      called: true,
    };
  }
}

export function mockUseQuery<TData = any, TVariables = OperationVariables>(
  mockOptions?: MockUseQueryOptions<TData>,
): QueryValidator {
  const validator = new QueryValidator();

  const mockFn = function (
    query: DocumentNode,
    options: ReactHooks.QueryHookOptions<TData, TVariables>,
  ) {
    return mockedUseQuery(query, options, validator, mockOptions);
  };

  // @ts-ignore useQuery is a readonly; we're going to assign it anyway
  ReactHooks.useQuery = mockFn;
  // @ts-ignore useQuery is a readonly; we're going to assign it anyway
  ReactApollo.useQuery = mockFn;

  return validator;
}
