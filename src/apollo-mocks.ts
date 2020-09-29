import * as ApolloClientPackage from "@apollo/client";
import * as ReactHooksPackage from "@apollo/react-hooks";
import * as ReactHooks from "@apollo/react-hooks";

import {
  ApolloError,
  MutationFunctionOptions,
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryResult,
  OperationVariables,
} from "@apollo/client";
import { DocumentNode, OperationDefinitionNode } from "graphql";

import { mockQueryResponse } from "./mock";
import { MutationValidator, QueryValidator } from "./validators";

interface MockUseQueryOptions {
  error?: ApolloError;
  loading?: boolean;
  additionalMocks?: any;
}

const useQuerySpies = [
  jest.spyOn(ApolloClientPackage, "useQuery"),
  jest.spyOn(ReactHooksPackage, "useQuery"),
];

const useMutationSpies = [
  jest.spyOn(ApolloClientPackage, "useMutation"),
  jest.spyOn(ReactHooksPackage, "useMutation"),
];

export function restoreMocks(): void {
  useQuerySpies.forEach(spy => spy.mockRestore());
  useMutationSpies.forEach(spy => spy.mockRestore());
}

const defaultUseQuery = ReactHooks.useQuery;
const defaultUseMutation = ReactHooks.useMutation;

const queryOperationMap: Record<
  string,
  { validator: QueryValidator; mockOptions?: MockUseQueryOptions }
> = {};
const mutationOperationMap: Record<
  string,
  { validator: MutationValidator; mockOptions?: MockUseQueryOptions }
> = {};

function mockedUseQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options: QueryHookOptions<TData, TVariables>,
  validator: QueryValidator<TData, TVariables>,
  mockOptions?: MockUseQueryOptions,
): QueryResult<TData, TVariables> {
  const queryString = query.loc.source.body;

  const data = mockQueryResponse<TData, TVariables>(queryString, {
    additionalMocks: mockOptions?.additionalMocks,
    variables: options.variables,
  });

  validator.addCall({ query, options });

  return {
    data: !mockOptions?.error && !mockOptions?.loading && (data as TData),
    loading: mockOptions?.loading || false,
    error: mockOptions?.error,
    // @ts-ignore intentionally incomplete
    called: validator.getCalls().length > 0,
  };
}

export function mockUseQuery<TData = any, TVariables = OperationVariables>(
  operationName: string,
  mockOptions?: MockUseQueryOptions,
): QueryValidator {
  const mockFn = function (
    query: DocumentNode,
    options: QueryHookOptions<TData, TVariables>,
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

  useQuerySpies.forEach(spy => spy.mockImplementation(mockFn));

  const validator = new QueryValidator();
  queryOperationMap[operationName] = {
    validator,
    mockOptions,
  };

  return validator;
}

export function mockUseMutation<TData = any, TVariables = OperationVariables>(
  operationName: string,
  mockOptions?: MockUseQueryOptions,
): MutationValidator {
  const mockFn = (
    mutation: DocumentNode,
    options?: MutationHookOptions<TData, TVariables>,
  ): MutationTuple<TData, TVariables> => {
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
        options: MutationFunctionOptions<TData, TVariables>,
      ) => {
        // @ts-ignore only need to store the options used
        validator.addCall({ mutation, options });
      };

      const mutationString = mutation.loc.source.body;

      const data = mockQueryResponse<TData, TVariables>(mutationString, {
        additionalMocks: mockOptions?.additionalMocks,
        variables: options?.variables,
      });

      return [
        // @ts-ignore intentionally incomplete
        mutationFn,
        // @ts-ignore intentionally incomplete
        {
          data: !mockOptions?.error && !mockOptions?.loading && (data as TData),
          loading: mockOptions?.loading || false,
          error: mockOptions?.error,
          called: validator.getCalls().length > 0,
        },
      ];
    }
  };

  useMutationSpies.forEach(spy => spy.mockImplementation(mockFn));

  const validator = new MutationValidator();
  mutationOperationMap[operationName] = {
    validator,
    mockOptions,
  };

  return validator;
}
