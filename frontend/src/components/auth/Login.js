import React, { useState } from "react";
import logo from "../../assets/logo-footer.jpeg";
import Navbar from "../Navbar";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    // Send login request to the backend
    axios
      .post(`${process.env.REACT_APP_API_KEY}user/signIn`, formData)
      .then((response) => {
        // Handle successful login response
        console.log("Login successful:", response.data);
      })
      .catch((error) => {
        // Handle login error
        console.error("Login error:", error);
      });
  };

  return (
    <>
      <Navbar />
      <section className="h-100 gradient-form">
        {/* Your existing content */}
        <form>
          {/* Name input */}
          <div className="form-outline mb-4">
            <input
              type="text"
              id="name"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <label className="form-label" htmlFor="name">
              Name
            </label>
          </div>
          {/* Password input */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>
          {/* Login button */}
          <div className="text-center pt-1 mb-5 pb-1">
            <button
              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
              type="button"
              onClick={handleLogin}
            >
              Log in
            </button>
            <a className="text-muted" href="#!">
              Forgot password?
            </a>
          </div>
          {/* Additional content */}
        </form>
      </section>
    </>
  );
};

export default Login;
