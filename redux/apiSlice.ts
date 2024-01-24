import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://json-server-9q2e.onrender.com";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
