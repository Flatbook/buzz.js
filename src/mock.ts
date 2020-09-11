import { addMocksToSchema, IMocks } from "@graphql-tools/mock";
import { ExecutionResult, graphqlSync } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { getDefaultMocks, getDefaultSchema } from "./load-schema";
import { GraphQLExecutionError } from "./GraphQLExecutionError";
import { mergeMocks } from "./mock-utils";

interface MockedQueryResponseOptions {
  additionalMocks?: Record<string, any>;
}

export function mockQueryResponse<T>(
  query: string,
  options?: MockedQueryResponseOptions,
): T {
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
