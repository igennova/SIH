import React, { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../../../utils/Apiroutes";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;

      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password,

        });

        if (data.status === true) {
          localStorage.setItem("app-user", JSON.stringify(data.user));
          navigate("/");
        } else if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An unexpected error occurred", toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { username, password } = values;

    if (username.trim() === "") {
      toast.error("Username is required", toastOptions);
      return false;
    } else if (password.trim() === "") {
      toast.error("Password is required", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Fragment>
      <div className="bg-sky-100 flex justify-center items-center h-screen">
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src="mute.jpg"
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-white-600">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-white"
                autoComplete="off"
                minLength="3"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-800">
                Password
              </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-white"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-red-500"
              />
              <label htmlFor="remember" className="text-green-900 ml-2">
                Remember Me
              </label>
            </div>

            {/* Forgot Password Link */}
            <div className="mb-6 text-blue-500">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              EHSAAS
            </button>
          </form>

          {/* Sign up Link */}
          <div className="mt-6 text-green-500 text-center">
            <Link to="/register" className="hover:underline">
              Sign up Here
            </Link>
          </div>

          {/* Use the translator link */}
          {/* <div className="mt-6 text-center">
            <Link to="/model" className="text-blue-500 hover:underline">
              Use the translator
            </Link>
          </div> */}
        </div>
      </div>

      <ToastContainer />
    </Fragment>
  );
};

export default Login;
