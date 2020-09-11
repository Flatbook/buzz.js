import { GraphQLError } from "graphql";

export class GraphQLExecutionError extends Error {
  gqlErrors: GraphQLError[];

  constructor(errors: GraphQLError[]) {
    super(GraphQLExecutionError.message(errors));
    this.gqlErrors = errors;
  }

  private static message(errors: GraphQLError[]): string {
    return errors.map(error => error.message).join("\n");
  }
}
