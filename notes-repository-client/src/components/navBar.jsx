import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <h2 className="text-2xl font-bold text-blue-600">
        📚 Notes Repository
      </h2>

      <div className="flex gap-6">

        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Home
        </Link>

        <Link
          to="/notes"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Notes
        </Link>

        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;