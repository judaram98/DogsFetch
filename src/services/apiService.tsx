type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string | FormData;
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

// export async function postData<T>(
//   url: string,
//   body: Record<string, any>,
//   options: RequestOptions = { method: "POST" }
// ): Promise<T> {
//   const requestOptions: RequestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     body: JSON.stringify(body),
//     ...options,
//   };

//   const response = await request(url, requestOptions);
//   const data = await response.json();
//   return data;
// }

// Puedes agregar funciones similares para PUT y DELETE si es necesario

// Exporta todas las funciones que quieras usar en tus componentes
const apiService = {
  fetchData,
  //   postData,
};

export default apiService;
