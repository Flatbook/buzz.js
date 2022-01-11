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
- [getMostRecentCall](mutationvalidator.md#getmostrecentcall)

## Constructors

### constructor

\+ **new MutationValidator**(): [MutationValidator](mutationvalidator.md)

_Inherited from [Validator](validator.md).[constructor](validator.md#constructor)_

_Defined in [src/validators.ts:21](https://github.com/Flatbook/buzz.js/blob/978d19a/src/validators.ts#L21)_

**Returns:** [MutationValidator](mutationvalidator.md)

## Methods

### addCall

▸ **addCall**(`invocation`: [MutationInvocation](../interfaces/mutationinvocation.md)\<TData, TVariables>): void

_Inherited from [Validator](validator.md).[addCall](validator.md#addcall)_

_Defined in [src/validators.ts:35](https://github.com/Flatbook/buzz.js/blob/978d19a/src/validators.ts#L35)_

#### Parameters:

| Name         | Type                                                                          |
| ------------ | ----------------------------------------------------------------------------- |
| `invocation` | [MutationInvocation](../interfaces/mutationinvocation.md)\<TData, TVariables> |

**Returns:** void

---

### getCalls

▸ **getCalls**(): [MutationInvocation](../interfaces/mutationinvocation.md)\<TData, TVariables>[]

_Inherited from [Validator](validator.md).[getCalls](validator.md#getcalls)_

_Defined in [src/validators.ts:27](https://github.com/Flatbook/buzz.js/blob/978d19a/src/validators.ts#L27)_

**Returns:** [MutationInvocation](../interfaces/mutationinvocation.md)\<TData, TVariables>[]

---

### getMostRecentCall

▸ **getMostRecentCall**(): [MutationInvocation](../interfaces/mutationinvocation.md)\<TData, TVariables> \| undefined

_Inherited from [Validator](validator.md).[getMostRecentCall](validator.md#getmostrecentcall)_

_Defined in [src/validators.ts:31](https://github.com/Flatbook/buzz.js/blob/978d19a/src/validators.ts#L31)_

**Returns:** [MutationInvocation](../interfaces/mutationinvocation.md)\<TData, TVariables> \| undefined
