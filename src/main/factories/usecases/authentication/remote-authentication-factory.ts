import { RemoteAuthentication } from "@/data/usecases/remote-authentication/remote-authentication";
import type { Authentication } from "@/domain/usecases/authentication";
import { makeApiUrl } from "@/main/factories/http/api-url-factory";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory";

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient());
};
