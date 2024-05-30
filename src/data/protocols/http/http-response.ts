export enum HttpStatusCode {
  unauthorized = 401,
  ok = 200,
  notFound = 404,
  serverError = 500,
  noContent = 204,
  badRequest = 400,
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  // biome-ignore lint/suspicious/noExplicitAny:
  body?: T;
};
