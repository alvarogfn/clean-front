import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { HttpClientSpy } from "@/data/tests/mock-http-client";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import type { AccountModel } from "@/domain/model/account-model";
import { mockAccountModel, mockAuthentication } from "@/domain/tests/mock-account";
import type { AuthenticationParams } from "@/domain/usecases/authentication";
import { faker } from "@faker-js/faker";
import { describe, expect } from "vitest";
import { RemoteAuthentication } from "./remote-authentication";

const makeSut = ({ url = faker.internet.url() }) => {
  const httpPostClientSpy = new HttpClientSpy<AuthenticationParams, AccountModel>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    url,
    httpPostClientSpy,
    sut,
  };
};

describe("RemoteAuthentication", () => {
  test("should call HttpClient with correct URL", async () => {
    const url = faker.internet.url();

    const { sut, httpPostClientSpy } = makeSut({ url });

    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  test("should call HttpPostClient with correct Body", async () => {
    const { sut, httpPostClientSpy } = makeSut({});

    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test("should throw invalid credential error if httpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut({});

    httpPostClientSpy.response = { statusCode: HttpStatusCode.unauthorized };

    const promise = sut.auth(mockAuthentication());

    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("should throw UnexpectedError error if httpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut({});

    httpPostClientSpy.response = { statusCode: HttpStatusCode.unauthorized };

    const promise = sut.auth(mockAuthentication());

    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("should throw UnexpectedError error if httpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut({});

    httpPostClientSpy.response = { statusCode: HttpStatusCode.badRequest };

    const promise = sut.auth(mockAuthentication());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError error if httpPostClient returns 500", async () => {
    const { sut, httpPostClientSpy } = makeSut({});

    httpPostClientSpy.response = { statusCode: HttpStatusCode.serverError };

    const promise = sut.auth(mockAuthentication());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError error if httpPostClient returns 404", async () => {
    const { sut, httpPostClientSpy } = makeSut({});

    httpPostClientSpy.response = { statusCode: HttpStatusCode.notFound };

    const promise = sut.auth(mockAuthentication());

    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should return a AccountModel if HttpPostClient returns 200", async () => {
    const { sut, httpPostClientSpy } = makeSut({});

    const httpResult = mockAccountModel();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,

      body: httpResult,
    };

    const account = await sut.auth(mockAuthentication());

    expect(account).toEqual(httpResult);
  });
});
