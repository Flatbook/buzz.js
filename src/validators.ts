import {
  MutationFunctionOptions,
  QueryHookOptions,
  OperationVariables,
} from "@apollo/client";
import { DocumentNode } from "graphql";

interface QueryInvocation<TData = any, TVariables = OperationVariables> {
  query: DocumentNode;
  options: QueryHookOptions<TData, TVariables>;
  result: TData | null;
}

interface MutationInvocation<TData = any, TVariables = OperationVariables> {
  mutation: DocumentNode;
  options: MutationFunctionOptions<TData, TVariables>;
  result: TData | null;
}

class Validator<InvocationT> {
  private calls: InvocationT[];

  constructor() {
    this.calls = [];
  }

  getCalls(): InvocationT[] {
    return this.calls;
  }

  getMostRecentCall(): InvocationT | undefined {
    return this.calls[this.calls.length - 1];
  }

  addCall(invocation: InvocationT): void {
    this.calls.push(invocation);
  }
}

export class QueryValidator<
  TData = any,
  TVariables = OperationVariables
> extends Validator<QueryInvocation<TData, TVariables>> {}

export class MutationValidator<
  TData = any,
  TVariables = OperationVariables
> extends Validator<MutationInvocation<TData, TVariables>> {}
