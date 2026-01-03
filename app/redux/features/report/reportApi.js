import { baseApi } from "../../RootApi/api";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJournalReport: builder.query({
      query: () => "/journal",
      providesTags: ["Report"],
    }),

    getBalanceSheet: builder.query({
      query: () => "/balance-sheet",
      providesTags: ["Report"],
    }),

    getIncomeStatement: builder.query({
      query: () => "/income-statement",
      providesTags: ["Report"],
    }),
  }),
});

export const {
  useGetJournalReportQuery,
  useGetBalanceSheetQuery,
  useGetIncomeStatementQuery,
} = reportApi;
