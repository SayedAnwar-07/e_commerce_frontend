import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import FavoritesCount from "../../pages/Favourite/FavoritesCount/FavoritesCount";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container flex justify-between px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-gray-700 dark:text-white"
          >
            <img
              src="https://merakiui.com/images/full-logo.svg"
              alt="Logo"
              className="w-auto h-6 sm:h-7"
            />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 dark:text-gray-200 lg:hidden"
            aria-label="toggle menu"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Links Section */}
        <div
          className={`flex-col lg:flex-row lg:flex lg:items-center transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col lg:flex-row">
            <Link
              to="/"
              className="flex items-center px-3 text-sm py-2 mt-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiOutlineHome className="mr-2" size={20} />
              Home
            </Link>
            <Link
              to="/shop"
              className="flex items-center px-3 text-sm py-2 mt-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiOutlineShopping className="mr-2" size={20} />
              Shop
            </Link>
            <Link
              to="/cart"
              className="flex items-center px-3 text-sm py-2 mt-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiOutlineShoppingCart className="mr-2" size={20} />
              Cart
              {/* Cart item count can be added here */}
            </Link>
            <Link
              to="/favorite"
              className="flex items-center px-3 text-sm py-2 mt-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaHeart className="mr-2" size={20} />
              Favorites
              <FavoritesCount />
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center mt-4 lg:mt-0">
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-gray-800 dark:text-white"
                >
                  {userInfo.username}
                  <svg
                    className={`w-4 h-4 ml-1 transform transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <ul className="absolute z-20 w-40 py-2 mt-2 bg-white rounded-lg shadow-md dark:bg-gray-700">
                    {/* Show Admin specific links */}
                    {userInfo.role === "admin" && (
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-gray-600 dark:text-gray-200"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {/* Other user-specific links */}
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-600 dark:text-gray-200"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logoutHandler}
                        className="block w-full px-4 py-2 text-left text-gray-600 dark:text-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="flex">
                <Link
                  to="/login"
                  className="flex items-center px-3 text-sm py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <AiOutlineLogin className="mr-2" size={20} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-3 text-sm py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <AiOutlineUserAdd className="mr-2" size={20} />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
