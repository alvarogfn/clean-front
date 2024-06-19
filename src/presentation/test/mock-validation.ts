import type { Validation } from "@/presentation/protocols/validation";

export class ValidationStub implements Validation {
  errorMessage = "";

  public validate(): string {
    return this.errorMessage;
  }
}
