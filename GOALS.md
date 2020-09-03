### Goals

1. Provide easy mocking for graphql queries, fragments, and mutations
1. Provide a drop-in replacement for Apollo MockedProvider, which:
   1. Mocks the apollo client's execute function and provides and instant response
   1. Warns/fails when a query does not request ID types all all objects requested
