"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiArrowUpRight,
  FiArrowDownRight,
  FiActivity,
  FiPieChart,
  FiDollarSign,
  FiList,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useGetAccountsQuery } from "../redux/features/accounts/accountApi";
import { useGetTransactionsQuery } from "../redux/features/transaction/transactionApi";
import {
  useGetIncomeStatementQuery,
  useGetJournalReportQuery,
} from "../redux/features/report/reportApi";
import Link from "next/link";

const DashboardHome = () => {
  const { data: accounts, isLoading: accountsLoading } = useGetAccountsQuery();

  const { data: journal } = useGetJournalReportQuery();

  const businessStats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up",
      icon: <FiDollarSign />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Net Income",
      value: "$12,102.00",
      change: "+10.5%",
      trend: "up",
      icon: <FiTrendingUp />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Accounts",
      value: "24",
      change: "Stable",
      trend: "neutral",
      icon: <FiPieChart />,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Pending Trans.",
      value: "12",
      change: "-2.4%",
      trend: "down",
      icon: <FiActivity />,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Business Overview
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Real-time financial performance and journal summaries.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
            + New Transaction
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {businessStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div
                className={`p-3 rounded-xl ${stat.bg} ${stat.color} text-xl`}
              >
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-bold ${
                  stat.trend === "up" ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <FiArrowUpRight />
                ) : (
                  <FiArrowDownRight />
                )}{" "}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                {stat.title}
              </p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                {stat.value}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts & Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income vs Expenses Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800">
              Cash Flow Analytics
            </h3>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-md px-2 py-1 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Journal Summary (API: report/journal) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FiList className="text-blue-600" /> Recent Journal
          </h3>
          <div className="flex-1 space-y-4">
            {journal?.data?.slice(0, 5).map((item) => {
              const formattedDate = new Date(item.date).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                }
              );

              const isExpense =
                item.debitAccount?.type === "Expense" ||
                item.transactionType === "Payment";

              return (
                <div
                  key={item._id}
                  className="flex justify-between items-center p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-1 h-8 rounded-full ${
                        isExpense ? "bg-rose-400" : "bg-emerald-400"
                      }`}
                    />

                    <div>
                      <p className="text-sm font-bold text-slate-800 capitalize">
                        {item.description || "No Description"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                        {formattedDate} • {item.debitAccount?.name || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-sm font-bold ${
                        !isExpense ? "text-emerald-600" : "text-slate-700"
                      }`}
                    >
                      {!isExpense ? "+" : "-"}${item.amount?.toLocaleString()}
                    </span>
                    <p className="text-[12px] text-slate-400 italic">
                      via {item.creditAccount?.name}
                    </p>
                  </div>
                </div>
              );
            })}

            {journal?.data?.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm italic">
                No recent transactions found.
              </div>
            )}
          </div>
          <Link
            className="w-full mt-6 py-2.5 text-center text-xs font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all uppercase tracking-widest"
            href="dashboard/report/journal"
          >
            View All Reports
          </Link>
        </div>
      </div>

      {/* Account Status Table Area */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Chart of Accounts Status
              </h3>
              <p className="text-xs text-slate-500">
                Live balance overview across all accounts
              </p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md uppercase">
                {accounts?.data?.length || 0} Total Accounts
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Account Name
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">
                    Current Balance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {accounts?.data?.slice(0, 5).map((account) => (
                  <tr
                    key={account._id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                        {account.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-tight ${
                          account.type === "Asset"
                            ? "bg-emerald-50 text-emerald-600"
                            : account.type === "Liability"
                            ? "bg-rose-50 text-rose-600"
                            : account.type === "Equity"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {account.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(account.updatedAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-slate-900">
                        ${account.balance?.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Loading বা Empty State */}
            {!accounts?.data?.length && (
              <div className="p-8 text-center text-slate-400 text-sm italic">
                No account data available.
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-50/30 border-t border-slate-50 text-center">
            <button className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest">
              View All Accounts Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const chartData = [
  { name: "Jul", income: 4000 },
  { name: "Aug", income: 3000 },
  { name: "Sep", income: 5000 },
  { name: "Oct", income: 2780 },
  { name: "Nov", income: 1890 },
  { name: "Dec", income: 2390 },
];

export default DashboardHome;
