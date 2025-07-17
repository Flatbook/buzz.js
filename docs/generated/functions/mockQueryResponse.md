[**buzz.js Documentation v0.4.4**](../README.md)

---

[buzz.js Documentation](../README.md) / mockQueryResponse

# Function: mockQueryResponse()

> **mockQueryResponse**\<`TData`, `TVariables`\>(`query`, `options?`): `TData`

Defined in: [mock.ts:44](https://github.com/Flatbook/buzz.js/blob/b6b990c75387d5345f670c58e688921c51432841/src/mock.ts#L44)

Mocks a GraphQL query response with optional custom data

## Type Parameters

### TData

`TData`

### TVariables

`TVariables`

## Parameters

### query

`string`

The GraphQL query string to mock

### options?

`MockedQueryResponseOptions`\<`TData`, `TVariables`\>

Optional configuration for the mock response

## Returns

`TData`

The mocked response data

## Example

```typescript
const data = mockQueryResponse(
  `
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`,
  {
    variables: { id: "1" },
    response: { user: { name: "John Doe" } },
  },
);
```
