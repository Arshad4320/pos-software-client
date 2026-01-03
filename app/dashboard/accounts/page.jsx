"use client";
import {
  useDeleteAccountMutation,
  useGetAccountsQuery,
} from "@/app/redux/features/accounts/accountApi";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEyeOff } from "react-icons/fi";

import Link from "next/link";
const typeConfig = {
  Asset: {
    badge: "bg-green-500/10 text-green-600",
    bar: "bg-green-500",
  },
  Liability: {
    badge: "bg-red-500/10 text-red-600",
    bar: "bg-red-500",
  },
  Equity: {
    badge: "bg-blue-500/10 text-blue-600",
    bar: "bg-blue-500",
  },
  Income: {
    badge: "bg-yellow-500/10 text-yellow-600",
    bar: "bg-yellow-500",
  },
  Expense: {
    badge: "bg-purple-500/10 text-purple-600",
    bar: "bg-purple-500",
  },
};

const AccountHome = () => {
  const { data, isLoading } = useGetAccountsQuery();
  const [deleteAccount] = useDeleteAccountMutation();
  const handleDelete = async (id) => {
    try {
      const result = await deleteAccount(id);
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray-400 text-sm">
        Loading chart of accounts...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {data?.data?.map((account) => {
        const cfg = typeConfig[account.type] || {};

        return (
          <div
            key={account._id}
            className="group relative overflow-hidden rounded-2xl bg-white shadow  "
          >
            {/* Top Color Bar */}
            <div className={`h-1.5 w-full ${cfg.bar}`} />

            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between flex-row">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                    {account.name}
                  </h3>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${cfg.badge}`}
                  >
                    {account.type}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400">
                    Balance
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    ৳ {account.balance.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex justify-between py-3">
                <p className="mt-4 text-sm text-gray-500">
                  Created on{" "}
                  <span className="font-medium text-gray-500">
                    {new Date(account.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/accounts/edit-account/${account?._id}`}
                  >
                    {" "}
                    <FaRegEdit className="text-blue-500" size={20} />
                  </Link>

                  <AiOutlineDelete
                    onClick={() => {
                      handleDelete(account?._id);
                    }}
                    className="text-red-500"
                    size={20}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountHome;
