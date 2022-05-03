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
- [getMostRecentCall](queryvalidator.md#getmostrecentcall)

## Constructors

### constructor

\+ **new QueryValidator**(): [QueryValidator](queryvalidator.md)

_Inherited from [Validator](validator.md).[constructor](validator.md#constructor)_

_Defined in [src/validators.ts:21](https://github.com/Flatbook/buzz.js/blob/d165dd5/src/validators.ts#L21)_

**Returns:** [QueryValidator](queryvalidator.md)

## Methods

### addCall

▸ **addCall**(`invocation`: [QueryInvocation](../interfaces/queryinvocation.md)\<TData, TVariables>): void

_Inherited from [Validator](validator.md).[addCall](validator.md#addcall)_

_Defined in [src/validators.ts:35](https://github.com/Flatbook/buzz.js/blob/d165dd5/src/validators.ts#L35)_

#### Parameters:

| Name         | Type                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| `invocation` | [QueryInvocation](../interfaces/queryinvocation.md)\<TData, TVariables> |

**Returns:** void

---

### getCalls

▸ **getCalls**(): [QueryInvocation](../interfaces/queryinvocation.md)\<TData, TVariables>[]

_Inherited from [Validator](validator.md).[getCalls](validator.md#getcalls)_

_Defined in [src/validators.ts:27](https://github.com/Flatbook/buzz.js/blob/d165dd5/src/validators.ts#L27)_

**Returns:** [QueryInvocation](../interfaces/queryinvocation.md)\<TData, TVariables>[]

---

### getMostRecentCall

▸ **getMostRecentCall**(): [QueryInvocation](../interfaces/queryinvocation.md)\<TData, TVariables> \| undefined

_Inherited from [Validator](validator.md).[getMostRecentCall](validator.md#getmostrecentcall)_

_Defined in [src/validators.ts:31](https://github.com/Flatbook/buzz.js/blob/d165dd5/src/validators.ts#L31)_

**Returns:** [QueryInvocation](../interfaces/queryinvocation.md)\<TData, TVariables> \| undefined
