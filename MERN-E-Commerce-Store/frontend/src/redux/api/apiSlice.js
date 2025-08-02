import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ 
  baseUrl: BASE_URL,
  credentials: 'include', // This ensures cookies are sent with requests
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
