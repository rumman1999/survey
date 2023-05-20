import React from "react";
import { useState } from 'react';
import "./Register.css";
import { BrowserRouter as Router, Link } from 'react-router-dom';


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        // Email validation
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email address';
        }

        // Password validation
        if (!password) {
            errors.password = 'Password is required';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Perform sign-in logic or API call here
            console.log('Sign In successful');
        } else {
            console.log('Invalid form');
        }
    };

    return (
        <div className="main-continer">
            <div className="heading1">
                <p className="text1">
                    Welcome Page
                    <br /> One line text <br /> Will be here{" "}
                </p>
                <p className="text2">Sign in to continue access pages</p>
                <p className="text3">Don’t Have An Account?</p>
                <button className="register">Sign In </button>
            </div>
            <div className="Register">
                <form onSubmit={handleSubmit}>
                    <h1>Register </h1>
                    <p className="text">Register in to continue access pages</p>
                    <div className="rows">
                        <div className="form-flex">
                            <label className="label" htmlFor="name" >Name</label>
                            <input type="text" id="name" className="input-field" required />
                        </div>
                        <div className="form-flex">
                            <label className="label" htmlFor="email">Email</label>
                            <input type="email" id="email" className="input-field" value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-flex">
                            <label className="label" htmlFor="email">Phone number</label>
                            <input type="number" id="number" className="input-field" required />
                        </div>
                        <div className="form-flex">
                            <label className="label" htmlFor="Profession">Profession</label>
                            <input type="Text" id="pro" className="input-field" required />
                        </div>
                        <div className="form-flex">
                            <label className="label" htmlFor="Password">Password</label>
                            <input type="password" id="pass" className="input-field" value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                            {errors.password && <span>{errors.password}</span>}

                        </div>
                        <div className="form-flex">
                            <label className="label" htmlFor="password"> Confirm Password</label>
                            <input type="password" id="" className="input-field" required />
                        </div>
                        <div className="checkbox">
                            <label className="checkbox-label">
                                <input type="checkbox" className="checkbox-input" />
                                I agree to Terms & Condition receiving marketing and promotional materials
                            </label>
                        </div>
                    </div>
                    <div className="btn1">
                        <button>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
