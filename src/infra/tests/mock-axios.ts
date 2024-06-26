import { faker } from "@faker-js/faker";
import axios, { type Axios } from "axios";
import type { Mocked } from "vitest";

export const mockHttpResponse = () => ({
  data: { [faker.lorem.word()]: faker.lorem.word() },
  status: faker.number.int({ min: 200, max: 599 }),
});

export const mockAxios = () => {
  const mockedAxios = axios as unknown as Mocked<Axios>;

  mockedAxios.post.mockResolvedValue(mockHttpResponse());

  return mockedAxios;
};
