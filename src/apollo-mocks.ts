import * as ReactHooks from "@apollo/react-hooks";
import * as ReactApollo from "react-apollo";

import { ApolloError } from "apollo-client";
import { DocumentNode, OperationDefinitionNode } from "graphql";
import { QueryResult, OperationVariables } from "react-apollo";

import { Mock } from "./mock-utils";
import { mockQueryResponse } from "./mock";
import { MutationValidator, QueryValidator } from "./validators";

interface MockUseQueryOptions<T> {
  error?: ApolloError;
  loading?: boolean;
  additionalMocks?: Mock<T>;
}

const defaultUseQuery = ReactHooks.useQuery;
const defaultUseMutation = ReactHooks.useMutation;

const queryOperationMap: Record<
  string,
  { validator: QueryValidator; mockOptions?: MockUseQueryOptions<any> }
> = {};
const mutationOperationMap: Record<
  string,
  { validator: MutationValidator; mockOptions?: MockUseQueryOptions<any> }
> = {};

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

  validator.addCall({ query, options });

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
  operationName: string,
  mockOptions?: MockUseQueryOptions<TData>,
): QueryValidator {
  const mockFn = function (
    query: DocumentNode,
    options: ReactHooks.QueryHookOptions<TData, TVariables>,
  ) {
    if (query.definitions.length === 0) {
      return;
    }

    const {
      name: { value },
    } = query.definitions[0] as OperationDefinitionNode;

    const storedMock = queryOperationMap[value];
    if (storedMock) {
      const { validator, mockOptions } = storedMock;

      return mockedUseQuery(query, options, validator, mockOptions);
    }

    return defaultUseQuery(query, options);
  };

  const validator = new QueryValidator();
  queryOperationMap[operationName] = {
    validator,
    mockOptions,
  };

  // @ts-ignore useQuery is a readonly; we're going to assign it anyway
  ReactHooks.useQuery = mockFn;
  // @ts-ignore useQuery is a readonly; we're going to assign it anyway
  ReactApollo.useQuery = mockFn;

  return validator;
}

export function mockUseMutation<TData = any, TVariables = OperationVariables>(
  operationName: string,
  mockOptions?: MockUseQueryOptions<TData>,
): MutationValidator {
  const mockFn = (
    mutation: DocumentNode,
    options?: ReactHooks.MutationHookOptions<TData, TVariables>,
  ): ReactHooks.MutationTuple<TData, TVariables> => {
    if (mutation.definitions.length === 0) {
      return;
    }

    const {
      name: { value },
    } = mutation.definitions[0] as OperationDefinitionNode;

    const storedMock = mutationOperationMap[value];

    if (!storedMock) {
      return defaultUseMutation(mutation, options);
    } else {
      const { validator, mockOptions } = storedMock;

      const mutationFn = async (
        options: ReactApollo.MutationFunctionOptions<TData, TVariables>,
      ) => {
        validator.addCall({ mutation, options });
      };

      const mutationString = mutation.loc.source.body;

      const data = mockQueryResponse(mutationString, {
        additionalMocks: mockOptions?.additionalMocks,
        variables: options?.variables,
      });

      return [
        // @ts-ignore intentionally incomplete
        mutationFn,
        // @ts-ignore intentionally incomplete
        {
          data: !mockOptions?.error && !mockOptions?.loading && data,
          loading: mockOptions?.loading || false,
          error: mockOptions?.error,
          called: validator.getCalls().length > 0,
        },
      ];
    }
  };

  const validator = new MutationValidator();
  mutationOperationMap[operationName] = {
    validator,
    mockOptions,
  };

  // @ts-ignore useQuery is a readonly; we're going to assign it anyway
  ReactHooks.useMutation = mockFn;
  // @ts-ignore useQuery is a readonly; we're going to assign it anyway
  ReactApollo.useMutation = mockFn;

  return validator;
}
