**@sonder/buzz.js**

> Globals

# @sonder/buzz.js

## Index

### Classes

- [GraphQLExecutionError](classes/graphqlexecutionerror.md)
- [MutationValidator](classes/mutationvalidator.md)
- [QueryValidator](classes/queryvalidator.md)
- [Validator](classes/validator.md)

### Interfaces

- [MockUseQueryOptions](interfaces/mockusequeryoptions.md)
- [MockedQueryResponseOptions](interfaces/mockedqueryresponseoptions.md)
- [MutationInvocation](interfaces/mutationinvocation.md)
- [QueryInvocation](interfaces/queryinvocation.md)

### Type aliases

- [RecursivePartial](README.md#recursivepartial)

### Functions

- [getDefaultSchema](README.md#getdefaultschema)
- [loadSchemaFile](README.md#loadschemafile)
- [mockQueryResponse](README.md#mockqueryresponse)
- [mockUseMutation](README.md#mockusemutation)
- [mockUseQuery](README.md#mockusequery)
- [restoreMocks](README.md#restoremocks)
- [setMocks](README.md#setmocks)

## Type aliases

### RecursivePartial

Ƭ **RecursivePartial**\<T>: {}

_Defined in [src/RecursivePartial.ts:1](https://github.com/Flatbook/buzz.js/blob/2515820/src/RecursivePartial.ts#L1)_

#### Type parameters:

| Name |
| ---- |
| `T`  |

## Functions

### getDefaultSchema

▸ **getDefaultSchema**(): string \| null

_Defined in [src/load-schema.ts:24](https://github.com/Flatbook/buzz.js/blob/2515820/src/load-schema.ts#L24)_

**Returns:** string \| null

---

### loadSchemaFile

▸ **loadSchemaFile**(`filepath`: string): void

_Defined in [src/load-schema.ts:35](https://github.com/Flatbook/buzz.js/blob/2515820/src/load-schema.ts#L35)_

#### Parameters:

| Name       | Type   |
| ---------- | ------ |
| `filepath` | string |

**Returns:** void

---

### mockQueryResponse

▸ **mockQueryResponse**\<TData, TVariables>(`query`: string, `options?`: [MockedQueryResponseOptions](interfaces/mockedqueryresponseoptions.md)\<TData, TVariables>): TData

_Defined in [src/mock.ts:22](https://github.com/Flatbook/buzz.js/blob/2515820/src/mock.ts#L22)_

#### Type parameters:

| Name         |
| ------------ |
| `TData`      |
| `TVariables` |

#### Parameters:

| Name       | Type                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------ |
| `query`    | string                                                                                     |
| `options?` | [MockedQueryResponseOptions](interfaces/mockedqueryresponseoptions.md)\<TData, TVariables> |

**Returns:** TData

---

### mockUseMutation

▸ **mockUseMutation**\<TData, TVariables>(`operationName`: string, `mockOptions?`: [MockUseQueryOptions](interfaces/mockusequeryoptions.md)): [MutationValidator](classes/mutationvalidator.md)

_Defined in [src/apollo-mocks.ts:159](https://github.com/Flatbook/buzz.js/blob/2515820/src/apollo-mocks.ts#L159)_

#### Type parameters:

| Name         | Default            |
| ------------ | ------------------ |
| `TData`      | any                |
| `TVariables` | OperationVariables |

#### Parameters:

| Name            | Type                                                     |
| --------------- | -------------------------------------------------------- |
| `operationName` | string                                                   |
| `mockOptions?`  | [MockUseQueryOptions](interfaces/mockusequeryoptions.md) |

**Returns:** [MutationValidator](classes/mutationvalidator.md)

---

### mockUseQuery

▸ **mockUseQuery**\<TData, TVariables>(`operationName`: string, `mockOptions?`: [MockUseQueryOptions](interfaces/mockusequeryoptions.md)): [QueryValidator](classes/queryvalidator.md)

_Defined in [src/apollo-mocks.ts:106](https://github.com/Flatbook/buzz.js/blob/2515820/src/apollo-mocks.ts#L106)_

#### Type parameters:

| Name         | Default            |
| ------------ | ------------------ |
| `TData`      | any                |
| `TVariables` | OperationVariables |

#### Parameters:

| Name            | Type                                                     |
| --------------- | -------------------------------------------------------- |
| `operationName` | string                                                   |
| `mockOptions?`  | [MockUseQueryOptions](interfaces/mockusequeryoptions.md) |

**Returns:** [QueryValidator](classes/queryvalidator.md)

---

### restoreMocks

▸ **restoreMocks**(): void

_Defined in [src/apollo-mocks.ts:75](https://github.com/Flatbook/buzz.js/blob/2515820/src/apollo-mocks.ts#L75)_

**Returns:** void

---

### setMocks

▸ **setMocks**(`mocks`: IMocks): void

_Defined in [src/load-schema.ts:41](https://github.com/Flatbook/buzz.js/blob/2515820/src/load-schema.ts#L41)_

#### Parameters:

| Name    | Type   |
| ------- | ------ |
| `mocks` | IMocks |

**Returns:** void
