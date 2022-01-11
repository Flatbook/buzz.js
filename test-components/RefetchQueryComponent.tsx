import {
  ApolloError,
  ApolloQueryResult,
  OperationVariables,
  QueryHookOptions,
  useQuery,
} from "@apollo/client";
import { DocumentNode } from "graphql";

interface TestProps<TData = any, TVariables = OperationVariables> {
  query: DocumentNode;
  variables?: TVariables;
  onData?: (data: TData) => void;
  onError?: (error: ApolloError) => void;
  onLoading?: (loading: boolean) => void;
  onRefetch?: (refetch: () => Promise<ApolloQueryResult<TData>>) => void;
  onFetchMore?: (fetchMore: () => Promise<ApolloQueryResult<unknown>>) => void;
  queryOptions?: Partial<QueryHookOptions<TData, TVariables>>;
}

function RefetchQueryComponent<TData = any, TVariables = OperationVariables>(
  props: TestProps<TData, TVariables>,
): null {
  const {
    query,
    variables,
    onData,
    onError,
    onLoading,
    onRefetch,
    onFetchMore,
    queryOptions,
  } = props;

  const { data, loading, error, refetch, fetchMore } = useQuery<
    TData,
    TVariables
  >(query, {
    variables,
    ...queryOptions,
  });

  onLoading?.(loading);
  onData?.(data);
  onError?.(error);
  onRefetch?.(() => refetch());
  onFetchMore?.(() =>
    fetchMore({
      variables: {
        offset: 1,
      },
    }),
  );

  return null;
}

export default RefetchQueryComponent;
