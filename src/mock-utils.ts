/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IMockFn, IMocks } from "@graphql-tools/mock";
import { mapValues, mergeWith } from "lodash";

export type Primitive = number | string | boolean;

export type Mock<T> = {
  [P in keyof T]: T[P] extends (infer U)[]
    ? (() => U)[]
    : T[P] extends Primitive
    ? () => Primitive
    : T[P] extends () => infer U
    ? () => U
    : Mock<T[P]>;
};

export type MockObject<T> = {
  [key: string]: Mock<T>;
};

/*
 * mergeMocks merges mock objects together. Since these mocks are functions, this code
 * merges the evaluated result of the function with the evaluated result of the merged mock
 *
 * https://www.apollographql.com/docs/apollo-server/testing/mocking/#customizing-mocks
 */
export function mergeMocks(o1: any, o2: any): any {
  const merged = mergeWith(o1, o2, (objectValue: any, sourceValue: any) => {
    let v1 = objectValue;
    let v2 = sourceValue;

    if (objectValue instanceof Function) {
      v1 = objectValue();
    }

    if (sourceValue instanceof Function) {
      v2 = sourceValue();
    }

    const nonNullValues = [v1, v2].filter(v => !!v);
    if (nonNullValues.length === 0) {
      return {};
    } else if (nonNullValues.length === 1) {
      return expandMockValue(nonNullValues[0]);
    }

    if (typeof v1 !== typeof v2) {
      throw new Error(`mock type mismatch: ${typeof v1} - ${typeof v2}`);
    }

    if (v1 instanceof Object && v2 instanceof Object) {
      return (): any => ({ ...v1, ...v2 });
    } else if (v1 instanceof Array && v2 instanceof Array) {
      return (): any[] => v1.concat(v2);
    } else {
      return (): any => v1;
    }
  });

  const expanded = expandMockValue(merged);
  return expanded;
}

export function expandMockValue<T>(value: Mock<T>, r = 0): any {
  debugger;
  if (value instanceof Array) {
    const mappedValues = value.map(element => expandMockValue(element, r + 1));
    return () => mappedValues;
  } else if (value instanceof Function) {
    const functionResult = value();
    return expandMockValue(functionResult, r + 1);
  } else if (value instanceof Object) {
    const mappedValues = mapValues(value, v =>
      expandMockValue(v, r + 1),
    ) as IMocks;
    if (r > 0) {
      return () => mappedValues;
    }
    return mappedValues;
  } else {
    return () => value as IMockFn;
  }
}
