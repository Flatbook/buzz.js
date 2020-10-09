import { EventEmitter } from "events";

import {
  ApolloError,
  useMutation,
  useQuery,
  OperationVariables,
} from "@apollo/client";
import { DocumentNode, OperationDefinitionNode } from "graphql";

const MUTATION_EMIT_KEY = "call_mutation";

class MutationEmitter extends EventEmitter {
  callMutation() {
    this.emit(MUTATION_EMIT_KEY);
  }
}

interface TestProps<TData = any, TVariables = OperationVariables> {
  query: DocumentNode;
  variables?: TVariables;
  onData?: (data: TData) => void;
  onError?: (error: ApolloError) => void;
  onLoading?: (loading: boolean) => void;
  mutationEmitter?: MutationEmitter;
}

function SimpleQueryComponent<TData = any, TVariables = OperationVariables>(
  props: TestProps<TData, TVariables>,
): null {
  const {
    query,
    variables,
    onData,
    onError,
    onLoading,
    mutationEmitter,
  } = props;

  if ((query.definitions[0] as OperationDefinitionNode).operation === "query") {
    const { data, loading, error } = useQuery<TData, TVariables>(query, {
      variables,
    });
    onLoading?.(loading);
    onData?.(data);
    debugger;
    onError?.(error);
  } else if (
    (query.definitions[0] as OperationDefinitionNode).operation === "mutation"
  ) {
    const [mutationFn, { data, error, loading }] = useMutation<
      TData,
      TVariables
    >(query, {
      variables,
    });
    onLoading?.(loading);
    onData?.(data);
    onError?.(error);

    mutationEmitter.on(MUTATION_EMIT_KEY, () => {
      mutationFn();
    });
  }

  return null;
}

export default SimpleQueryComponent;
