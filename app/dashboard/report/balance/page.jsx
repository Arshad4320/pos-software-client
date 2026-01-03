"use client";
import { useGetBalanceSheetQuery } from "@/app/redux/features/report/reportApi";
import React from "react";

const BalanceSheet = () => {
  const { data, isLoading } = useGetBalanceSheetQuery();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-green-500 text-2xl font-bold text-gray-100 rounded-md">
          <h3>Total Assets </h3>
          <span>{data?.data?.totalAssets}</span>
        </div>
        <div className="p-4 bg-blue-500 text-2xl font-bold text-gray-100 rounded-md">
          <h3>Total Equity</h3>
          <span>{data?.data?.totalEquity}</span>
        </div>
        <div className="p-4 bg-purple-500 text-2xl font-bold text-gray-100 rounded-md">
          <h3>Total Liability </h3>
          <span>{data?.data?.totalLiability}</span>
        </div>
      </div>
      {/* Equity List */}
      {data?.data?.equity.length > 0 && (
        <div>
          <h3 className="mt-10 mb-6 text-2xl font-bold text-gray-700">
            Equity List
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.data?.equity?.map((e) => (
              <div
                key={e._id}
                c
                className="bg-white border-t-2 border-l-2 border-orange-500 rounded-xl shadow p-4"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-1">
                  {e.name}
                </h4>
                <p className="text-md text-gray-600 mb-1">Type: {e.type}</p>
                <p className="text-md text-gray-600 mb-2">
                  Created: {new Date(e.createdAt).toLocaleDateString()}
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  BDT {e.balance.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Assets List */}
      {data?.data?.assets.length > 0 && (
        <div>
          <h3 className="mt-10 mb-6 text-2xl font-bold text-gray-700">
            Assets List
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.data?.equity?.map((a) => (
              <div
                key={a._id}
                className="bg-white border-t-2 border-l-2 border-purple-500 rounded-xl shadow p-4 "
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-1">
                  {a.name}
                </h4>
                <p className="text-md text-gray-600 mb-1">Type: {a.type}</p>
                <p className="text-md text-gray-600 mb-2">
                  Created: {new Date(a.createdAt).toLocaleDateString()}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  BDT {a.balance.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Liability List */}
      {data?.data?.liability.length > 0 && (
        <div>
          <h3 className="mt-10 mb-6 text-2xl font-bold text-gray-700">
            Liability List
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.data?.liability?.map((l) => (
              <div
                key={l._id}
                className="bg-white border-t-2 border-l-2 border-green-500 rounded-xl shadow p-4 "
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-1">
                  {l.name}
                </h4>
                <p className="text-md text-gray-600 mb-1">Type: {l.type}</p>
                <p className="text-md text-gray-600 mb-2">
                  Created: {new Date(l.createdAt).toLocaleDateString()}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  BDT {l.balance.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceSheet;
