/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { readFileSync } from "fs";
import { IMocks } from "@graphql-tools/mock";

/**
 * @ignore
 */
let DefaultSchema: string | null = null;

/**
 * @ignore
 */
let DefaultMocks: IMocks = {};

/**
 * @ignore
 */
export function setDefaultSchema(schema: string | null): void {
  DefaultSchema = schema;
}

export function getDefaultSchema(): string | null {
  return DefaultSchema;
}

/**
 * @ignore
 */
export function getDefaultMocks(): IMocks {
  return DefaultMocks;
}

export function loadSchemaFile(filepath: string): void {
  const schema = readFileSync(filepath, "utf8");

  setDefaultSchema(schema);
}

export function setMocks(mocks: IMocks): void {
  DefaultMocks = mocks;
}
