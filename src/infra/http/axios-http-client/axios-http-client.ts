import type { HttpPostClient, HttpPostParams } from "@/data/protocols/http/http-post-client";
import type { HttpResponse } from "@/data/protocols/http/http-response";
import axios from "axios";

export class AxiosHttpClient<T = unknown, R = unknown> implements HttpPostClient<T, R> {
  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    const httpResponse = await axios.post(params.url, params.body);

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
