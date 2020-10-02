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
  TVariables = OperationVariables
> {
  response?: RecursivePartial<TData>;
  variables?: TVariables;
}

export function mockQueryResponse<TData, TVariables>(
  query: string,
  options?: MockedQueryResponseOptions<TData, TVariables>,
): TData {
  if (!isDocumentString(query)) {
    throw new Error("query is not a valid GraphQL document");
  } else if (!validateDefinitions(query, "OperationDefinition")) {
    throw new Error("query is not executable (must be a query or mutation)");
  }

  const schema = makeExecutableSchema({ typeDefs: getDefaultSchema() });

  const mockedSchema = addMocksToSchema({
    schema: schema,
    mocks: getDefaultMocks(),
  });

  const result: ExecutionResult<TData> = graphqlSync(
    mockedSchema,
    query,
    null,
    null,
    options?.variables,
  ) as ExecutionResult<TData>;

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

  return mergeWith(result, response, (obj, src) => {
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
