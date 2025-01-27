import { HttpResponse, IHttpOptions } from "@/utils/types";

export async function http<T>(
  segment: string,
  { method = "GET", headers = {}, body = null, ...options }: IHttpOptions = {}
): Promise<HttpResponse<T>> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${segment}`;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body,
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const data = await response.json();
      // For non-OK responses, assume the body contains error information
      throw createErrorResponse(data, response, config);
    }

    // If the response is OK, parse and return the data
    const data = await response.json();
    return createSuccessResponse(data, response, config);
  } catch (error) {
    console.log("E", error);
    // Catch unexpected errors like network issues or parsing errors
    const errorResponse = (error as HttpResponse<T>)
      ? error
      : createErrorResponse<T>(
          null,
          new Response(null, {
            status: 500,
            statusText: "Internal Server Error",
          }),
          config
        );
    return errorResponse as HttpResponse<T>;
  }
}

function createErrorResponse<T>(
  data: any,
  response: Response,
  config: RequestInit
): HttpResponse<T> {
  return {
    data: null,
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config,
    errors: data?.errors || { message: "Unknown error" },
  };
}

function createSuccessResponse<T>(
  data: T,
  response: Response,
  config: RequestInit
): HttpResponse<T> {
  return {
    data,
    ok: true,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config,
  };
}
