import type { HttpPostClient, HttpPostParams } from "@/data/protocols/http/http-post-client";
import type { HttpResponse } from "@/data/protocols/http/http-response";
import axios from "axios";

export class AxiosHttpClient implements HttpPostClient<unknown, unknown> {
  async post(params: HttpPostParams<unknown>): Promise<HttpResponse<unknown>> {
    const httpResponse = await axios.post(params.url, params.body);

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
