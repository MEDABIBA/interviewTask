import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Message } from "../types/types";

export const messagesApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getAllMessages: builder.query<Message[], void>({
      query: () => ``,
    }),
    getAMessageById: builder.query<{ id: number; message: string }, number>({
      query: (id) => `${id}`,
    }),
    postMessage: builder.mutation({
      query: ({ ...patch }) => ({
        url: ``,
        method: "POST",
        body: patch,
      }),

      invalidatesTags: ["Messages"],
    }),
    editMessage: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${id}`,
        method: "PUT",
        body: patch,
      }),

      invalidatesTags: ["Messages"],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Messages"],
    }),
  }),
});
export const {
  useGetAllMessagesQuery,
  useGetAMessageByIdQuery,
  usePostMessageMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
