import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SIGN_UP } from '../graphql/mutations/user.mutations';
import { useMutation } from '@apollo/client';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [signup, { loading }] = useMutation(SIGN_UP, {
		// refetchQueries: ["GetAuthenticatedUser"],
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
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.email) tempErrors.email = 'Email is required';
    if (!formData.password) tempErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = 'Passwords do not match';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  
  // const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		await signup({
	// 			variables: {
	// 				input: signUpData,
	// 			},
	// 		});
	// 	} catch (error) {
	// 		console.error("Error:", error);
	// 		toast.error(error.message);
	// 	}
	// };
  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await signup({
          variables: {
            input: formData,
          },
        })
        console.log("signed up successfully");
      } catch(error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-2">
      <form
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col mb-4">
          <h2 className="text-2xl font-bold text-center">Create An Account</h2>
          <p className="text-center text-xs">Create an account to enjoy all services</p>
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
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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

        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>

        <div className="flex justify-center gap-1 mt-4">
          <p className="text-gray-600">Already have an account?</p>
          <Link
            className="text-blue-500 hover:text-blue-700 underline font-semibold transition duration-300"
            to="/login"
          >
            Log in
          </Link>
        </div>


        {submitted && (
          <p className="text-green-500 text-center mt-4">Form submitted successfully!</p>
        )}
      </form>
    </div>
  );
};

export default SignUpPage;
