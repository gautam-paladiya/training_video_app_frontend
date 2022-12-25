import React, { useEffect } from "react";
import { deleteToken, deleteUser, getToken, getUser } from "../util/util.js";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function TopBar() {
  const token = getToken();
  const user = JSON.parse(getUser());
  const navigate = useNavigate();
  const doLogout = () => {
    deleteToken();
    deleteUser();
    navigate("/", { replace: true });
  };

  let activeStyle = {
    textDecorationLine: "underline",
    fontSize: 20,
    color: "white",
  };

  let inActiveStyle = {
    color: "white",
    fontSize: 17,
  };

  return (
    <nav
      className="flex items-center justify-between flex-wrap bg-teal-500 p-6"
      style={{}}
    >
      <a
        href="/home"
        className="flex items-center flex-shrink-0 text-white mr-6"
      >
        <span className="font-semibold text-2xl tracking-tight">
          {import.meta.env.VITE_APP_NAME}
        </span>
      </a>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <NavLink
            to="/home"
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
          >
            <a className="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4">
              Home
            </a>
          </NavLink>

          <NavLink
            to="/admin"
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
          >
            <a className="block mt-4 lg:inline-block lg:mt-0  hover:text-white">
              Upload
            </a>
          </NavLink>
        </div>
        <div className="mr-5 text-white font-bold text-lg ">
          {user?.name && `Hey ${user.name}`}
        </div>
        {token !== null && token !== "undefined" ? (
          <div>
            <button
              onClick={doLogout}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <a
              href="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default TopBar;
