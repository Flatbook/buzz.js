import * as ApolloClientPackage from "@apollo/client";
import * as ReactHooksPackage from "@apollo/react-hooks";

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

interface MockUseQueryOptions<TData = any> {
  error?: ApolloError;
  loading?: boolean;
  response?: TData;
  storeResponse?: boolean;
}

/**
 * @ignore
 */
const useQuerySpies = [
  jest.spyOn(ApolloClientPackage, "useQuery"),
  jest.spyOn(ReactHooksPackage, "useQuery"),
];

/**
 * @ignore
 */
const useMutationSpies = [
  jest.spyOn(ApolloClientPackage, "useMutation"),
  jest.spyOn(ReactHooksPackage, "useMutation"),
];

/**
 * @ignore
 */
const defaultUseQuery = ReactHooksPackage.useQuery;

/**
 * @ignore
 */
const defaultUseMutation = ReactHooksPackage.useMutation;

/**
 * @ignore
 */
const queryOperationMap: Record<
  string,
  {
    validator: QueryValidator;
    mockOptions?: MockUseQueryOptions;
    storedResponse?: QueryResult;
  }
> = {};

/**
 * @ignore
 */
const mutationOperationMap: Record<
  string,
  {
    validator: MutationValidator;
    mockOptions?: MockUseQueryOptions;
    storedResponse?: unknown;
  }
> = {};

export function restoreMocks(): void {
  useQuerySpies.forEach(spy => spy.mockRestore());
  useMutationSpies.forEach(spy => spy.mockRestore());
}

/**
 * @ignore
 */
function mockedUseQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options: QueryHookOptions<TData, TVariables>,
  validator: QueryValidator<TData, TVariables>,
  mockOptions?: MockUseQueryOptions,
): QueryResult<TData, TVariables> {
  const queryString = query.loc.source.body;

  const data = mockQueryResponse<TData, TVariables>(queryString, {
    response: mockOptions?.response,
    variables: options.variables,
  });

  return {
    data:
      (!mockOptions?.error && !mockOptions?.loading && (data as TData)) || null,
    loading: mockOptions?.loading || false,
    error: (!mockOptions?.loading && mockOptions?.error) || null,
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
  ): QueryResult<TData, TVariables> {
    if (query.definitions.length === 0) {
      return;
    }

    const {
      name: { value },
    } = query.definitions[0] as OperationDefinitionNode;

    const storedMock = queryOperationMap[value];
    if (storedMock) {
      const { validator, mockOptions, storedResponse } = storedMock;

      const data =
        storedResponse ||
        mockedUseQuery<TData, TVariables>(
          query,
          options,
          validator as QueryValidator<TData, TVariables>,
          mockOptions,
        );

      validator.addCall({ query, options, result: data });

      if (mockOptions?.storeResponse) {
        queryOperationMap[value] = {
          ...storedMock,
          storedResponse: data,
        };
      }

      return data as QueryResult<TData, TVariables>;
    }

    return defaultUseQuery(query, options);
  };

  useQuerySpies.forEach(spy => spy.mockImplementation(mockFn));

  const validator = new QueryValidator<TData, TVariables>();
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
      const { validator, mockOptions, storedResponse } = storedMock;

      const mutationFn = async (
        invocationOptions: MutationFunctionOptions<TData, TVariables>,
      ) => {
        const data =
          storedResponse ||
          mockQueryResponse<TData, TVariables>(mutationString, {
            response: mockOptions?.response,
            variables: invocationOptions?.variables,
          });

        validator.addCall({
          mutation,
          options: invocationOptions,
          result: data,
        });

        if (mockOptions?.storeResponse) {
          mutationOperationMap[value] = {
            ...storedMock,
            storedResponse: data,
          };
        }

        return data;
      };

      const mutationString = mutation.loc.source.body;

      const data = validator.getMostRecentCall()?.result;
      return [
        // @ts-ignore intentionally incomplete
        mutationFn,
        // @ts-ignore intentionally incomplete
        {
          data: !mockOptions?.error && !mockOptions?.loading && (data as TData),
          loading: mockOptions?.loading || false,
          error: mockOptions?.error || null,
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
