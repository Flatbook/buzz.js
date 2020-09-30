**@sonder/buzz.js**

> [Globals](../README.md) / MutationValidator

# Class: MutationValidator\<**TData, TVariables**>

## Type parameters

- TData
- TVariables

## Hierarchy

- [Validator](validator.md)\<[MutationInvocation](../interfaces/mutationinvocation.md)\<TData, TVariables>>

  ↳ **MutationValidator**

## Index

### Constructors

- [constructor](mutationvalidator.md#constructor)

### Methods

- [addCall](mutationvalidator.md#addcall)
- [getCalls](mutationvalidator.md#getcalls)

## Constructors

### constructor

\+ **new MutationValidator**(): [MutationValidator](mutationvalidator.md)

_Inherited from [Validator](validator.md).[constructor](validator.md#constructor)_

_Defined in [src/validators.ts:19](https://github.com/Flatbook/buzz.js/blob/fad7f48/src/validators.ts#L19)_

**Returns:** [MutationValidator](mutationvalidator.md)

## Methods

### addCall

▸ **addCall**(`invocation`: [MutationInvocation](../interfaces/mutationinvocation.md)\<TData, TVariables>): void

_Inherited from [Validator](validator.md).[addCall](validator.md#addcall)_

_Defined in [src/validators.ts:29](https://github.com/Flatbook/buzz.js/blob/fad7f48/src/validators.ts#L29)_

#### Parameters:

| Name         | Type                                                                          |
| ------------ | ----------------------------------------------------------------------------- |
| `invocation` | [MutationInvocation](../interfaces/mutationinvocation.md)\<TData, TVariables> |

**Returns:** void

---

### getCalls

▸ **getCalls**(): [MutationInvocation](../interfaces/mutationinvocation.md)\<TData, TVariables>[]

_Inherited from [Validator](validator.md).[getCalls](validator.md#getcalls)_

_Defined in [src/validators.ts:25](https://github.com/Flatbook/buzz.js/blob/fad7f48/src/validators.ts#L25)_

**Returns:** [MutationInvocation](../interfaces/mutationinvocation.md)\<TData, TVariables>[]
