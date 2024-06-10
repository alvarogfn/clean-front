import type { AccountModel } from "@/domain/model/account-model";
import type { AuthenticationParams } from "@/domain/usecases/authentication";
import { faker } from "@faker-js/faker";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
});
