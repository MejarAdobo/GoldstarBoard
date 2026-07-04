import axios, { isAxiosError } from "axios";

import type { ApiError } from "@goldstarboard/shared-types/interfaces";

export const fetchData = async (url: string) => {
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

      if (resp.status === 204) {
        console.warn(`[Warning] Station returned 204 No Content (offline): ${url}`);
        return null;
      }

      if (resp.data === undefined || resp.data === null || resp.data === "") {
        console.warn(`[Warning] Received empty payload from: ${url}`);
        return null;
      }

      return resp.data;
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        console.error("Axios Error Message:", error.response?.data?.message || error.message);
        console.error("Status Code:", error.response?.status);
      } else {
        console.error("Unexpected Error:", error);
      }

      return null;
    }
  };
