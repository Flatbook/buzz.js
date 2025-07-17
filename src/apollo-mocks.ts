import * as ApolloClientPackage from "@apollo/client";

import {
  ApolloError,
  FetchResult,
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
}

/**
 * @ignore
 */
const useQuerySpies = [jest.spyOn(ApolloClientPackage, "useQuery")];

/**
 * @ignore
 */
const useMutationSpies = [jest.spyOn(ApolloClientPackage, "useMutation")];

/**
 * @ignore
 */
const defaultUseQuery = ApolloClientPackage.useQuery;

/**
 * @ignore
 */
const defaultUseMutation = ApolloClientPackage.useMutation;

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
function mockedUseQuery<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  options: QueryHookOptions<TData, TVariables>,
  validator: QueryValidator<TData, TVariables>,
  mockOptions?: MockUseQueryOptions,
): QueryResult<TData, TVariables> {
  const queryString = query.loc?.source.body || "";

  // Return empty object if skip is true
  if (options.skip) {
    // @ts-ignore intentionally incomplete
    return {};
  }

  const data = mockQueryResponse<TData, TVariables>(queryString, {
    response: mockOptions?.response,
    variables: options.variables,
  });

  if (!mockOptions?.loading && !mockOptions?.error && data) {
    options?.onCompleted?.(data);
  } else if (mockOptions?.error) {
    options?.onError?.(mockOptions.error);
  }

  // @ts-ignore intentionally incomplete
  return {
    data:
      (!mockOptions?.error && !mockOptions?.loading && (data as TData)) ||
      undefined,
    loading: mockOptions?.loading || false,
    error: (!mockOptions?.loading && mockOptions?.error) || undefined,
    called: validator.getCalls().length > 0,
    refetch: jest.fn(),
    fetchMore: jest.fn(),
  };
}

export function mockUseQuery<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  operationName: string,
  mockOptions?: MockUseQueryOptions,
): QueryValidator<TData, TVariables> {
  const mockFn = function (
    query: DocumentNode,
    options: QueryHookOptions<TData, TVariables>,
  ): QueryResult<TData, TVariables> {
    if (query.definitions.length === 0) {
      return {} as QueryResult<TData, TVariables>;
    }

    const definition = query.definitions[0] as OperationDefinitionNode;
    const name = definition.name?.value;

    if (!name) {
      return defaultUseQuery(query, options) as QueryResult<TData, TVariables>;
    }

    const storedMock = queryOperationMap[name];
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

      (validator as QueryValidator<TData, TVariables>).addCall({
        query,
        options,
        result: data.data || null,
      });

      queryOperationMap[name] = {
        ...storedMock,
        storedResponse: data as any,
      };

      return data as QueryResult<TData, TVariables>;
    }

    return defaultUseQuery(query, options) as QueryResult<TData, TVariables>;
  };

  useQuerySpies.forEach(spy => spy.mockImplementation(mockFn as any));

  const validator = new QueryValidator<TData, TVariables>();
  queryOperationMap[operationName] = {
    validator: validator as any,
    mockOptions,
  };

  return validator;
}

export function mockUseMutation<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  operationName: string,
  mockOptions?: MockUseQueryOptions,
): MutationValidator<TData, TVariables> {
  const mockFn = (
    mutation: DocumentNode,
    options?: MutationHookOptions<TData, TVariables>,
  ): MutationTuple<TData, TVariables> => {
    if (mutation.definitions.length === 0) {
      return [jest.fn(), {}] as unknown as MutationTuple<TData, TVariables>;
    }

    const definition = mutation.definitions[0] as OperationDefinitionNode;
    const name = definition.name?.value;

    if (!name) {
      return defaultUseMutation(mutation, options) as MutationTuple<
        TData,
        TVariables
      >;
    }

    const storedMock = mutationOperationMap[name];

    if (!storedMock) {
      return defaultUseMutation(mutation, options) as MutationTuple<
        TData,
        TVariables
      >;
    } else {
      const { validator, mockOptions, storedResponse } = storedMock;

      const mutationFn = async (
        invocationOptions: MutationFunctionOptions<TData, TVariables>,
      ): Promise<FetchResult<TData>> => {
        const data =
          (storedResponse as TData) ||
          mockQueryResponse<TData, TVariables>(mutationString, {
            response: mockOptions?.response,
            variables: invocationOptions?.variables,
          });

        (validator as MutationValidator<TData, TVariables>).addCall({
          mutation,
          options: invocationOptions,
          result: data,
        });

        mutationOperationMap[name] = {
          ...storedMock,
          storedResponse: data,
        };

        if (!mockOptions?.loading && !mockOptions?.error && data) {
          options?.onCompleted?.(data);
        } else if (mockOptions?.error) {
          options?.onError?.(mockOptions.error);
        }

        return { data };
      };

      const mutationString = mutation.loc?.source.body || "";

      const data = (
        validator as MutationValidator<TData, TVariables>
      ).getMostRecentCall()?.result;
      return [
        // @ts-ignore intentionally incomplete
        mutationFn,
        // @ts-ignore intentionally incomplete
        {
          data:
            (!mockOptions?.error && !mockOptions?.loading && (data as TData)) ||
            undefined,
          loading: mockOptions?.loading || false,
          error: mockOptions?.error || undefined,
          called:
            (validator as MutationValidator<TData, TVariables>).getCalls()
              .length > 0,
        },
      ];
    }
  };

  useMutationSpies.forEach(spy => spy.mockImplementation(mockFn as any));

  const validator = new MutationValidator<TData, TVariables>();
  mutationOperationMap[operationName] = {
    validator: validator as any,
    mockOptions,
  };

  return validator;
}
