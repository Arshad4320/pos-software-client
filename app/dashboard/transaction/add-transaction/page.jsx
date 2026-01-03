"use client";

import { useForm } from "react-hook-form";
import {
  FileText,
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
  Calendar,
} from "lucide-react";
import { useGetAccountsQuery } from "@/app/redux/features/accounts/accountApi";
import { useCreateTransactionMutation } from "@/app/redux/features/transaction/transactionApi";

const transactionTypes = ["Sales", "Purchase", "Receipt", "Payment"];

const AddTransaction = () => {
  const { data, isLoading } = useGetAccountsQuery();
  const [createTransaction, { isLoading: isSubmitting }] =
    useCreateTransactionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
      };
      const result = await createTransaction(payload).unwrap();
      console.log("Transaction Created:", result);
      reset();
    } catch (err) {
      console.error(err?.data || err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading accounts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Add New Transaction
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Date */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
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
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
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
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              Transaction Type
            </label>
            <select
              {...register("transactionType", {
                required: "Transaction type is required",
              })}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 transition ${
                errors.transactionType
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            >
              <option value="">Select transaction type</option>
              {transactionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.transactionType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.transactionType.message}
              </p>
            )}
          </div>

          {/* Debit & Credit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
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
                <option value="">Select debit account</option>
                {data?.data?.map((acc) => (
                  <option key={acc._id} value={acc._id}>
                    {acc.name} ({acc.type})
                  </option>
                ))}
              </select>
              {errors.debitAccount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.debitAccount.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
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
                <option value="">Select credit account</option>
                {data?.data?.map((acc) => (
                  <option key={acc._id} value={acc._id}>
                    {acc.name} ({acc.type})
                  </option>
                ))}
              </select>
              {errors.creditAccount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.creditAccount.message}
                </p>
              )}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
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
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Creating..." : "Create Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
