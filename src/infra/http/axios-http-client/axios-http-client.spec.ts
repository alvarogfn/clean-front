import { mockPostRequest } from "@/data/tests/mock-http-post";
import { mockAxios, mockHttpResponse } from "@/infra/tests/mock-axios";
import { AxiosHttpClient } from "./axios-http-client";

vi.mock("axios");

const makeSut = () => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return { mockedAxios, sut };
};

describe("AxiosHttpClient", () => {
  test("Should call axios with correct params", async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("Should return the correct statusCode and body", async () => {
    const { sut, mockedAxios } = makeSut();
    const promise = await sut.post(mockPostRequest());

    expect(promise).toEqual({
      body: mockedAxios.post.mock.results[1].value.data,
      statusCode: mockedAxios.post.mock.results[1].value.status,
    });
  });

  test("Should return the correct statusCode and body on failure", async () => {
    const { sut, mockedAxios } = makeSut();

    const response = mockHttpResponse();

    mockedAxios.post.mockRejectedValueOnce({
      response,
    });

    const promise = await sut.post(mockPostRequest());

    expect(promise).toEqual({
      body: response.data,
      statusCode: response.status,
    });
  });
});
