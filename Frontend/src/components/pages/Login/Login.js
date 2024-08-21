import React, { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import Logo from "../assets/logo.svg";
import { loginRoute } from "../../../utils/Apiroutes"

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
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            {/* <img src={Logo} alt="Logo"></img> */}
            <h1>SONIC</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            minLength="3"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />

          <button type="submit">Log In</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
        {/* <button type="submit">Practice the Model</button> */}
          <span>
            <Link to="/model">Use the translator</Link>
          </span>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Login;
