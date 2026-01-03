"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { Layers, DollarSign, Loader2, Edit3, ArrowLeft } from "lucide-react";
import {
  useGetAccountByIdQuery,
  useUpdateAccountMutation,
} from "@/app/redux/features/accounts/accountApi";
import toast, { Toaster } from "react-hot-toast";

const EditAccountPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: accountData, isLoading: isFetching } =
    useGetAccountByIdQuery(id);
  const [updateAccount, { isLoading: isUpdating }] = useUpdateAccountMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      type: "",
      balance: 0,
    },
  });

  useEffect(() => {
    if (accountData?.data) {
      reset({
        name: accountData.data.name,
        type: accountData.data.type,
        balance: accountData.data.balance,
      });
    }
  }, [accountData, reset]);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        id: id,
        data: {
          ...formData,
          balance: Number(formData.balance || 0),
        },
      };

      await updateAccount(payload).unwrap();
      toast.success("Account updated successfully");
      router.push("/dashboard/accounts");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="animate-spin text-blue-500" size={32} />
        <p className="text-sm font-medium">Loading account details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50/50">
      <Toaster position="top-center" />

      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header - Simple & Clean */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Edit3 size={20} />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Edit Account
              </h2>
            </div>
            <button
              onClick={() => router.back()}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          <p className="text-slate-500 text-sm">
            Update your account information and category.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-5">
          {/* Account Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Account Name
            </label>
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
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Balance */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Current Balance
              </label>
              <input
                type="number"
                placeholder="0.00"
                {...register("balance", { min: 0 })}
                className="w-full bg-slate-50 rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard/accounts")}
              className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-lg font-medium text-sm hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-[2] bg-slate-900 text-white py-3 rounded-lg font-medium text-sm hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountPage;
