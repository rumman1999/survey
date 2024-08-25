import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, useSpring } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaLock,
} from "react-icons/fa";
import { GlobalContext } from "../../context/GlobalContext";

const REACT_APP_API_ENDPOINT = "https://survey-backend-g0aa.onrender.com";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [fail, setFail] = useState("");

  const fadeIn = useSpring({
    opacity: 1,
    scale: 1,
    from: { opacity: 0, scale: 0.9 },
    config: { tension: 200, friction: 25 },
  });

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      errors.email = "Invalid email address";
    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!profession) errors.profession = "Profession is required";
    if (!password) errors.password = "Password is required";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const registrationData = {
        name,
        email,
        phoneNumber,
        profession,
        password,
      };
      fetch(`${REACT_APP_API_ENDPOINT}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      })
        .then((response) => {
          if (response.status === 201) navigate("/");
          else if (response.status === 409)
            setFail("User with this email already exists. Please login.");
          else throw new Error("Registration failed");
        })
        .catch((error) => setFail(error.message));
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={fadeIn}
    >
      <div className="container mx-auto flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl p-0">
        {/* Left Section: Introduction */}
        <motion.div
          className="lg:w-1/2 w-full flex flex-col justify-center p-8 text-zinc-600"
          style={{ background: "linear-gradient(45deg, #e0eafc, #cfdef3)" }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Join Our Survey Platform
          </h1>
          <p className="text-lg mb-4">
            Sign up now to start creating and managing surveys effortlessly.
          </p>
        </motion.div>

        {/* Right Section: Register Form */}
        <div className="lg:w-1/2 w-full p-8 flex justify-center bg-gray-50 gap-x-1">
          <motion.div style={fadeIn} className="w-full max-w-lg">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 text-center text-zinc-600">
              Register to Get Started
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  className="block text-gray-600 font-medium mb-2 flex items-center w-1/2 w-auto"
                  htmlFor="name"
                >
                  <FaUser className="mr-2 text-customLightBlue-100" />
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 2 }}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-2 block">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label
                  className="block text-gray-600 font-medium mb-2 flex items-center w-1/2"
                  htmlFor="email"
                >
                  <FaEnvelope className="mr-2 text-customLightBlue-100" />
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 2 }}
                />
                {errors.email && (  
                  <span className="text-red-500 text-sm mt-2 block">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label 
                  className=" text-gray-600 font-medium mb-2 flex items-center w-1/2"
                  htmlFor="phoneNumber"
                >
                  <FaPhone className="mr-2 text-customLightBlue-100" />
                  Phone Number
                </label>
                <motion.input
                  type="tel"
                  id="phoneNumber"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 2 }}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm mt-2 block">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label
                  className="block text-gray-600 font-medium mb-2 flex items-center w-1/2"
                  htmlFor="profession"
                >
                  <FaBriefcase className="mr-2 text-customLightBlue-100" />
                  Profession
                </label>
                <motion.input
                  type="text"
                  id="profession"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  required
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 2 }}
                />
                {errors.profession && (
                  <span className="text-red-500 text-sm mt-2 block">
                    {errors.profession}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label
                  className="block text-gray-600 font-medium mb-2 flex items-center w-1/2"
                  htmlFor="password"
                >
                  <FaLock className="mr-2 text-customLightBlue-100" />
                  Password
                </label>
                <motion.input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 2 }}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm mt-2 block">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label className="block text-gray-600 font-medium mb-2 flex items-center w-1/2">
                  <FaLock className="mr-2 text-customLightBlue-100" />
                  Confirm Password
                </label>
                <motion.input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 2 }}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm mt-2 block">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <div className="flex items-center mb-5 w-full">
                <input type="checkbox" id="terms" className="mr-2" required />
                <label htmlFor="terms" className="text-gray-600 w-max" >
                  I agree to the Terms & Conditions
                </label>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#dbe4ff' }}
                type="submit"
                className="w-full bg-customLightBlue text-zinc-500 py-3 rounded-lg shadow-md transition duration-300 mt-2"
              >
                Register
              </motion.button>
            </form>
            
          <Link to="/" className="text-blue-500 hover:underline">
            Already have an account? Sign In
          </Link>
            {fail && (
              <p className="text-red-500 text-sm mt-2 text-center">{fail}</p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
