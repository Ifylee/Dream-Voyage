import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { ADD_USER } from '../../utils/mutation';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import '../../assets/styles/AuthForm.css';

const Signup = () => {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
    const navigate = useNavigate();

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
        navigate('/');
        } catch (e) {
        console.error(e);
        }
    };

    return (
        <Container className="auth-container">
            <br></br>
        <video autoPlay loop muted className="background-video">
            <source src="/src/assets/videos/login-background.mp4" type="video/mp4" />
        </video>
        <Box className="auth-form" component="form" onSubmit={handleFormSubmit} noValidate>
            <Typography variant="h4" component="h2" gutterBottom>
            Signup
            </Typography>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="fname"
            autoFocus
            value={formState.firstName}
            onChange={handleChange}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lname"
            value={formState.lastName}
            onChange={handleChange}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formState.email}
            onChange={handleChange}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formState.password}
            onChange={handleChange}
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            >
            Submit
            </Button>
            <Link to="/login" style={{ textDecoration: 'none', marginTop: '10px', display: 'block', textAlign: 'center' }}>
            Back to Login
            </Link>
            {error && <Typography color="error">Signup failed</Typography>}
        </Box>
        </Container>
    );
};

export default Signup;