import { EventEmitter } from "events";

export const MUTATION_EMIT_KEY = "call_mutation";

export class MutationEmitter extends EventEmitter {
  callMutation(): void {
    this.emit(MUTATION_EMIT_KEY);
  }
}
