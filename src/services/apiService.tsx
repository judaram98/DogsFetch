type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string | FormData;
  credentials?: RequestCredentials;
  queryParams?: Record<string, string>;
}

async function request(
  url: string,
  options: RequestOptions
): Promise<Response> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Network response was not ok: ${response.status} - ${response.statusText}`
    );
  }
  return response;
}

export async function fetchData(
  url: string,
  options: RequestOptions = { method: "GET" }
): Promise<Response> {
  const response = await request(url, options);
  return response;
}

const apiService = {
  fetchData,
};

export default apiService;
