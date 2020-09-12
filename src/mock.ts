import gql from "graphql-tag";

import { addMocksToSchema } from "@graphql-tools/mock";
import { isDocumentString } from "@graphql-tools/utils";
import { ExecutionResult, graphqlSync } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { getDefaultMocks, getDefaultSchema } from "./load-schema";
import { GraphQLExecutionError } from "./GraphQLExecutionError";
import { mergeMocks, Mock } from "./mock-utils";

interface MockedQueryResponseOptions<T> {
  additionalMocks?: Mock<T>;
}

export function mockQueryResponse<T>(
  query: string,
  options?: MockedQueryResponseOptions<T>,
): T {
  if (!isDocumentString(query)) {
    throw new Error("query is not a valid GraphQL document");
  }
  if (!validateExecutableQuery(query)) {
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
  ) as ExecutionResult<T>;

  if (result.errors) {
    throw new GraphQLExecutionError([...result.errors]);
  }

  return result.data as T;
}

// export function mockFragment<T>(
//   fragment: string | DocumentNode,
//   options?: MockedQueryResponseOptions<T>,
// ): T {}
//

function validateExecutableQuery(query: string): boolean {
  const definitions = gql`
    ${query}
  `.definitions;

  return (
    definitions.length > 0 &&
    definitions.filter(definition => definition.kind !== "OperationDefinition")
      .length === 0
  );
}
