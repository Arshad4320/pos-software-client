import { baseApi } from "../../RootApi/api";

export const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (data) => ({
        url: "account/create-account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),

    getAccounts: builder.query({
      query: () => "account/accounts",
      providesTags: ["Account", "Transaction"],
    }),

    getAccountById: builder.query({
      query: (id) => `account/account/${id}`,
    }),

    updateAccount: builder.mutation({
      query: ({ id, data }) => ({
        url: `account/update-account/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Account", "Transaction"],
    }),

    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `account/delete-account/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useGetAccountsQuery,
  useGetAccountByIdQuery,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = accountApi;
