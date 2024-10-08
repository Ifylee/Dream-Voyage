import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutation';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import '../../assets/styles/AuthForm.css';

const Signup = () => {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });

        // Basic email validation
        if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
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
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={formState.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
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
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                {error && <Typography color="error">{error.message}</Typography>}
                <Link to="/login">
                    Already have an account? Sign in
                </Link>
            </Box>
        </Container>
    );
};

export default Signup;