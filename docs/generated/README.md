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

### Variables

- [DefaultMocks](README.md#defaultmocks)
- [DefaultSchema](README.md#defaultschema)
- [defaultUseMutation](README.md#defaultusemutation)
- [defaultUseQuery](README.md#defaultusequery)
- [mutationOperationMap](README.md#mutationoperationmap)
- [queryOperationMap](README.md#queryoperationmap)
- [useMutationSpies](README.md#usemutationspies)
- [useQuerySpies](README.md#usequeryspies)

### Functions

- [getDefaultSchema](README.md#getdefaultschema)
- [loadSchemaFile](README.md#loadschemafile)
- [mockQueryResponse](README.md#mockqueryresponse)
- [mockUseMutation](README.md#mockusemutation)
- [mockUseQuery](README.md#mockusequery)
- [resetMocks](README.md#resetmocks)
- [restoreMocks](README.md#restoremocks)
- [setMocks](README.md#setmocks)

## Type aliases

### RecursivePartial

Ƭ **RecursivePartial**\<T>: {}

_Defined in [src/RecursivePartial.ts:1](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/RecursivePartial.ts#L1)_

#### Type parameters:

| Name |
| ---- |
| `T`  |

## Variables

### DefaultMocks

• `Let` **DefaultMocks**: IMocks

_Defined in [src/load-schema.ts:8](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/load-schema.ts#L8)_

---

### DefaultSchema

• `Let` **DefaultSchema**: string \| null = null

_Defined in [src/load-schema.ts:7](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/load-schema.ts#L7)_

---

### defaultUseMutation

• `Const` **defaultUseMutation**: useMutation = ReactHooks.useMutation

_Defined in [src/apollo-mocks.ts:46](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/apollo-mocks.ts#L46)_

---

### defaultUseQuery

• `Const` **defaultUseQuery**: useQuery = ReactHooks.useQuery

_Defined in [src/apollo-mocks.ts:45](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/apollo-mocks.ts#L45)_

---

### mutationOperationMap

• `Const` **mutationOperationMap**: Record\<string, { mockOptions?: [MockUseQueryOptions](interfaces/mockusequeryoptions.md) ; validator: [MutationValidator](classes/mutationvalidator.md) }>

_Defined in [src/apollo-mocks.ts:52](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/apollo-mocks.ts#L52)_

---

### queryOperationMap

• `Const` **queryOperationMap**: Record\<string, { mockOptions?: [MockUseQueryOptions](interfaces/mockusequeryoptions.md) ; validator: [QueryValidator](classes/queryvalidator.md) }>

_Defined in [src/apollo-mocks.ts:48](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/apollo-mocks.ts#L48)_

---

### useMutationSpies

• `Const` **useMutationSpies**: SpyInstance\<MutationTuple\<unknown, unknown>, [DocumentNode \| TypedDocumentNode\<unknown, unknown>, MutationHookOptions\<unknown, unknown>]>[] = [ jest.spyOn(ApolloClientPackage, "useMutation"), jest.spyOn(ReactHooksPackage, "useMutation"),]

_Defined in [src/apollo-mocks.ts:30](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/apollo-mocks.ts#L30)_

---

### useQuerySpies

• `Const` **useQuerySpies**: SpyInstance\<QueryResult\<unknown, unknown>, [DocumentNode \| TypedDocumentNode\<unknown, unknown>, QueryHookOptions\<unknown, unknown>]>[] = [ jest.spyOn(ApolloClientPackage, "useQuery"), jest.spyOn(ReactHooksPackage, "useQuery"),]

_Defined in [src/apollo-mocks.ts:25](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/apollo-mocks.ts#L25)_

## Functions

### getDefaultSchema

▸ **getDefaultSchema**(): string \| null

_Defined in [src/load-schema.ts:17](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/load-schema.ts#L17)_

**Returns:** string \| null

---

### loadSchemaFile

▸ **loadSchemaFile**(`filepath`: string): void

_Defined in [src/load-schema.ts:28](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/load-schema.ts#L28)_

#### Parameters:

| Name       | Type   |
| ---------- | ------ |
| `filepath` | string |

**Returns:** void

---

### mockQueryResponse

▸ **mockQueryResponse**\<TData, TVariables>(`query`: string, `options?`: [MockedQueryResponseOptions](interfaces/mockedqueryresponseoptions.md)\<TVariables>): TData

_Defined in [src/mock.ts:22](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/mock.ts#L22)_

#### Type parameters:

| Name         |
| ------------ |
| `TData`      |
| `TVariables` |

#### Parameters:

| Name       | Type                                                                                |
| ---------- | ----------------------------------------------------------------------------------- |
| `query`    | string                                                                              |
| `options?` | [MockedQueryResponseOptions](interfaces/mockedqueryresponseoptions.md)\<TVariables> |

**Returns:** TData

---

### mockUseMutation

▸ **mockUseMutation**\<TData, TVariables>(`operationName`: string, `mockOptions?`: [MockUseQueryOptions](interfaces/mockusequeryoptions.md)): [MutationValidator](classes/mutationvalidator.md)

_Defined in [src/apollo-mocks.ts:121](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/apollo-mocks.ts#L121)_

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

_Defined in [src/apollo-mocks.ts:84](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/apollo-mocks.ts#L84)_

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

### resetMocks

▸ **resetMocks**(): void

_Defined in [src/apollo-mocks.ts:40](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/apollo-mocks.ts#L40)_

**Returns:** void

---

### restoreMocks

▸ **restoreMocks**(): void

_Defined in [src/apollo-mocks.ts:35](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/apollo-mocks.ts#L35)_

**Returns:** void

---

### setMocks

▸ **setMocks**(`mocks`: IMocks): void

_Defined in [src/load-schema.ts:34](https://github.com/Flatbook/buzz.js/blob/acc2e56/src/load-schema.ts#L34)_

#### Parameters:

| Name    | Type   |
| ------- | ------ |
| `mocks` | IMocks |

**Returns:** void
