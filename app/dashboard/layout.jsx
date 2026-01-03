"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

// React Icons Import
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiGrid,
  FiUsers,
  FiRefreshCw,
  FiFileText,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const navLinks = [
  {
    href: "/",
    label: "Dashboard",
    icon: <FiGrid size={20} />,
  },
  {
    label: "Accounts",
    icon: <FiUsers size={20} />,
    children: [
      { href: "/dashboard/accounts", label: "Chart of Accounts" },
      { href: "/dashboard/accounts/add-account", label: "Add Account" },
    ],
  },
  {
    href: "/dashboard/transaction", // এখানে href নিশ্চিত করা হয়েছে
    label: "Transactions",
    icon: <FiRefreshCw size={20} />,
    children: [
      { href: "/dashboard/transaction", label: "All Transactions" },
      {
        href: "/dashboard/transaction/add-transaction",
        label: "Add Transaction",
      },
    ],
  },
  {
    label: "Reports",
    icon: <FiFileText size={20} />,
    children: [
      { href: "/dashboard/report/journal", label: "Journal" },
      { href: "/dashboard/report/balance", label: "Balance Sheet" },
      { href: "/dashboard/report/income", label: "Income Statement" },
    ],
  },
];

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // পেজ চেঞ্জ হলে মোবাইল সাইডবার বন্ধ করা
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleSidebar = () => setMobileOpen((prev) => !prev);

  const handleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm md:hidden z-40 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-[#1e293b] text-slate-300 w-[280px] fixed md:relative h-screen transition-all duration-300 ease-in-out z-50 flex flex-col ${
          mobileOpen ? "left-0" : "-left-full md:left-0"
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 flex items-center justify-between border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              AdminPanel
            </h2>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Main Menu
          </p>

          {navLinks.map((link) => {
            const hasChildren = !!link.children;
            const isActive =
              (link.href && pathname === link.href) ||
              (hasChildren &&
                link.children.some((child) => pathname === child.href));

            return (
              <div key={link.label}>
                {hasChildren ? (
                  <>
                    {/* ড্রপডাউন বাটন - এখানে Link নেই তাই href এরর আসবে না */}
                    <button
                      onClick={() => handleDropdown(link.label)}
                      className={`w-full flex justify-between items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                        isActive
                          ? "bg-blue-600/10 text-blue-400"
                          : "hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={
                            isActive
                              ? "text-blue-400"
                              : "text-slate-400 group-hover:text-white"
                          }
                        >
                          {link.icon}
                        </span>
                        {link.label}
                      </div>
                      {openDropdown === link.label ? (
                        <FiChevronUp size={16} className="opacity-50" />
                      ) : (
                        <FiChevronDown size={16} className="opacity-50" />
                      )}
                    </button>

                    {/* সাব-মেনু আইটেম */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openDropdown === link.label
                          ? "max-h-64 opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-9 space-y-1 border-l border-slate-700/50 pl-4">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block py-2 text-sm rounded-lg transition-all ${
                              pathname === child.href
                                ? "text-blue-400 font-semibold"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* সাধারণ লিঙ্ক - শুধু href থাকলেই রেন্ডার হবে */
                  link.href && (
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                        pathname === link.href
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <span
                        className={
                          pathname === link.href
                            ? "text-white"
                            : "text-slate-400 group-hover:text-white"
                        }
                      >
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
            <FiLogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="font-bold text-slate-800 text-xl hidden md:block">
              Overview
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">John Doe</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border-2 border-white shadow-sm"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto flex-1 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
