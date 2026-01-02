const Navbar = ({ setOpen }) => {
  return (
    <header className="h-14 bg-white shadow flex items-center px-4">
      {/* Mobile menu */}
      <button onClick={() => setOpen(true)} className="md:hidden mr-3 text-xl">
        ☰
      </button>

      <h1 className="font-semibold text-lg">POS System</h1>
    </header>
  );
};
export default Navbar;
