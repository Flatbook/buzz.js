import gql from "graphql-tag";

import { addMocksToSchema } from "@graphql-tools/mock";
import { isDocumentString } from "@graphql-tools/utils";
import { ExecutionResult, graphqlSync } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { OperationVariables } from "@apollo/client";

import { getDefaultMocks, getDefaultSchema } from "./load-schema";
import { GraphQLExecutionError } from "./GraphQLExecutionError";
import { mergeMocks, Mock } from "./mock-utils";

interface MockedQueryResponseOptions<T, TVariables = OperationVariables> {
  additionalMocks?: Mock<T>;
  variables?: TVariables;
}

export function mockQueryResponse<T>(
  query: string,
  options?: MockedQueryResponseOptions<T>,
): T {
  if (!isDocumentString(query)) {
    throw new Error("query is not a valid GraphQL document");
  } else if (!validateDefinitions(query, "OperationDefinition")) {
    throw new Error("query is not executable (must be a query or mutation)");
  }

  const schema = makeExecutableSchema({ typeDefs: getDefaultSchema() });

  const mockedSchema = addMocksToSchema({
    schema: schema,
    mocks: mergeMocks(getDefaultMocks(), options?.additionalMocks),
  });

  const result: ExecutionResult<T> = graphqlSync(
    mockedSchema,
    query,
    null,
    null,
    options?.variables,
  ) as ExecutionResult<T>;

  if (result.errors) {
    throw new GraphQLExecutionError([...result.errors]);
  }

  return result.data as T;
}

function validateDefinitions(
  document: string,
  definitionType: string,
): boolean {
  const definitions = gql`
    ${document}
  `.definitions;

  return (
    definitions.length > 0 &&
    definitions.filter(definition => definition.kind !== definitionType)
      .length === 0
  );
}
