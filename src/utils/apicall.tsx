// import { ApiCallParams, ApiResponse } from "@/types/types";
import axios from "axios";

type ApiResponse<T> = {
  response: T | null;
  error: string | null;
};

export async function apicall({
  payload,
  url,
  method,
  access_token,
}: any): Promise<ApiResponse<any>> {
  let config: any = {
    method,
    url: `http://localhost:5000${url}`,
  };
  if (payload) {
    config.data = payload;
  }

  if (access_token) {
    config.headers = {
      "Content-Type": "application/json",
      authorization: `${access_token}`,
    };
  }
  // console.log("config", config);
  try {
    const { data } = await axios(config);
    return {
      response: data,
      error: null,
    };
  } catch (error: any) {
    console.log("error in api call", error);
    return {
      response: null,
      error:
        error.response?.data?.error || error.message || "Something went wrong",
    };
  }
  // return result;
}
