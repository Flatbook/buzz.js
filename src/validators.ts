import {
  MutationFunctionOptions,
  QueryHookOptions,
  OperationVariables,
} from "@apollo/client";
import { DocumentNode } from "graphql";

interface QueryInvocation<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
> {
  query: DocumentNode;
  options: QueryHookOptions<TData, TVariables>;
  result: TData | null;
}

interface MutationInvocation<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
> {
  mutation: DocumentNode;
  options: MutationFunctionOptions<TData, TVariables>;
  result: TData | null;
}

export class Validator<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
> {
  protected calls: Array<
    QueryInvocation<TData, TVariables> | MutationInvocation<TData, TVariables>
  > = [];

  getCalls(): Array<
    QueryInvocation<TData, TVariables> | MutationInvocation<TData, TVariables>
  > {
    return this.calls;
  }

  getMostRecentCall():
    | QueryInvocation<TData, TVariables>
    | MutationInvocation<TData, TVariables>
    | undefined {
    return this.calls[this.calls.length - 1];
  }
}

export class QueryValidator<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
> extends Validator<TData, TVariables> {
  addCall(invocation: QueryInvocation<TData, TVariables>): void {
    this.calls.push(invocation);
  }

  getCalls(): QueryInvocation<TData, TVariables>[] {
    return this.calls as QueryInvocation<TData, TVariables>[];
  }

  getMostRecentCall(): QueryInvocation<TData, TVariables> | undefined {
    return this.calls[this.calls.length - 1] as QueryInvocation<
      TData,
      TVariables
    >;
  }
}

export class MutationValidator<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
> extends Validator<TData, TVariables> {
  addCall(invocation: MutationInvocation<TData, TVariables>): void {
    this.calls.push(invocation);
  }

  getCalls(): MutationInvocation<TData, TVariables>[] {
    return this.calls as MutationInvocation<TData, TVariables>[];
  }

  getMostRecentCall(): MutationInvocation<TData, TVariables> | undefined {
    return this.calls[this.calls.length - 1] as MutationInvocation<
      TData,
      TVariables
    >;
  }
}
