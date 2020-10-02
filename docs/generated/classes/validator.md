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
- [getMostRecentCall](validator.md#getmostrecentcall)

## Constructors

### constructor

\+ **new Validator**(): [Validator](validator.md)

_Defined in [src/validators.ts:21](https://github.com/Flatbook/buzz.js/blob/03df908/src/validators.ts#L21)_

**Returns:** [Validator](validator.md)

## Properties

### calls

• `Private` **calls**: InvocationT[]

_Defined in [src/validators.ts:21](https://github.com/Flatbook/buzz.js/blob/03df908/src/validators.ts#L21)_

## Methods

### addCall

▸ **addCall**(`invocation`: InvocationT): void

_Defined in [src/validators.ts:35](https://github.com/Flatbook/buzz.js/blob/03df908/src/validators.ts#L35)_

#### Parameters:

| Name         | Type        |
| ------------ | ----------- |
| `invocation` | InvocationT |

**Returns:** void

---

### getCalls

▸ **getCalls**(): InvocationT[]

_Defined in [src/validators.ts:27](https://github.com/Flatbook/buzz.js/blob/03df908/src/validators.ts#L27)_

**Returns:** InvocationT[]

---

### getMostRecentCall

▸ **getMostRecentCall**(): InvocationT \| undefined

_Defined in [src/validators.ts:31](https://github.com/Flatbook/buzz.js/blob/03df908/src/validators.ts#L31)_

**Returns:** InvocationT \| undefined
