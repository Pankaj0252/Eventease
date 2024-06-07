import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import SuccessModal from "../utils/modal/SuccessModal";

const Auth = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreedToTerms: false, // Track whether the user has agreed to terms and conditions
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}user/register`,
        formData
      );
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error occurred during registration:", error);
      // Handle errors, e.g., display error message to user
    }
  };

  return (
    <>
      <Navbar />
      {showSuccessModal ? (
        <SuccessModal
          setShowSuccessModal={setShowSuccessModal}
          showSuccessModal={showSuccessModal}
        />
      ) : (
        <section className="bg-gray-50" style={{ marginTop: "8rem" }}>
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-sm border-0 rounded-lg">
                  <div className="card-body p-4 p-sm-5">
                    <h1 className="h2 mb-4 fw-bold text-gray-900 text-center">
                      Create an account
                    </h1>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="name"
                          className="form-label text-gray-900"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-lg"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="form-label text-gray-900"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          className="form-control rounded-lg"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@abc.com"
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
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="terms"
                          name="agreedToTerms"
                          checked={formData.agreedToTerms}
                          onChange={handleInputChange}
                          required
                        />
                        <label
                          className="form-check-label text-gray-900"
                          htmlFor="terms"
                        >
                          I accept the{" "}
                          <a
                            href="1"
                            className="text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg rounded-lg w-100"
                      >
                        Create an account
                      </button>
                      <p className="mt-3 text-center">
                        Already have an account?{" "}
                        <a href="1" className="text-primary">
                          Login here
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default Auth;
