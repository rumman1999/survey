import { motion, useSpring, useAnimation } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const REACT_APP_API_ENDPOINT = 'https://survey-backend-g0aa.onrender.com';

function SignIn() {
  const { setUser } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [fail, setFail] = useState('');
  const navigate = useNavigate();

  const fadeIn = useSpring({
    opacity: 1,
    scale: 1,
    from: { opacity: 0, scale: 0.9 },
    config: { tension: 200, friction: 25 },
  });

  const bounce = useSpring({
    y: [0, -10, 0],
    config: { duration: 1000 },
  });

  // Animated gradient background
  const backgroundAnimation = useAnimation();
  useEffect(() => {
    backgroundAnimation.start({
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: { duration: 10, ease: "linear", loop: Infinity },
    });
  }, [backgroundAnimation]);

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const loginData = { email, password };
      fetch(`${REACT_APP_API_ENDPOINT}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      })
        .then(response => {
          if (response.status === 202) return response.json();
          else if (response.status === 401) throw new Error('Incorrect Password');
          else if (response.status === 404) throw new Error('No user Found Please Register First');
          else throw new Error('Login failed');
        })
        .then(data => {
          const token = data.token;
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
          setUser({ email, token });
          setFail('');
          navigate('/surveyItems');
        })
        .catch(error => setFail(error.message));
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{ y: bounce }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl p-0">
        {/* Left Section: Introduction */}
        <motion.div
          style={{
            ...fadeIn,
            background: 'linear-gradient(45deg, #e0eafc, #cfdef3)',
            backgroundSize: '200% 200%',
            ...backgroundAnimation
          }}
          className="lg:w-1/2 w-full flex flex-col justify-center p-8 text-zinc-600"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Welcome to Survey Platform
          </h1>
          <p className="text-lg mb-4 ">
            Create and manage surveys effortlessly with our user-friendly tools.
          </p>
        </motion.div>

        {/* Right Section: Sign In Form */}
        <div className="lg:w-1/2 w-full p-8 flex items-center justify-center bg-gray-50">
          <motion.div style={fadeIn} className="w-full max-w-sm">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 text-center text-zinc-600 mb-5">
              Sign In to Continue
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5 mt-5">
                <label
                  className="block text-gray-600 font-medium mb-2 flex items-center"
                  htmlFor="email"
                >
                  <FaEnvelope className="mr-2 text-blue-500" />
                  Email Address
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
                  transition={{ duration: 0.3 }}
                />
                {errors.email && (
                  <motion.span
                    className="text-red-500 text-sm mt-2 block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.email}
                  </motion.span>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-600 font-medium mb-2 flex items-center"
                  htmlFor="password"
                >
                  <FaLock className="mr-2 text-blue-500" />
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
                  transition={{ duration: 0.3 }}
                />
                {errors.password && (
                  <motion.span
                    className="text-red-500 text-sm mt-2 block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.password}
                  </motion.span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#dbe4ff' }}
                type="submit"
                className="w-full bg-customLightBlue text-zinc-500 py-3 rounded-lg shadow-md transition duration-300 mt-2"
              >
                Sign In
              </motion.button>
            </form>
            {fail && (
              <motion.div
                className="text-red-500 mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {fail}
              </motion.div>
            )}
            <div className="text-center mt-6">
              <p className="text-gray-500 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-500 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
            <div className="flex justify-between items-center mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default SignIn;
