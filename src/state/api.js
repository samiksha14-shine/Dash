import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Topics",
    "Sectors",
    "Titles",
    "Impacts",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getSector: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getTopics: build.query({
      query: () => "client/topics",
      providesTags: ["Topics"],
    }),
    getPublishedyear: build.query({
      query: () => "client/sectors",
      providesTags: ["Sectors"],
    }),
    getTitles: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/Titles",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Titles"],
    }),
    getSales: build.query({
      query: () => "impacts/impacts",
      providesTags: ["Impacts"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetTopicsQuery,
  useGetSectorQuery,
  useGetTitlesQuery,
  useGetImpactsQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;