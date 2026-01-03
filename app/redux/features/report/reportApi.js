import { baseApi } from "../../RootApi/api";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJournalReport: builder.query({
      query: () => "report/journal",
      providesTags: ["Report"],
    }),

    getBalanceSheet: builder.query({
      query: () => "report/balance-sheet",
      providesTags: ["Report"],
    }),

    getIncomeStatement: builder.query({
      query: () => "report/income-statement",
      providesTags: ["Report"],
    }),
  }),
});

export const {
  useGetJournalReportQuery,
  useGetBalanceSheetQuery,
  useGetIncomeStatementQuery,
} = reportApi;
