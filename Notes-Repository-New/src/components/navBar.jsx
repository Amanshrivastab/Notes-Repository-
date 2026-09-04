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
      ? "bg-blue-900 text-white px-2 sm:px-4 py-2 rounded-lg font-bold shadow-md text-sm sm:text-base"
      : "text-gray-800 px-2 sm:px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm sm:text-base";
  };

  return (
    <nav className="bg-white shadow-md w-full">
      
      <div
        className="
          w-full
          px-2 sm:px-4 md:px-8
          py-4
          flex
          flex-col md:flex-row
          md:justify-between
          md:items-center
          gap-3
        "
      >
        {/* ==============================
            LOGO
        ============================== */}

        <NavLink
          to="/"
          className="
            text-xl sm:text-2xl
            font-bold
            text-blue-700
            whitespace-nowrap
          "
        >
          📚 Notes Repository
        </NavLink>

        {/* ==============================
            NAVIGATION
        ============================== */}

        <div
          className="
            flex
            flex-nowrap
            gap-1 sm:gap-3
            items-center
            whitespace-nowrap
          "
        >
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

              <span
                className="
                  text-gray-800
                  font-medium
                  px-1 sm:px-2
                  text-sm sm:text-base
                  whitespace-nowrap
                "
              >
                Hi, {user?.name}
              </span>

              {/* ==============================
                  LOGOUT
              ============================== */}

              <button
                onClick={handleLogout}
                className="
                  text-red-700
                  font-medium
                  px-2 sm:px-4
                  py-2
                  rounded-lg
                  hover:bg-red-100
                  transition-all
                  text-sm sm:text-base
                  whitespace-nowrap
                "
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;