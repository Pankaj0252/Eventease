import React, { useState } from "react";
import logo from "../../assets/logo-footer.jpeg";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    try {
      console.log("$$$$$");
      console.log(formData);
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}user/Login`,
        formData
      );
      console.log("********");
      console.log(response);
      if (response.data.message === "Logged in successfully") {
        navigate("/index"); // Redirect to the index page upon successful login
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", error.response.data);
        setError(error.response.data.message || "Invalid email or password.");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setError("Server did not respond. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error in request setup:", error.message);
        setError("An error occurred. Please try again.");
      }
      console.error("Login error:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src={logo} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">
                          We are The Lotus Team
                        </h4>
                      </div>

                      <form>
                        <p>Please login to your account</p>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email address"
                          />
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                        </div>

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

                        {error && <p className="text-danger">{error}</p>}

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

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <a
                            href="/register"
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
