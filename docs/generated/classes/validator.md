**@sonder/buzz.js**

> [Globals](../README.md) / Validator

# Class: Validator\<**InvocationT**>

## Type parameters

- InvocationT

## Hierarchy

- **Validator**

  ↳ [QueryValidator](queryvalidator.md)

  ↳ [MutationValidator](mutationvalidator.md)

## Index

### Constructors

- [constructor](validator.md#constructor)

### Properties

- [calls](validator.md#calls)

### Methods

- [addCall](validator.md#addcall)
- [getCalls](validator.md#getcalls)

## Constructors

### constructor

\+ **new Validator**(): [Validator](validator.md)

_Defined in [src/validators.ts:19](https://github.com/Flatbook/buzz.js/blob/50eafec/src/validators.ts#L19)_

**Returns:** [Validator](validator.md)

## Properties

### calls

• `Private` **calls**: InvocationT[]

_Defined in [src/validators.ts:19](https://github.com/Flatbook/buzz.js/blob/50eafec/src/validators.ts#L19)_

## Methods

### addCall

▸ **addCall**(`invocation`: InvocationT): void

_Defined in [src/validators.ts:29](https://github.com/Flatbook/buzz.js/blob/50eafec/src/validators.ts#L29)_

#### Parameters:

| Name         | Type        |
| ------------ | ----------- |
| `invocation` | InvocationT |

**Returns:** void

---

### getCalls

▸ **getCalls**(): InvocationT[]

_Defined in [src/validators.ts:25](https://github.com/Flatbook/buzz.js/blob/50eafec/src/validators.ts#L25)_

**Returns:** InvocationT[]
