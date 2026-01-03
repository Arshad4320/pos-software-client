"use client";

import { useGetBalanceSheetQuery } from "@/app/redux/features/report/reportApi";
import React from "react";
import {
  TrendingUp,
  Wallet,
  Landmark,
  PieChart,
  ArrowUpRight,
} from "lucide-react";

const BalanceSheet = () => {
  const { data, isLoading } = useGetBalanceSheetQuery();
  const report = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  const StatCard = ({ title, amount, icon: Icon, colorClass, bgColor }) => (
    <div
      className={`p-6 ${bgColor} rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between`}
    >
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className={`text-2xl font-black ${colorClass}`}>
          ৳ {amount?.toLocaleString()}
        </h3>
      </div>
      <div className={`p-3 rounded-xl bg-white shadow-sm`}>
        <Icon className={colorClass} size={24} />
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Financial Balance Sheet
          </h2>
          <p className="text-slate-500 mt-1">
            Real-time overview of your company's financial position.
          </p>
        </div>

        {/* Summary Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Assets"
            amount={report?.totalAssets}
            icon={Landmark}
            colorClass="text-emerald-600"
            bgColor="bg-emerald-50/50"
          />
          <StatCard
            title="Total Liabilities"
            amount={report?.totalLiability}
            icon={TrendingUp}
            colorClass="text-rose-600"
            bgColor="bg-rose-50/50"
          />
          <StatCard
            title="Total Equity"
            amount={report?.totalEquity}
            icon={PieChart}
            colorClass="text-blue-600"
            bgColor="bg-blue-50/50"
          />
        </div>

        {/* Detailed Breakdown Sections */}
        <div className="space-y-12">
          {/* ASSETS SECTION */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
              <div className="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">
                Assets Breakdown
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {report?.assets?.map((item) => (
                <AccountCard key={item._id} item={item} themeColor="emerald" />
              ))}
            </div>
          </section>

          {/* LIABILITIES SECTION */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
              <div className="h-8 w-1.5 bg-rose-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">
                Liabilities Breakdown
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {report?.liability?.map((item) => (
                <AccountCard key={item._id} item={item} themeColor="rose" />
              ))}
            </div>
          </section>

          {/* EQUITY SECTION */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
              <div className="h-8 w-1.5 bg-blue-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">
                Equity Breakdown
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {report?.equity?.map((item) => (
                <AccountCard key={item._id} item={item} themeColor="blue" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Internal Component for Account Cards
const AccountCard = ({ item, themeColor }) => {
  const colorMap = {
    emerald: "border-emerald-200 text-emerald-600 bg-emerald-50",
    rose: "border-rose-200 text-rose-600 bg-rose-50",
    blue: "border-blue-200 text-blue-600 bg-blue-50",
  };

  return (
    <div className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
            {item.name}
          </h4>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {item.type}
          </span>
        </div>
        <ArrowUpRight
          size={16}
          className="text-slate-300 group-hover:text-orange-400"
        />
      </div>

      <div className="mt-4">
        <p className="text-xs text-slate-500 mb-1 uppercase font-semibold">
          Current Balance
        </p>
        <p
          className={`text-xl font-black ${
            themeColor === "rose" ? "text-rose-600" : "text-slate-900"
          }`}
        >
          ৳ {item.balance.toLocaleString()}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
        <Wallet size={12} className="text-slate-300" />
        <span className="text-[10px] text-slate-400 font-medium italic">
          Since {new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default BalanceSheet;
