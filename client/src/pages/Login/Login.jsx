import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutation";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Container, Box,Grid2 as Grid } from "@mui/material";
import "../../assets/styles/AuthForm.css";

const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false); // Add a state to track login failure
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
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
      const { data } = await login({
        variables: { ...formState },
      });
      // Assuming the server doesn't return an error, but just no data on incorrect credentials
      if (data && data.login && data.login.token) {
        setLoginFailed(true);

        Auth.login(data.login.token);
        navigate("/");
      }
      else{
        return setLoginFailed(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="auth-container">
      <video autoPlay loop muted className="background-video">
        <source
          src="/src/assets/videos/login-background.mp4"
          type="video/mp4"
        />
      </video>
      <Box
        className="auth-form"
        component="form"
        onSubmit={handleFormSubmit}
        noValidate
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>
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
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
        <Link
          to="/signup"
          style={{
            textDecoration: "none",
            marginTop: "10px",
            display: "block",
            textAlign: "center",
          }}
        >
          No account? Signup
        </Link>
        {loginFailed && <Grid container justifyContent ={"center"} sx={{paddingTop:"10px"}}><Typography color="error">Invalid Credientials</Typography></Grid>}
      </Box>
    </Container>
  );
};

export default Login;
