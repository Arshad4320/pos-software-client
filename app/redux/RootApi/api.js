import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1",
    baseUrl: "https://pos-software-server.onrender.com/api/v1",
  }),
  tagTypes: ["Transaction", "Report", "Account"],
  endpoints: () => ({}),
});
