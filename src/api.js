const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const fetchDataFromBackend = async (endpoint, options = {}) => {
  try {
    console.log(`Fetching: ${BACKEND_API_URL}${endpoint}`);
    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
