"use client";

import { useGetJournalReportQuery } from "@/app/redux/features/report/reportApi";
import {
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
  Wallet,
  Hash,
  ArrowRightLeft,
} from "lucide-react";

const JournalPage = () => {
  const { data, isLoading } = useGetJournalReportQuery();
  const journals = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
              <ArrowRightLeft className="text-orange-500" /> Journal Ledger
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Detailed breakdown of debit and credit transactions.
            </p>
          </div>
        </div>

        {/* Responsive Grid/List */}
        <div className="grid grid-cols-1 gap-6">
          {journals.map((entry) => (
            <div
              key={entry._id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* TOP BAR: Meta Info */}
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Calendar size={14} className="text-orange-500" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-slate-400">
                    <Hash size={14} />
                    <span className="text-[10px] font-mono uppercase tracking-tighter">
                      TXN-{entry._id.slice(-6)}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    entry.transactionType === "Payment"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {entry.transactionType}
                </span>
              </div>

              {/* MAIN CONTENT */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* ACCOUNTS (Debit & Credit) */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* Decorative Connector for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-sm text-slate-400">
                        <ArrowRightLeft size={14} />
                      </div>
                    </div>

                    {/* Debit Account Card */}
                    <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowDownLeft size={18} className="text-emerald-600" />
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                          Debit Account
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-800 leading-tight">
                        {entry.debitAccount?.name}
                      </h4>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500 px-2 py-0.5 bg-white rounded border border-emerald-100">
                          {entry.debitAccount?.type}
                        </span>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 uppercase font-medium leading-none">
                            A/C Balance
                          </p>
                          <p className="text-sm font-bold text-slate-700">
                            ৳{entry.debitAccount?.balance?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Credit Account Card */}
                    <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowUpRight size={18} className="text-rose-600" />
                        <span className="text-[10px] font-bold text-rose-700 uppercase tracking-widest">
                          Credit Account
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-800 leading-tight">
                        {entry.creditAccount?.name}
                      </h4>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500 px-2 py-0.5 bg-white rounded border border-rose-100">
                          {entry.creditAccount?.type}
                        </span>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 uppercase font-medium leading-none">
                            A/C Balance
                          </p>
                          <p className="text-sm font-bold text-slate-700">
                            ৳{entry.creditAccount?.balance?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right space-y-2 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Wallet size={16} />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Transaction Amount
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-400 mr-1">
                        BDT
                      </span>
                      <span className="text-4xl font-black text-slate-900 leading-none">
                        {entry.amount?.toLocaleString()}
                      </span>
                    </div>
                    {entry.description && (
                      <div className="mt-4 flex items-start gap-2 bg-slate-50 p-3 rounded-lg w-full">
                        <FileText
                          size={16}
                          className="text-orange-400 shrink-0 mt-0.5"
                        />
                        <p className="text-xs text-slate-500 text-left italic">
                          "{entry.description}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* FOOTER: System Timestamps */}
              <div className="px-6 py-2 bg-slate-50/50 border-t border-slate-100 flex justify-center md:justify-end gap-4">
                <p className="text-[10px] text-slate-400">
                  Created: {new Date(entry.createdAt).toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-400">
                  Updated: {new Date(entry.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
