import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {

  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  // ==============================
  // NAV LINK STYLE
  // ==============================

  const navClass = ({ isActive }) => {

    return isActive
      ? "bg-blue-900 text-white px-4 py-2 rounded-lg font-bold shadow-md"
      : "text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all";
  };


  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      {/* ==============================
          LOGO
      ============================== */}

      <NavLink
        to="/"
        className="text-2xl font-bold text-blue-700"
      >
        📚 Notes Repository
      </NavLink>


      {/* ==============================
          NAVIGATION
      ============================== */}

      <div className="flex gap-3 items-center">

        {/* ==============================
            HOME
        ============================== */}

        <NavLink
          to="/"
          end
          className={navClass}
        >
          Home
        </NavLink>


        {/* ==============================
            NOTES
        ============================== */}

        <NavLink
          to="/notes"
          className={navClass}
        >
          Notes
        </NavLink>


        {/* ==============================
            NOT LOGGED IN
        ============================== */}

        {!isAuthenticated && (
          <>

            {/* LOGIN */}

            <NavLink
              to="/login"
              className={navClass}
            >
              Login
            </NavLink>


            {/* REGISTER */}

            <NavLink
              to="/register"
              className={navClass}
            >
              Register
            </NavLink>

          </>
        )}


        {/* ==============================
            LOGGED IN
        ============================== */}

        {isAuthenticated && (
          <>

            {/* ==============================
                ADMIN
            ============================== */}

            {user?.role === "admin" && (
              <NavLink
                to="/Dashboard"
                className={navClass}
              >
                Dashboard
              </NavLink>
            )}


            {/* ==============================
                USER NAME
            ============================== */}

            <span className="text-gray-800 font-medium px-2">
              Hi, {user?.name}
            </span>


            {/* ==============================
                LOGOUT
            ============================== */}

            <button
              onClick={handleLogout}
              className="text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-100 transition-all"
            >
              Logout
            </button>

          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;