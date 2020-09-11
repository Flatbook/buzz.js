/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { readFileSync } from "fs";
import { IMocks } from "@graphql-tools/mock";

import { expandMockValue } from "./mock-utils";

let DefaultSchema: string | null = null;
let DefaultMocks: IMocks = {};

export function setDefaultSchema(schema: string): void {
  DefaultSchema = schema;
}

export function getDefaultSchema(): string | null {
  return DefaultSchema;
}

export function getDefaultMocks(): IMocks {
  return DefaultMocks;
}

export async function loadSchemaFile(filepath: string): Promise<void> {
  const schema = readFileSync(filepath, "utf8");

  setDefaultSchema(schema);
}

export function setMocks(mocks: any): void {
  DefaultMocks = expandMockValue(mocks);
}
