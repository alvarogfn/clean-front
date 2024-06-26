import type { AccountModel } from "@/domain/model/account-model";
import { mockAccountModel } from "@/domain/tests/mock-account";
import type { Authentication, AuthenticationParams } from "@/domain/usecases/authentication";

export class AuthenticationSpy implements Authentication {
  public account = mockAccountModel();
  public params: AuthenticationParams | null = null;
  async auth(_params: AuthenticationParams): Promise<AccountModel> {
    this.params = _params;
    return this.account;
  }
}
