import { baseApi } from "./baseApi";

export const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (data) => ({
        url: "/create-account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),

    getAccounts: builder.query({
      query: () => "/accounts",
      providesTags: ["Account"],
    }),

    getAccountById: builder.query({
      query: (id) => `/account/${id}`,
    }),

    updateAccount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-account/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),

    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `/delete-account/${id}`,
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
