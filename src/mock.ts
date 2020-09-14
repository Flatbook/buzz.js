import gql from "graphql-tag";

import { addMocksToSchema } from "@graphql-tools/mock";
import {
  buildOperationNodeForField,
  isDocumentString,
  visitSchema,
  VisitSchemaKind,
} from "@graphql-tools/utils";
import {
  ExecutionResult,
  GraphQLNamedType,
  GraphQLSchema,
  GraphQLObjectType,
  graphqlSync,
  FragmentDefinitionNode,
} from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { getDefaultMocks, getDefaultSchema } from "./load-schema";
import { GraphQLExecutionError } from "./GraphQLExecutionError";
import { mergeMocks, Mock } from "./mock-utils";

interface MockedQueryResponseOptions<T> {
  additionalMocks?: Mock<T>;
  variables?: Record<string, unknown>;
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

export function mockFragment<T>(
  fragment: string,
  options?: MockedQueryResponseOptions<T>,
): T | null {
  if (!isDocumentString(fragment)) {
    throw new Error("fragment is not a valid GraphQL document");
  } else if (!validateDefinitions(fragment, "FragmentDefinition")) {
    throw new Error("document is not a fragment");
  }

  const {
    typeCondition: {
      name: { value },
    },
  } = gql`
    ${fragment}
  `.definitions[0] as FragmentDefinitionNode;

  const schema = makeExecutableSchema({ typeDefs: getDefaultSchema() });

  visitSchema(schema, {
    [VisitSchemaKind.OBJECT_TYPE](
      objType: GraphQLObjectType,
      schema: GraphQLSchema,
    ): GraphQLObjectType | null | undefined {
      console.log({ objType });

      return null;
    },
    [VisitSchemaKind.TYPE](
      type: GraphQLNamedType,
      schema: GraphQLSchema,
    ): GraphQLNamedType | null | undefined {
      console.log({ type });
      return null;
    },
  });

  const builtOperationNode = buildOperationNodeForField({
    field: value,
    kind: "query",
    schema,
    argNames: [],
  });

  return {} as T;
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
