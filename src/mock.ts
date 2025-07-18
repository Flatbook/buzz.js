import gql from "graphql-tag";

import { addMocksToSchema } from "@graphql-tools/mock";
import { isDocumentString } from "@graphql-tools/utils";
import { ExecutionResult, graphqlSync } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { OperationVariables } from "@apollo/client";
import { isArray, mergeWith } from "lodash";

import { getDefaultMocks, getDefaultSchema } from "./load-schema";
import { GraphQLExecutionError } from "./GraphQLExecutionError";
import { RecursivePartial } from "./RecursivePartial";

interface MockedQueryResponseOptions<
  TData = any,
  TVariables = OperationVariables,
> {
  response?: RecursivePartial<TData>;
  variables?: TVariables;
}

/**
 * Mocks a GraphQL query response with optional custom data
 * @param query - The GraphQL query string to mock
 * @param options - Optional configuration for the mock response
 * @param options.response - Custom response data to merge with the mock
 * @param options.variables - Variables to pass to the query
 * @returns The mocked response data
 * @example
 * ```typescript
 * const data = mockQueryResponse(`
 *   query GetUser($id: ID!) {
 *     user(id: $id) {
 *       id
 *       name
 *     }
 *   }
 * `, {
 *   variables: { id: "1" },
 *   response: { user: { name: "John Doe" } }
 * });
 * ```
 */
export function mockQueryResponse<TData, TVariables>(
  query: string,
  options?: MockedQueryResponseOptions<TData, TVariables>,
): TData {
  if (!isDocumentString(query)) {
    throw new Error("query is not a valid GraphQL document");
  } else if (!validateDefinitions(query, "OperationDefinition")) {
    throw new Error("query is not executable (must be a query or mutation)");
  }

  const schemaDef = getDefaultSchema();
  if (!schemaDef) {
    throw new Error("No schema loaded. Call loadSchemaFile() first.");
  }

  const schema = makeExecutableSchema({ typeDefs: schemaDef });

  const mockedSchema = addMocksToSchema({
    schema: schema,
    mocks: getDefaultMocks(),
  });

  const result: ExecutionResult<TData> = graphqlSync({
    schema: mockedSchema,
    source: query,
    variableValues: options?.variables as {
      readonly [variable: string]: unknown;
    },
  }) as ExecutionResult<TData>;

  if (result.errors) {
    throw new GraphQLExecutionError([...result.errors]);
  }

  return mergeResult(result.data, options?.response) as TData;
}

/**
 * @ignore
 */
export function mergeResult<TData>(
  result: TData,
  response: RecursivePartial<TData> | undefined,
): TData {
  if (!response) {
    return result;
  }

  return mergeWith(result, response, (obj: any, src: any) => {
    if (isArray(src)) {
      if (isArray(obj)) {
        let resArr = [];
        for (let i = 0; i < Math.min(obj.length, src.length); i++) {
          resArr.push(mergeResult(obj[i], src[i]));
        }
        if (resArr.length < src.length) {
          resArr = resArr.concat(src.slice(resArr.length));
        }

        return resArr;
      }
      return src;
    }
  });
}

/**
 * @ignore
 */
function validateDefinitions(
  document: string,
  definitionType: string,
): boolean {
  const definitions = gql`
    ${document}
  `.definitions;

  return (
    definitions.length > 0 &&
    definitions.filter(definition => definition.kind === definitionType)
      .length > 0
  );
}
