import React, { useState } from 'react'
import { useNavigate ,} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignIn.css'
const REACT_APP_API_ENDPOINT='http://localhost:5001'


function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [fail, setFail] = useState('');
    const navigate = useNavigate();
 
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
        console.log(errors);
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(validateForm());
        if (validateForm()) {
            const loginData = {
                email,
                password
            };
        fetch(`${REACT_APP_API_ENDPOINT}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          })
            .then(response => {
              if (response.status === 202) {
                return response.json();
              } else if (response.status === 401) {
                throw new Error('Incorrect Password');
              } else if (response.status === 404) {
                throw new Error('No user Found Please Register First');
              } else {
                throw new Error('Login failed');
              }
            })
            .then(data => {
              const token = data.token;
              // console.log('Login successful');
              // console.log(token);
              localStorage.setItem('token' , token)
              localStorage.setItem('email' , email)
              setFail('');
              navigate('/surveyItems');
            })
            .catch(error => {
              // console.log('Login failed:', error);
              setFail(error.message);
            });
        } else {
            // console.log('Invalid form');
            
        }
    };
    return (
        <div className="abc">
            <div className='main-continer'>
            <div className='heading1'>
                <p className='text1'>Welcome Page<br /> One line text <br /> Will be here </p>
                <p className='text2'>Sign in to continue access pages</p>
                <p className='text3'>Don’t Have An Account?</p>
                
                <Link to="/register">
                <button className='register'>Register  </button></Link>
            </div>
            <div className='signin'>
                <form>
                    <h1>Sign In </h1>
                    <p className='text'>Sign in to continue access pages</p> {
                    fail && <p className='text'>{fail}</p>
                }
                    <div className="form-group">
                        {/* <label className="label" htmlFor="email">Email</label>
                        <input type="email" id="email" className="input-field" required /> */}
                          <label className="label" htmlFor="email">Email</label>
                            <input type="email" id="email" className="input-field" value={email}
                                onChange={(e) => setEmail(e.target.value)} required />{errors.email && <span>{errors.email}</span>}
                    </div>
                    <div className='form-group'>
                        {/* <label htmlFor='Password'>Password</label>
                        <input type='password' name='Password' required></input> */}
                        <label className="label" htmlFor="pass">Password</label>
                            <input type="password" id="pass" className="input-field" value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                            {errors.password && <span>{errors.password}</span>}
                    </div>
                    <div className='btn'>
                        <button onClick={handleSubmit}>Sign in</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default SignIn
