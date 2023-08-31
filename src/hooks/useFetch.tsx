interface RequestBody {
  name?: string;
  email?: string;
}

const useFetch = () => {
  const fetchData = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: RequestBody
  ) => {
    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    } catch (error) {
      return error ? error : null;
    }
  };

  return { fetchData };
};

export default useFetch;
