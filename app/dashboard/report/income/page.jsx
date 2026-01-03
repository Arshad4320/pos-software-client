"use client";

import React from "react";
import { useGetIncomeStatementQuery } from "@/app/redux/features/report/reportApi";
import {
  Wallet,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
} from "lucide-react";

const IncomeStateMent = () => {
  const { data, isLoading } = useGetIncomeStatementQuery();
  const statement = data?.data;

  const totalRevenue =
    statement?.revenue?.reduce((acc, curr) => acc + curr.balance, 0) || 0;
  const totalExpense =
    statement?.expense?.reduce((acc, curr) => acc + curr.balance, 0) || 0;
  const netProfit = statement?.netProfit || 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">
          Loading..
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* --- Header Section --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-xl text-white shadow-lg shadow-indigo-200">
            <PieChart size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Income Statement
            </h1>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl hover:bg-slate-50 transition-all font-bold shadow-sm">
          <Download size={18} /> Export PDF
        </button>
      </div>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          amount={totalRevenue}
          icon={<ArrowUpRight size={22} />}
          type="up"
        />
        <StatCard
          title="Total Expense"
          amount={totalExpense}
          icon={<ArrowDownRight size={22} />}
          type="down"
        />
        <StatCard
          title="Net Income"
          amount={netProfit}
          icon={<Wallet size={22} />}
          type={netProfit >= 0 ? "profit" : "loss"}
        />
      </div>

      {/* --- Main Report Table --- */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Account Details
                </th>
                <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest text-center">
                  Type
                </th>
                <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest text-right">
                  Balance
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {statement?.revenue?.map((item) => (
                <ReportRow
                  key={item._id}
                  item={item}
                  color="text-emerald-600"
                  dotColor="bg-emerald-500"
                />
              ))}
              {statement?.expense?.map((item) => (
                <ReportRow
                  key={item._id}
                  item={item}
                  color="text-rose-600"
                  dotColor="bg-rose-500"
                />
              ))}
              {!statement?.revenue?.length && !statement?.expense?.length && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-8 py-16 text-center text-slate-400 font-medium italic"
                  >
                    data not found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- New Premium Footer --- */}
        <div className="p-8 bg-slate-50/50 border-t border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-3 h-12 rounded-full ${
                  netProfit >= 0 ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Final Calculation
                </p>
                <h3 className="text-xl font-black text-slate-800">
                  Net Profit / Loss
                </h3>
              </div>
            </div>

            <div className="bg-white px-10 py-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-end">
              <span className="text-[11px] font-bold text-slate-400 uppercase mb-1">
                Total Amount
              </span>
              <p
                className={`text-4xl font-black tracking-tighter ${
                  netProfit >= 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                <span className="text-base font-medium text-slate-400 mr-1.5 font-sans italic text-xl">
                  ৳
                </span>
                {netProfit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportRow = ({ item, color, dotColor }) => (
  <tr className="hover:bg-slate-50/30 transition-colors group">
    <td className="px-8 py-6">
      <div className="flex items-center gap-4">
        <div
          className={`w-2 h-2 rounded-full ${dotColor} opacity-40 group-hover:opacity-100 transition-opacity`}
        />
        <div className="flex flex-col">
          <span className="text-lg font-bold text-slate-800 leading-tight">
            {item.name}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Ref: {item._id.slice(-8).toUpperCase()}
          </span>
        </div>
      </div>
    </td>
    <td className="px-8 py-6 text-center">
      <span className="text-xs font-black uppercase px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
        {item.type}
      </span>
    </td>
    <td className={`px-8 py-6 text-right text-xl font-extrabold ${color}`}>
      ৳ {item.balance.toLocaleString()}
    </td>
  </tr>
);

const StatCard = ({ title, amount, icon, type }) => {
  const styles = {
    up: "bg-emerald-50 text-emerald-600 border-emerald-100",
    down: "bg-rose-50 text-rose-600 border-rose-100",
    profit: "bg-indigo-50 text-indigo-600 border-indigo-100",
    loss: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className="bg-white border border-slate-200 p-7 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <div
          className={`p-3.5 rounded-2xl ${styles[type]} border shadow-inner`}
        >
          {icon}
        </div>
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
          {title}
        </span>
      </div>
      <p className="text-3xl font-black text-slate-900 tracking-tight">
        <span className="text-base font-medium text-slate-400 mr-1.5 font-sans italic text-xl">
          ৳
        </span>
        {Math.abs(amount).toLocaleString()}
      </p>
    </div>
  );
};

export default IncomeStateMent;
