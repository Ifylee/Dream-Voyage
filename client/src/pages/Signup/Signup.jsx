// client/src/pages/Signup/Signup.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutation';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
        const { data } = await addUser({
            variables: { ...formState },
        });
        Auth.login(data.addUser.token);
        } catch (e) {
        console.error(e);
        }
    };

    return (
        <div>
        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
            <input
            name="firstName"
            type="text"
            value={formState.firstName}
            onChange={handleChange}
            placeholder="First Name"
            />
            <input
            name="lastName"
            type="text"
            value={formState.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            />
            <input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            />
            <input
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Password"
            />
            <button type="submit">Submit</button>
            <br></br>
            <br></br>
            <Link to="/login">Back to Login</Link>
        </form>
        {error && <div>Signup failed</div>}
        </div>
    );
};

export default Signup;