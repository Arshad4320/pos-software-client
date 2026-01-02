"use client";

import { useForm } from "react-hook-form";
import { Wallet, Layers, DollarSign } from "lucide-react";

const AddAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      balance: Number(data.balance || 0),
    };

    console.log("Account Payload:", payload);
    reset();
  };

  return (
    <div className="min-h-screen  from-blue-50 to-gray-100 flex items-center justify-center ">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="text-center py-6 ">
          <h2 className="text-3xl font-bold text-gray-800 ">Add New Account</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-6">
          {/* Account Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Layers size={16} />
              Account Name
            </label>
            <input
              type="text"
              placeholder="Cash, Bank, Sales, Rent"
              {...register("name", {
                required: "Account name is required",
              })}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
                errors.name
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Account Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Layers size={16} />
              Account Type
            </label>
            <select
              {...register("type", {
                required: "Account type is required",
              })}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 transition ${
                errors.type
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            >
              <option value="">Select account type</option>
              <option value="Asset">Asset</option>
              <option value="Liability">Liability</option>
              <option value="Equity">Equity</option>
              <option value="Revenue">Revenue</option>
              <option value="Expense">Expense</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Opening Balance */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <DollarSign size={16} />
              Opening Balance
            </label>
            <input
              type="number"
              min="0"
              placeholder="0.00"
              {...register("balance", {
                min: {
                  value: 0,
                  message: "Balance cannot be negative",
                },
              })}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
                errors.balance
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty if opening balance is zero
            </p>
            {errors.balance && (
              <p className="text-red-500 text-xs mt-1">
                {errors.balance.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.98] transition"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;
