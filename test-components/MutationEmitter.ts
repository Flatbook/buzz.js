import { EventEmitter } from "events";

export const MUTATION_EMIT_KEY = "call_mutation";
export const MUTATION_RESULT_KEY = "mutation_result";

export class MutationEmitter<TData = any> extends EventEmitter {
  callMutation(): void {
    this.emit(MUTATION_EMIT_KEY);
  }

  mutationResult(data: TData): void {
    this.emit(MUTATION_RESULT_KEY, data);
  }

  onMutationResult(callback: (data: TData) => void): void {
    this.on(MUTATION_RESULT_KEY, callback);
  }
}
