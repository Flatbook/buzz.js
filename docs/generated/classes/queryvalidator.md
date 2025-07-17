[**buzz.js Documentation v0.4.4**](../README.md)

---

[buzz.js Documentation](../README.md) / QueryValidator

# Class: QueryValidator\<TData, TVariables\>

Defined in: [validators.ts:56](https://github.com/Flatbook/buzz.js/blob/b6b990c75387d5345f670c58e688921c51432841/src/validators.ts#L56)

## Extends

- `Validator`\<`TData`, `TVariables`\>

## Type Parameters

### TData

`TData` = `any`

### TVariables

`TVariables` _extends_ `OperationVariables` = `OperationVariables`

## Constructors

### Constructor

> **new QueryValidator**\<`TData`, `TVariables`\>(): `QueryValidator`\<`TData`, `TVariables`\>

#### Returns

`QueryValidator`\<`TData`, `TVariables`\>

#### Inherited from

`Validator<TData, TVariables>.constructor`

## Properties

### calls

> `protected` **calls**: (`QueryInvocation`\<`TData`, `TVariables`\> \| `MutationInvocation`\<`TData`, `TVariables`\>)[] = `[]`

Defined in: [validators.ts:30](https://github.com/Flatbook/buzz.js/blob/b6b990c75387d5345f670c58e688921c51432841/src/validators.ts#L30)

#### Inherited from

`Validator.calls`

## Methods

### addCall()

> **addCall**(`invocation`): `void`

Defined in: [validators.ts:60](https://github.com/Flatbook/buzz.js/blob/b6b990c75387d5345f670c58e688921c51432841/src/validators.ts#L60)

#### Parameters

##### invocation

`QueryInvocation`\<`TData`, `TVariables`\>

#### Returns

`void`

---

### getCalls()

> **getCalls**(): `QueryInvocation`\<`TData`, `TVariables`\>[]

Defined in: [validators.ts:64](https://github.com/Flatbook/buzz.js/blob/b6b990c75387d5345f670c58e688921c51432841/src/validators.ts#L64)

Gets all recorded calls to this operation

#### Returns

`QueryInvocation`\<`TData`, `TVariables`\>[]

Array of operation invocations

#### Overrides

`Validator.getCalls`

---

### getMostRecentCall()

> **getMostRecentCall**(): `undefined` \| `QueryInvocation`\<`TData`, `TVariables`\>

Defined in: [validators.ts:68](https://github.com/Flatbook/buzz.js/blob/b6b990c75387d5345f670c58e688921c51432841/src/validators.ts#L68)

Gets the most recent call to this operation

#### Returns

`undefined` \| `QueryInvocation`\<`TData`, `TVariables`\>

The most recent invocation or undefined

#### Overrides

`Validator.getMostRecentCall`
