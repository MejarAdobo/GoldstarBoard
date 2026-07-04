import axios, { isAxiosError } from "axios";

import type { ApiError } from "@goldstarboard/shared-types/interfaces";

export const fetchData = async (url: string) => {
  // Todo: add to config package
  const config = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  try {
    const resp = await axios.get(url, config);

    if (!resp.data) {
      throw new Error(`No data returned from [${url}]`);
    }

    return resp.data;
  } catch (error) {
    if (isAxiosError<ApiError>(error)) {
      console.error(error.response?.data.message);
      console.error(error.response?.status);
    }
    throw error;
  }
};
