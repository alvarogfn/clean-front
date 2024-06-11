export enum HttpStatusCode {
  unauthorized = 401,
  ok = 200,
  notFound = 404,
  serverError = 500,
  noContent = 204,
  badRequest = 400,
}

export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body?: T;
}
