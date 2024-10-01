import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LogInPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form inputs
  const validate = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = 'Username is required';
    if (!formData.password) tempErrors.password = 'Password is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Log In Data Submitted:', formData);
      setSubmitted(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-2">
      <form
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col mb-4">
          <h2 className="text-2xl font-bold text-center">Log In to Your Account</h2>
          <p className="text-center text-xs">Welcome back! Please log in to continue.</p>
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Log In
        </button>

        <div className="flex justify-center gap-1 mt-4">
          <p className="text-gray-600">Don't have an account?</p>
          <Link
            className="text-blue-500 hover:text-blue-700 underline font-semibold transition duration-300"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>

        {submitted && (
          <p className="text-green-500 text-center mt-4">Log in successful!</p>
        )}
      </form>
    </div>
  );
};

export default LogInPage;