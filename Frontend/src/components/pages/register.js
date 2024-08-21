import React, { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../../utils/Apiroutes";
// import logo from "../../assets/images.png";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === true) {
        localStorage.setItem("app-user", JSON.stringify(data.user));
        navigate("/setavatar");
      } else {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { username, password, confirmPassword, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be the same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be greater than 8 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handlechange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Fragment>
      <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem", textAlign: "center", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <form onSubmit={handlesubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            {/* <img src={logo} alt="Logo" style={{ width: "50px", marginBottom: "1rem" }} /> */}
            <h1 style={{ margin: "0", fontSize: "1.5rem" }}>EHSAAS</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handlechange}
            style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ced4da" }}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handlechange}
            style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ced4da" }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handlechange}
            style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ced4da" }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handlechange}
            style={{ width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ced4da" }}
          />
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", borderRadius: "4px", border: "none", cursor: "pointer" }}>
            CREATE NEW USER
          </button>
        </form>
        <div style={{ marginTop: "1rem" }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Register;
