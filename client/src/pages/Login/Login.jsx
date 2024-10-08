import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutation";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../utils/GlobalState";
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import '../../assets/styles/AuthForm.css';

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [state, dispatch] = useGlobalState();
  const [login, { error }] = useMutation(LOGIN_USER);
  const [errorMessage, setErrorMessage] = useState("");

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
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container className="auth-container">
      <video autoPlay loop muted className="background-video">
        <source src="/src/assets/videos/login-background.mp4" type="video/mp4" />
      </video>
      <Box className="auth-form" component="form" onSubmit={handleFormSubmit} noValidate>
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
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
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        {error && <Typography color="error">{error.message}</Typography>}
        <Link to="/signup">
          Don't have an account? Sign up
        </Link>
      </Box>
    </Container>
  );
};

export default Login;