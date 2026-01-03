"use client";

import React from "react";
import {
  useDeleteAccountMutation,
  useGetAccountsQuery,
} from "@/app/redux/features/accounts/accountApi";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
// Lucide React থেকে সঠিক আইকন নাম ইমপোর্ট করা হলো
import {
  Wallet,
  Activity,
  Layers,
  TrendingUp,
  TrendingDown,
  Calendar,
  Landmark,
  Info,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const AccountHome = () => {
  const { data, isLoading } = useGetAccountsQuery();
  const [deleteAccount] = useDeleteAccountMutation();

  const getStyle = (type) => {
    const config = {
      Asset: { color: "text-emerald-600", bg: "bg-emerald-50", icon: Landmark },
      Liability: { color: "text-rose-600", bg: "bg-rose-50", icon: Activity },
      Equity: { color: "text-blue-600", bg: "bg-blue-50", icon: Layers },
      Income: { color: "text-amber-600", bg: "bg-amber-50", icon: TrendingUp },
      Expense: {
        color: "text-purple-600",
        bg: "bg-purple-50",
        icon: TrendingDown,
      },
    };
    return (
      config[type] || { color: "text-slate-600", bg: "bg-slate-50", icon: Info }
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই অ্যাকাউন্টটি ডিলিট করতে চান?")) {
      try {
        await deleteAccount(id).unwrap();
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 font-medium animate-pulse text-sm">
          Synchronizing Ledgers...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 p-4">
      {/* --- Minimal Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-100 pb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Accounts Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Manage and track your chart of accounts in real-time.
          </p>
        </div>
        <div className="bg-slate-900 text-white px-5 py-2 rounded-full flex items-center gap-3 shadow-xl shadow-slate-200">
          <span className="text-[11px] font-bold uppercase tracking-wider opacity-70 border-r border-white/20 pr-3 font-sans">
            Total Accounts
          </span>
          <span className="text-lg font-bold">{data?.data?.length || 0}</span>
        </div>
      </div>

      {/* --- Account Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((account) => {
          const style = getStyle(account.type);
          const IconComponent = style.icon;

          return (
            <div
              key={account._id}
              className="group relative bg-white border border-slate-100 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-[0_20px_50px_rgba(79,70,229,0.05)] overflow-hidden"
            >
              {/* Subtle Decorative Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50/50 to-transparent rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header: Icon & Actions */}
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`w-12 h-12 rounded-xl ${style.bg} ${style.color} flex items-center justify-center shadow-sm`}
                  >
                    <IconComponent size={22} />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={`/dashboard/accounts/edit-account/${account?._id}`}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      <FaRegEdit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(account?._id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </div>
                </div>

                {/* Name & Type Badge */}
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${style.color}`}
                    >
                      {account.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {account.name}
                  </h3>
                </div>

                {/* Balance Section */}
                <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Current Balance
                    </p>
                    <p className="text-xl font-black text-slate-900">
                      ৳ {account.balance?.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Date Footer */}
                <div className="mt-4 flex items-center gap-1.5 text-slate-300 text-[10px] font-medium">
                  <Calendar size={12} />
                  <span>
                    Opened {new Date(account.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountHome;
