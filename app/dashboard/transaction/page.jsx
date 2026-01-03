"use client";

import React, { useState } from "react";
import {
  Eye,
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  FileText,
} from "lucide-react";
import { useGetTransactionsQuery } from "@/app/redux/features/transaction/transactionApi";

const TransactionList = () => {
  const { data, isLoading, isError } = useGetTransactionsQuery();
  const [search, setSearch] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">
        Failed to load transactions. Please try again.
      </div>
    );
  }

  const transactions =
    data?.data?.filter(
      (tx) =>
        tx.date?.toLowerCase().includes(search.toLowerCase()) ||
        tx.description?.toLowerCase().includes(search.toLowerCase()) ||
        tx.transactionType?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* TOP HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Transaction History
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Monitor and audit all your financial movements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-grow min-w-[280px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search description or type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm shadow-sm"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition shadow-sm">
              <Filter size={20} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-md font-semibold text-sm">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
                  Accounts involved
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
                  Description
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
                  Type
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest leading-none text-right">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest leading-none text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(tx.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[13px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-700 font-semibold">
                          {tx.debitAccount?.name}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">
                          DR
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[13px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        <span className="text-slate-700 font-semibold">
                          {tx.creditAccount?.name}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">
                          CR
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-[200px]">
                    <p
                      className="text-sm text-slate-600 truncate italic"
                      title={tx.description}
                    >
                      "{tx.description || "No notes available"}"
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        tx.transactionType === "Payment"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {tx.transactionType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`text-base font-black ${
                        tx.transactionType === "Payment"
                          ? "text-rose-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {tx.transactionType === "Payment" ? "-" : "+"} ৳
                      {tx.amount?.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="md:hidden space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    {tx.transactionType}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {new Date(tx.date).toLocaleDateString()}
                  </span>
                </div>
                <span
                  className={`text-lg font-black ${
                    tx.transactionType === "Payment"
                      ? "text-rose-600"
                      : "text-emerald-600"
                  }`}
                >
                  ৳{tx.amount?.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 uppercase font-bold tracking-tighter">
                    Debit
                  </span>
                  <span className="text-slate-800 font-bold">
                    {tx.debitAccount?.name}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 uppercase font-bold tracking-tighter">
                    Credit
                  </span>
                  <span className="text-slate-800 font-bold">
                    {tx.creditAccount?.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 text-slate-400 italic text-xs">
                  <FileText size={14} />
                  <span className="truncate max-w-[150px]">
                    {tx.description}
                  </span>
                </div>
                <button className="text-indigo-600 font-bold text-xs uppercase tracking-widest underline">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {transactions.length === 0 && (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl mt-6">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-300" size={30} />
            </div>
            <h3 className="text-slate-800 font-bold text-lg">
              No transactions found
            </h3>
            <p className="text-slate-500 text-sm">
              Try adjusting your search filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
