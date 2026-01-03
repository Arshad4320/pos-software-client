"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { Layers, DollarSign } from "lucide-react";
import {
  useGetAccountByIdQuery,
  useUpdateAccountMutation,
} from "@/app/redux/features/accounts/accountApi";

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

      const result = await updateAccount(payload).unwrap();
      console.log(result);
      router.push("/dashboard/accounts");
    } catch (err) {
      console.error(err?.data?.message || "Update failed");
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading account...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="text-center py-6 ">
          <h2 className="text-3xl font-bold text-gray-800">Edit Account</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-6">
          {/* Account Name */}
          <div>
            <label className="text-md font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Layers size={16} />
              Account Name
            </label>
            <input
              type="text"
              placeholder="Cash, Bank, Sales, Rent"
              {...register("name", { required: "Account name is required" })}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
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
            <label className="text-md font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Layers size={16} />
              Account Type
            </label>
            <select
              {...register("type", { required: "Account type is required" })}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 ${
                errors.type
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            >
              <option value="">Select account type</option>
              <option value="Asset">Asset</option>
              <option value="Liability">Liability</option>
              <option value="Equity">Equity</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          {/* Balance */}
          <div>
            <label className="text-md font-medium text-gray-700 mb-2 flex items-center gap-2">
              <DollarSign size={16} />
              Balance
            </label>
            <input
              type="number"
              min="0"
              {...register("balance", {
                min: { value: 0, message: "Balance cannot be negative" },
              })}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.balance
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              {isUpdating ? "Updating..." : "Update Account"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/accounts")}
              className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountPage;
