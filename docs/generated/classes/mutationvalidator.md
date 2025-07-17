[**buzz.js Documentation v0.5.0**](../README.md)

---

[buzz.js Documentation](../README.md) / MutationValidator

# Class: MutationValidator\<TData, TVariables\>

Defined in: [validators.ts:76](https://github.com/Flatbook/buzz.js/blob/0bcb7dd776d01f1a717e3ab8b76084d265a535bd/src/validators.ts#L76)

## Extends

- `Validator`\<`TData`, `TVariables`\>

## Type Parameters

### TData

`TData` = `any`

### TVariables

`TVariables` _extends_ `OperationVariables` = `OperationVariables`

## Constructors

### Constructor

> **new MutationValidator**\<`TData`, `TVariables`\>(): `MutationValidator`\<`TData`, `TVariables`\>

#### Returns

`MutationValidator`\<`TData`, `TVariables`\>

#### Inherited from

`Validator<TData, TVariables>.constructor`

## Properties

### calls

> `protected` **calls**: (`QueryInvocation`\<`TData`, `TVariables`\> \| `MutationInvocation`\<`TData`, `TVariables`\>)[] = `[]`

Defined in: [validators.ts:30](https://github.com/Flatbook/buzz.js/blob/0bcb7dd776d01f1a717e3ab8b76084d265a535bd/src/validators.ts#L30)

#### Inherited from

`Validator.calls`

## Methods

### addCall()

> **addCall**(`invocation`): `void`

Defined in: [validators.ts:80](https://github.com/Flatbook/buzz.js/blob/0bcb7dd776d01f1a717e3ab8b76084d265a535bd/src/validators.ts#L80)

#### Parameters

##### invocation

`MutationInvocation`\<`TData`, `TVariables`\>

#### Returns

`void`

---

### getCalls()

> **getCalls**(): `MutationInvocation`\<`TData`, `TVariables`\>[]

Defined in: [validators.ts:84](https://github.com/Flatbook/buzz.js/blob/0bcb7dd776d01f1a717e3ab8b76084d265a535bd/src/validators.ts#L84)

Gets all recorded calls to this operation

#### Returns

`MutationInvocation`\<`TData`, `TVariables`\>[]

Array of operation invocations

#### Overrides

`Validator.getCalls`

---

### getMostRecentCall()

> **getMostRecentCall**(): `undefined` \| `MutationInvocation`\<`TData`, `TVariables`\>

Defined in: [validators.ts:88](https://github.com/Flatbook/buzz.js/blob/0bcb7dd776d01f1a717e3ab8b76084d265a535bd/src/validators.ts#L88)

Gets the most recent call to this operation

#### Returns

`undefined` \| `MutationInvocation`\<`TData`, `TVariables`\>

The most recent invocation or undefined

#### Overrides

`Validator.getMostRecentCall`
