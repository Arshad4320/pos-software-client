import { baseApi } from "./baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: (data) => ({
        url: "/create-transaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    getTransactions: builder.query({
      query: () => "/transactions",
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useCreateTransactionMutation, useGetTransactionsQuery } =
  transactionApi;
