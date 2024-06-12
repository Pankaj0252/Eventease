import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}admin/login`,
        formData
      );
      // Handle successful login (e.g., redirect to admin dashboard)
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50" style={{ marginTop: "8rem" }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card shadow-sm border-0 rounded-lg">
                <div className="card-body p-4 p-sm-5">
                  <h1 className="h2 mb-4 fw-bold text-gray-900 text-center">
                    Admin Login
                  </h1>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-lg"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="admin@abc.com"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="form-label text-gray-900"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control rounded-lg"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-lg w-100"
                    >
                      Login
                    </button>
                    <p className="mt-3 text-center">
                      <Link to="/register" className="text-primary">
                        Register as a user
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AdminLogin;
