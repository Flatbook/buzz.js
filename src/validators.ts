import { MutationHookOptions, QueryHookOptions } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import { OperationVariables } from "react-apollo";

interface QueryInvocation<TData = any, TVariables = OperationVariables> {
  query: DocumentNode;
  options: QueryHookOptions<TData, TVariables>;
}

interface MutationInvocation<TData = any, TVariables = OperationVariables> {
  mutation: DocumentNode;
  options: MutationHookOptions<TData, TVariables>;
}

class Validator<InvocationT> {
  private calls: InvocationT[];

  constructor() {
    this.calls = [];
  }

  getCalls(): InvocationT[] {
    return this.calls;
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
