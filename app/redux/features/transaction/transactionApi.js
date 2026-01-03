import { baseApi } from "../../RootApi/api";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: (data) => ({
        url: "transaction/create-transaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    getTransactions: builder.query({
      query: () => "transaction/transactions",
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useCreateTransactionMutation, useGetTransactionsQuery } =
  transactionApi;
