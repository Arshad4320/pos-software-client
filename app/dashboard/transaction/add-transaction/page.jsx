"use client";

import { useForm } from "react-hook-form";
import {
  FileText,
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
  Calendar,
} from "lucide-react";

// demo account list (later API theke আসবে)
const accounts = [
  { id: "1", name: "Cash" },
  { id: "2", name: "Bank" },
  { id: "3", name: "Sales" },
  { id: "4", name: "Rent Expense" },
];

const AddTransaction = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      amount: Number(data.amount),
    };

    console.log("Transaction Payload:", payload);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg">
        <div className="text-center py-6 ">
          <h2 className="text-3xl font-bold text-gray-800 ">
            {" "}
            Add New Transaction
          </h2>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-6">
          {/* Date */}
          <div>
            <label className="text-md font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} /> Date
            </label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
                errors.date
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-md font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FileText size={16} /> Description
            </label>
            <input
              type="text"
              placeholder="Transaction description"
              {...register("description", {
                required: "Description is required",
              })}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
                errors.description
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Transaction Type */}
          <div>
            <label className="text-md font-medium text-gray-700 mb-2 flex items-center gap-2">
              Transaction Type
            </label>
            <select
              {...register("transactionType", {
                required: "Transaction type is required",
              })}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
                errors.transactionType
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            >
              <option value="">Select type</option>
              <option value="sales">Sales</option>
              <option value="purchase">Purchase</option>
              <option value="receipt">Receipt</option>
              <option value="payment">Payment</option>
            </select>
            {errors.transactionType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.transactionType.message}
              </p>
            )}
          </div>

          {/* Debit & Credit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-md font-medium text-gray-700 mb-2 flex items-center gap-2">
                <ArrowDownCircle size={16} /> Debit Account
              </label>
              <select
                {...register("debitAccount", {
                  required: "Debit account is required",
                })}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
                  errors.debitAccount
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              >
                <option value="">Select account</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-md font-medium text-gray-700 mb-2 flex items-center gap-2">
                <ArrowUpCircle size={16} /> Credit Account
              </label>
              <select
                {...register("creditAccount", {
                  required: "Credit account is required",
                })}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
                  errors.creditAccount
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              >
                <option value="">Select account</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-md font-medium text-gray-700 mb-2 flex items-center gap-2">
              <DollarSign size={16} /> Amount
            </label>
            <input
              type="number"
              min="1"
              placeholder="0.00"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than zero" },
              })}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
                errors.amount
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Create Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
