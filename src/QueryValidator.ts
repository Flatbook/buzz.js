import { QueryHookOptions } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import { OperationVariables } from "react-apollo";

interface QueryInvocation<TData = any, TVariables = OperationVariables> {
  query: DocumentNode;
  options: QueryHookOptions<TData, TVariables>;
}

export class QueryValidator<TData = any, TVariables = OperationVariables> {
  private calls: QueryInvocation<TData, TVariables>[];

  constructor() {
    this.calls = [];
  }

  getCalls(): QueryInvocation<TData, TVariables>[] {
    return this.calls;
  }

  addCall(
    query: DocumentNode,
    options: QueryHookOptions<TData, TVariables>,
  ): void {
    this.calls.push({
      query,
      options,
    });
  }
}
