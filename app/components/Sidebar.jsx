import Link from "next/link";

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
        />
      )}

      <aside
        className={`fixed z-30 md:static top-0 left-0 h-full w-64 bg-white shadow
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-4 font-bold text-xl border-b">POS Dashboard</div>

        <nav className="p-4 space-y-2">
          <Link
            href="/transactions"
            className="block p-2 rounded hover:bg-gray-100"
          >
            Transactions
          </Link>
          <Link href="/reports" className="block p-2 rounded hover:bg-gray-100">
            Reports
          </Link>
        </nav>
      </aside>
    </>
  );
};
export default Sidebar;
