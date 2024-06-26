import type { HttpPostClient, HttpPostParams } from "@/data/protocols/http/http-post-client";
import type { HttpResponse } from "@/data/protocols/http/http-response";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

export class AxiosHttpClient<T = unknown, R = unknown> implements HttpPostClient<T, R> {
  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    let httpResponse: AxiosResponse<R>;

    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (error) {
      httpResponse = (error as AxiosError<R>).response as AxiosResponse<R>;
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
