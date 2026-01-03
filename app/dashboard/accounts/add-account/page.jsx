"use client";

import { useForm } from "react-hook-form";
import { Wallet, Layers, DollarSign, Loader2, Plus } from "lucide-react";
import { useCreateAccountMutation } from "@/app/redux/features/accounts/accountApi";
import toast, { Toaster } from "react-hot-toast";

const AddAccount = () => {
  const [createAccount, { isLoading }] = useCreateAccountMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        balance: Number(data.balance || 0),
      };
      await createAccount(payload).unwrap();
      toast.success("Account created successfully");
      reset();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create account");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50/50">
      <Toaster position="top-center" />

      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header - Simple & Clean */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <Plus size={20} />
            </div>
            <h2 className="text-xl font-semibold text-slate-800">
              Add Account
            </h2>
          </div>
          <p className="text-slate-500 text-sm">
            Create a new ledger account for your business.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-5">
          {/* Account Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Account Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Cash, Office Equipment"
                {...register("name", { required: "Name is required" })}
                className={`w-full bg-slate-50 rounded-lg border px-4 py-2.5 text-sm transition-all outline-none ${
                  errors.name
                    ? "border-red-400 focus:bg-white"
                    : "border-slate-200 focus:border-blue-500 focus:bg-white"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Account Type */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Category
              </label>
              <select
                {...register("type", { required: "Required" })}
                className={`w-full bg-slate-50 rounded-lg border px-4 py-2.5 text-sm transition-all outline-none ${
                  errors.type
                    ? "border-red-400"
                    : "border-slate-200 focus:border-blue-500 focus:bg-white"
                }`}
              >
                <option value="">Select</option>
                <option value="Asset">Asset</option>
                <option value="Liability">Liability</option>
                <option value="Equity">Equity</option>
                <option value="Revenue">Revenue</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Balance */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Opening Balance
              </label>
              <input
                type="number"
                placeholder="0.00"
                {...register("balance", { min: 0 })}
                className="w-full bg-slate-50 rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Footer Info */}
          <p className="text-[11px] text-slate-400 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
            Tip: Assets and Expenses increase with debits; Liabilities, Equity,
            and Revenue increase with credits.
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium text-sm hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Saving...
                </>
              ) : (
                "Save Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;
