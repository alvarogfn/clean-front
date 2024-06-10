import type { HttpPostParams } from "@/data/protocols/http/http-post-client";
import { faker } from "@faker-js/faker";

export const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: {
    [faker.person.firstName()]: faker.person.bio(),
  },
});
