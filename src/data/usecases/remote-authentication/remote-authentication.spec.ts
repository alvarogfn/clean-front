import { HttpClientSpy } from "@/data/tests/mock-http-client";
import { mockAuthentication } from "@/domain/test/mock-authentication";
import { faker } from "@faker-js/faker";
import { describe, expect } from "vitest";
import { RemoteAuthentication } from "./remote-authentication";

const makeSut = ({ url = faker.internet.url() }) => {
  const httpPostClientSpy = new HttpClientSpy();
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
});
