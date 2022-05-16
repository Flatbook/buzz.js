/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// import { readFileSync } from "fs";
import { buildClientSchema, IntrospectionQuery } from "graphql";
import { IMocks } from "@graphql-tools/mock";

/**
 * @ignore
 */
let DefaultSchema: IntrospectionQuery | null = null;

/**
 * @ignore
 */
let DefaultMocks: IMocks = {};

/**
 * @ignore
 */
export function setDefaultSchema(schema: any): void {
  DefaultSchema = schema;
}

export function getDefaultSchema(): IntrospectionQuery | null {
  return DefaultSchema;
}

/**
 * @ignore
 */
export function getDefaultMocks(): IMocks {
  return DefaultMocks;
}

export function loadSchemaFile(filepath: IntrospectionQuery): void {
  // const schema = readFileSync(filepath, "utf8");
  const schema = buildClientSchema(filepath);

  setDefaultSchema(schema);
}

export function setMocks(mocks: IMocks): void {
  DefaultMocks = mocks;
}
