import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Providers/AuthProvider";
import { ThemeContext } from "../Providers/ThemeProvider";
import logo from "../assets/logo/logo.png";

const Navbar = () => {
  const { user, handleLogout } = useContext(authContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/allFoods", label: "All Foods" },
    { path: "/gallery", label: "Gallery" },
    { path: "/aboutUs", label: "About Us" },
  ];
  
  // Conditionally add "My Orders" if the user is logged in
  if (user) {
    navLinks.push({ path: "/myOrders", label: "My Orders" });
  }

  return (
    <div
      className={`sticky top-0 z-50 shadow-lg ${theme === "dark" ? "bg-gray-900 text-white" : "bg-green-800 text-white"} transition-all duration-300 ease-in-out`}
    >
      <div className="navbar container mx-auto p-4 flex justify-between">
        {/* Left Section - Logo & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost" aria-label="Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 shadow ${theme === "dark" ? "bg-gray-800" : "bg-green-50"} rounded-box w-52`}>
              {navLinks.map(({ path, label }, index) => (
                <li key={index}>
                  <NavLink
                    to={path}
                    className={({ isActive }) => (isActive ? "text-white font-semibold" : "hover:text-green-100")}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img className="h-12 transition-transform duration-300 transform hover:scale-110" src={logo} alt="Website Logo" />
            <span className="font-bold text-2xl"></span>
          </NavLink>
        </div>

        {/* Center Section - Desktop Navigation Links */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-6">
            {navLinks.map(({ path, label }, index) => (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "text-green-600 font-semibold border-b-2 border-green-600" : "hover:text-green-600 hover:border-b-2 hover:border-green-600 transition-all"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - Theme Toggle & User Profile */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <label className="flex cursor-pointer gap-2 items-center">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="toggle theme-controller"
              aria-label="Toggle Theme"
              role="switch"
            />
          </label>

          {/* Conditional User Section */}
          {user ? (
            <div className="dropdown dropdown-end font-semibold">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <img
                  className="w-12 h-12 rounded-full transition-all duration-200 transform hover:scale-110"
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                />
              </label>
              <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 shadow ${theme === "dark" ? "bg-gray-800 text-white" : "bg-green-100 text-gray-800"} rounded-box w-52`}>
                <li>
                  <NavLink to="/myFoods" className="block py-2 px-4 hover:bg-gray-200">
                    My Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/addFood" className="block py-2 px-4 hover:bg-gray-200">
                    Add Food
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block py-2 px-4 text-red-600 hover:bg-gray-200 w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login">
              <button className="btn btn-neutral text-lg px-6 py-2 rounded-lg transition-all duration-300 hover:bg-green-600 hover:text-white">
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
