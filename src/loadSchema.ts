import gql from "graphql-tag";

import { DocumentNode } from "graphql";

let DefaultSchema: DocumentNode | null = null;

export function setDefaultSchema(schema: DocumentNode): void {
  DefaultSchema = schema;
}

export function getDefaultSchema(): DocumentNode | null {
  return DefaultSchema;
}

export function loadSchema(schema: string | DocumentNode): void {
  if (typeof schema === "string") {
    setDefaultSchema(gql`
      ${schema}
    `);
  } else {
    setDefaultSchema(schema);
  }
}
