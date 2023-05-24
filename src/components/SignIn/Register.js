import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./Register.css";
import { BrowserRouter as Router, Link } from 'react-router-dom';
const REACT_APP_API_ENDPOINT = 'http://localhost:5001'


function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profession, setProfession] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [fail, setFail] = useState('');

    const validateForm = () => {
        const errors = {};

        if (!name) {
            errors.name = 'Name is required';
        }

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email address';
        }

        if (!phoneNumber) {
            errors.phoneNumber = 'Phone number is required';
        }

        if (!profession) {
            errors.profession = 'Profession is required';
        }

        if (!password) {
            errors.password = 'Password is required';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        console.log(errors);
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(validateForm());
        if (validateForm()) {
            const registrationData = {
                name,
                email,
                phoneNumber,
                profession,
                password
            };
            fetch(`${REACT_APP_API_ENDPOINT}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            })
                .then(response => {
                    if (response.status === 201) {
                        console.log('Registration successful');
                        navigate('/');
                    } else {
                        if (response.status === 409) {
                            console.log('Registration unsuccessful')
                            setFail("User with this email already exists plss login")
                        }
                        throw new Error(response);
                    }
                })
                .catch(error => {
                    console.log('Registration failed:', error);
                });
        } else {
            console.log('Invalid form');

        }
    };

    return (
        <div className="abc">
            <div className="main-continer">
                <div className="heading1">
                    <p className="text1">
                        Welcome Page
                        <br /> One line text <br /> Will be here{" "}
                    </p>
                    <p className="text2">Sign in to continue access pages</p>
                    <p className="text3">Don’t Have An Account?</p>

                    <Link to="/">
                        <button className="reg-btn">Sign In </button></Link>
                </div>
                <div className="Register">
                    <form onSubmit={handleSubmit}>
                        <h1>Register </h1>
                        <p className="text">Register in to continue access pages</p>
                        {
                            fail && <p>{fail}</p>
                        }
                        <div className="rows">
                            <div className="form-flex">
                                <label className="label" htmlFor="name" >Name</label>
                                <input type="text" id="name" className="input-field" value={name}
                                    onChange={(e) => setName(e.target.value)} required />
                                {errors.name && <span>{errors.name}</span>}
                            </div>
                            <div className="form-flex">
                                <label className="label" htmlFor="email">Email</label>
                                <input type="email" id="email" className="input-field" value={email}
                                    onChange={(e) => setEmail(e.target.value)} required />{errors.email && <span>{errors.email}</span>}
                            </div>
                            <div className="form-flex">
                                <label className="label" htmlFor="number">Phone number</label>
                                <input type="number" id="number" className="input-field" value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)} required />
                                {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
                            </div>
                            <div className="form-flex">
                                <label className="label" htmlFor="pro">Profession</label>
                                <input type="Text" id="pro" className="input-field" value={profession}
                                    onChange={(e) => setProfession(e.target.value)} required />
                                {errors.profession && <span>{errors.profession}</span>}
                            </div>
                            <div className="form-flex">
                                <label className="label" htmlFor="pass">Password</label>
                                <input type="password" id="pass" className="input-field" value={password}
                                    onChange={(e) => setPassword(e.target.value)} required />
                                {errors.password && <span>{errors.password}</span>}

                            </div>
                            <div className="form-flex">
                                <label className="label" htmlFor="confirmPassword"> Confirm Password</label>
                                <input type="password" id="confirmPassword" className="input-field" value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} required />
                                {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                            </div>
                            <div className="checkbox">
                                <label className="checkbox-label">
                                    <input type="checkbox" className="checkbox-input" required />
                                    I agree to Terms & Condition receiving marketing and promotional materials
                                </label>
                            </div>
                        </div>
                        <div className="btn1">
                            <button className="reg-btn">Register</button>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Register;
