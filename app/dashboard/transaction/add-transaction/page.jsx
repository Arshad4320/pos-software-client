"use client";

import { useForm } from "react-hook-form";
import {
  FileText,
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
  Calendar,
  Loader2,
  Plus,
} from "lucide-react";
import { useGetAccountsQuery } from "@/app/redux/features/accounts/accountApi";
import { useCreateTransactionMutation } from "@/app/redux/features/transaction/transactionApi";
import toast, { Toaster } from "react-hot-toast";

const transactionTypes = ["Sales", "Purchase", "Receipt", "Payment"];

const AddTransaction = () => {
  const { data: accountsData, isLoading: accountsLoading } =
    useGetAccountsQuery();
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
      await createTransaction(payload).unwrap();
      toast.success("Transaction recorded successfully");
      reset();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to record transaction");
    }
  };

  if (accountsLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="animate-spin text-blue-500" size={32} />
        <p className="text-sm font-medium">Loading accounts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50/50">
      <Toaster position="top-center" />

      <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 border-b border-slate-50">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <Plus size={20} />
            </div>
            <h2 className="text-xl font-semibold text-slate-800">
              New Transaction
            </h2>
          </div>
          <p className="text-slate-500 text-sm">
            Record a new journal entry into the system.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Calendar size={14} className="text-slate-400" /> Date
              </label>
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                className={`w-full bg-slate-50 rounded-lg border px-4 py-2.5 text-sm transition-all outline-none ${
                  errors.date
                    ? "border-red-400 focus:bg-white"
                    : "border-slate-200 focus:border-blue-500 focus:bg-white"
                }`}
              />
            </div>

            {/* Transaction Type */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                Transaction Type
              </label>
              <select
                {...register("transactionType", { required: "Required" })}
                className="w-full bg-slate-50 rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
              >
                <option value="">Select Type</option>
                {transactionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <FileText size={14} className="text-slate-400" /> Description
            </label>
            <input
              type="text"
              placeholder="What is this transaction for?"
              {...register("description", {
                required: "Description is required",
              })}
              className={`w-full bg-slate-50 rounded-lg border px-4 py-2.5 text-sm transition-all outline-none ${
                errors.description
                  ? "border-red-400 focus:bg-white"
                  : "border-slate-200 focus:border-blue-500 focus:bg-white"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Debit Account */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <ArrowDownCircle size={14} className="text-emerald-500" /> Debit
                Account
              </label>
              <select
                {...register("debitAccount", { required: "Required" })}
                className="w-full bg-slate-50 rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
              >
                <option value="">Select Debit Account</option>
                {accountsData?.data?.map((acc) => (
                  <option key={acc._id} value={acc._id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Credit Account */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <ArrowUpCircle size={14} className="text-rose-500" /> Credit
                Account
              </label>
              <select
                {...register("creditAccount", { required: "Required" })}
                className="w-full bg-slate-50 rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
              >
                <option value="">Select Credit Account</option>
                {accountsData?.data?.map((acc) => (
                  <option key={acc._id} value={acc._id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <DollarSign size={14} className="text-slate-400" /> Amount
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be > 0" },
              })}
              className="w-full bg-slate-50 rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all font-semibold text-slate-800"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white py-3.5 rounded-lg font-medium text-sm hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Processing...
                </>
              ) : (
                "Post Transaction"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
