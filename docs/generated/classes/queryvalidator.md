**@sonder/buzz.js**

> [Globals](../README.md) / QueryValidator

# Class: QueryValidator\<**TData, TVariables**>

## Type parameters

- TData
- TVariables

## Hierarchy

- [Validator](validator.md)\<[QueryInvocation](../interfaces/queryinvocation.md)\<TData, TVariables>>

  ↳ **QueryValidator**

## Index

### Constructors

- [constructor](queryvalidator.md#constructor)

### Methods

- [addCall](queryvalidator.md#addcall)
- [getCalls](queryvalidator.md#getcalls)

## Constructors

### constructor

\+ **new QueryValidator**(): [QueryValidator](queryvalidator.md)

_Inherited from [Validator](validator.md).[constructor](validator.md#constructor)_

_Defined in [src/validators.ts:19](https://github.com/Flatbook/buzz.js/blob/50eafec/src/validators.ts#L19)_

**Returns:** [QueryValidator](queryvalidator.md)

## Methods

### addCall

▸ **addCall**(`invocation`: [QueryInvocation](../interfaces/queryinvocation.md)\<TData, TVariables>): void

_Inherited from [Validator](validator.md).[addCall](validator.md#addcall)_

_Defined in [src/validators.ts:29](https://github.com/Flatbook/buzz.js/blob/50eafec/src/validators.ts#L29)_

#### Parameters:

| Name         | Type                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| `invocation` | [QueryInvocation](../interfaces/queryinvocation.md)\<TData, TVariables> |

**Returns:** void

---

### getCalls

▸ **getCalls**(): [QueryInvocation](../interfaces/queryinvocation.md)\<TData, TVariables>[]

_Inherited from [Validator](validator.md).[getCalls](validator.md#getcalls)_

_Defined in [src/validators.ts:25](https://github.com/Flatbook/buzz.js/blob/50eafec/src/validators.ts#L25)_

**Returns:** [QueryInvocation](../interfaces/queryinvocation.md)\<TData, TVariables>[]
