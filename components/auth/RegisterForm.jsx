"use client";

import React, { useState } from "react";
import { registerUser } from "@/app/actions";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state to manage the submit button

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      errors.email = "Please enter a valid email address";

    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6)
      errors.password = "Password should be at least 6 characters long";

    if (!formData.confirmPassword)
      errors.confirmPassword = "Confirm password is required";
    else if (formData.confirmPassword !== formData.password)
      errors.confirmPassword = "Passwords do not match";

    if (!formData.phone) errors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      errors.phone = "Please enter a valid phone number";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      setLoading(true); 
      const { confirmPassword, ...dataToSave } = formData;
      
      try {
        const response = await registerUser(dataToSave);
        
        if (!response.success) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            server: response.error,
          }));
        } else {
          // Optionally handle successful registration here, will redirecting or showing a success message
        }
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          server:
            error.message || "An unexpected error occurred. Please try again.",
        }));
      } finally {
        setLoading(false); 
      }
    } else {
      setErrors(formErrors); 
    }
  };
  

  return (
    <form id="signupForm" className="space-y-4" onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label htmlFor="name" className="flex flex-start text-white mb-2">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="flex flex-start text-white mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full p-2 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="flex flex-start text-white mb-2">
          Create Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Create Password"
          className="w-full p-2 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="flex flex-start text-white mb-2"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-2 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="flex flex-start text-white mb-2 ">
          Phone Number
        </label>
        <input
          id="phone"
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-2 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Terms & Conditions */}
      <div className="text-left text-moviedb-gray text-sm">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" required /> I agree to the
          Terms of Service and Privacy Policy
        </label>
      </div>
      {errors.server && (
        <div className="text-red-500 text-sm mb-4">{errors.server}</div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full ${loading ? "bg-gray-400" : "bg-moviedb-red"} text-white py-3 rounded hover:bg-red-700 transition duration-300`}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;
