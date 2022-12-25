import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../util/util.js";

function LoginPage(props) {
  const token = getToken();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (token !== null && token !== "undefined") {
      navigate("/admin", { replace: true });
    }
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    console.log(emailRef.current.value);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      console.log(response);
      const { status, jwt, user } = response.data;
      if (status === "success") {
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/admin", { replace: true });
      } else {
        alert("invalid email or password");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full  max-w-lg space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {import.meta.env.VITE_APP_NAME}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="w-full flex flex-col space-y-3 ">
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                ref={emailRef}
                required
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                {/* <a href="#" className="text-xs text-gray-500">
                  Forget Password?
                </a> */}
              </div>
              <input
                ref={passwordRef}
                required
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
              />
            </div>
            <div className="mt-8 mx-auto">
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
              >
                Login
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link to="/register" className="text-xs text-gray-500 uppercase">
                or sign up
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
