**@sonder/buzz.js**

> [Globals](../README.md) / GraphQLExecutionError

# Class: GraphQLExecutionError

## Hierarchy

- [Error](graphqlexecutionerror.md#error)

  ↳ **GraphQLExecutionError**

## Index

### Constructors

- [constructor](graphqlexecutionerror.md#constructor)

### Properties

- [gqlErrors](graphqlexecutionerror.md#gqlerrors)
- [message](graphqlexecutionerror.md#message)
- [name](graphqlexecutionerror.md#name)
- [stack](graphqlexecutionerror.md#stack)
- [Error](graphqlexecutionerror.md#error)

### Methods

- [message](graphqlexecutionerror.md#message)

## Constructors

### constructor

\+ **new GraphQLExecutionError**(`errors`: GraphQLError[]): [GraphQLExecutionError](graphqlexecutionerror.md)

_Defined in [src/GraphQLExecutionError.ts:4](https://github.com/Flatbook/buzz.js/blob/e8046c4/src/GraphQLExecutionError.ts#L4)_

#### Parameters:

| Name     | Type           |
| -------- | -------------- |
| `errors` | GraphQLError[] |

**Returns:** [GraphQLExecutionError](graphqlexecutionerror.md)

## Properties

### gqlErrors

• **gqlErrors**: GraphQLError[]

_Defined in [src/GraphQLExecutionError.ts:4](https://github.com/Flatbook/buzz.js/blob/e8046c4/src/GraphQLExecutionError.ts#L4)_

---

### message

• **message**: string

_Inherited from [GraphQLExecutionError](graphqlexecutionerror.md).[message](graphqlexecutionerror.md#message)_

_Defined in node_modules/typescript/lib/lib.es5.d.ts:974_

---

### name

• **name**: string

_Inherited from [GraphQLExecutionError](graphqlexecutionerror.md).[name](graphqlexecutionerror.md#name)_

_Defined in node_modules/typescript/lib/lib.es5.d.ts:973_

---

### stack

• `Optional` **stack**: string

_Inherited from [GraphQLExecutionError](graphqlexecutionerror.md).[stack](graphqlexecutionerror.md#stack)_

_Defined in node_modules/typescript/lib/lib.es5.d.ts:975_

---

### Error

▪ `Static` **Error**: ErrorConstructor

_Defined in node_modules/typescript/lib/lib.es5.d.ts:984_

## Methods

### message

▸ `Static` `Private`**message**(`errors`: GraphQLError[]): string

_Defined in [src/GraphQLExecutionError.ts:11](https://github.com/Flatbook/buzz.js/blob/e8046c4/src/GraphQLExecutionError.ts#L11)_

#### Parameters:

| Name     | Type           |
| -------- | -------------- |
| `errors` | GraphQLError[] |

**Returns:** string
