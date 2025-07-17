[**buzz.js Documentation v0.4.4**](../README.md)

---

[buzz.js Documentation](../README.md) / mockUseQuery

# Function: mockUseQuery()

> **mockUseQuery**\<`TData`, `TVariables`\>(`operationName`, `mockOptions?`): [`QueryValidator`](../classes/QueryValidator.md)\<`TData`, `TVariables`\>

Defined in: [apollo-mocks.ts:132](https://github.com/Flatbook/buzz.js/blob/b6b990c75387d5345f670c58e688921c51432841/src/apollo-mocks.ts#L132)

Mocks Apollo Client's useQuery hook for testing

## Type Parameters

### TData

`TData` = `any`

### TVariables

`TVariables` _extends_ `OperationVariables` = `OperationVariables`

## Parameters

### operationName

`string`

The name of the GraphQL operation to mock

### mockOptions?

`MockUseQueryOptions`\<`any`\>

Optional configuration for the mock behavior

## Returns

[`QueryValidator`](../classes/QueryValidator.md)\<`TData`, `TVariables`\>

A QueryValidator instance to track calls

## Example

```typescript
const validator = mockUseQuery("GetUser", {
  response: { user: { id: "1", name: "John" } },
});
```
