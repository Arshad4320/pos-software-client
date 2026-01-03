"use client";

import React, { useState } from "react";
import { Eye, Pencil, Trash2, Plus, Search } from "lucide-react";
import { useGetTransactionsQuery } from "@/app/redux/features/transaction/transactionApi";

const TransactionList = () => {
  const { data, isLoading, isError } = useGetTransactionsQuery();
  const [search, setSearch] = useState("");
  const [activeRow, setActiveRow] = useState(null);

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading transactions...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load transactions</div>;
  }

  const transactions =
    data?.data?.filter(
      (tx) =>
        tx.description?.toLowerCase().includes(search.toLowerCase()) ||
        tx.transactionType?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className="p-4 md:p-6 bg-[#f4f3fb] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-indigo-600">
          Transaction List
        </h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto ">
        <table className="w-full text-sm">
          <thead className="bg-[#f1effa] text-indigo-700">
            <tr>
              <th className="p-3">SL</th>
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Type</th>
              <th className="p-3">Debit</th>
              <th className="p-3">Credit</th>
              <th className="p-3 text-right">Amount</th>
              {/* <th className="p-3 text-center">Actions</th> */}
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={tx._id}
                onClick={() => setActiveRow(tx._id)}
                className={`cursor-pointer transition-all
                  ${
                    activeRow === tx._id
                      ? "bg-indigo-50 border-l-4 border-indigo-500"
                      : "hover:bg-indigo-50"
                  }`}
              >
                <td className="p-3 font-medium">{index + 1}</td>

                <td className="p-3">
                  {new Date(tx.date).toLocaleDateString()}
                </td>

                <td className="p-3">{tx.description}</td>

                <td className="p-3 font-medium">{tx.transactionType}</td>

                <td className="p-3">
                  {tx.debitAccount?.name}
                  <div className="text-xs text-gray-400">
                    ({tx.debitAccount?.type})
                  </div>
                </td>

                <td className="p-3">
                  {tx.creditAccount?.name}
                  <div className="text-xs text-gray-400">
                    ({tx.creditAccount?.type})
                  </div>
                </td>

                <td
                  className={`p-3 text-right font-semibold ${
                    tx.transactionType === "Payment"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  BDT {tx.amount}
                </td>
                {/* 
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      title="View"
                      className="p-2 rounded hover:bg-indigo-100
                        hover:scale-110 transition"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      title="Edit"
                      className="p-2 rounded hover:bg-yellow-100
                        hover:scale-110 transition"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      title="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirm("Delete this transaction?");
                      }}
                      className="p-2 rounded hover:bg-red-100
                        hover:scale-110 transition text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty */}
      {transactions.length === 0 && (
        <p className="text-center text-gray-500 py-6">No transactions found</p>
      )}
    </div>
  );
};

export default TransactionList;
