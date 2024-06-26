import type { Validation } from "@/presentation/protocols/validation";

export class ValidationStub implements Validation {
  public errorMessage: string | null = "";

  public validate(): string {
    return this.errorMessage as string;
  }
}
