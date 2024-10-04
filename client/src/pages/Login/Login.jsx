// client/src/pages/Login/Login.jsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutation";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom"; // Import Link
import { useGlobalState } from "../../utils/GlobalState";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [state, dispatch] = useGlobalState();
  console.log(state);
  const [login, { error }] = useMutation(LOGIN_USER);

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
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
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
        <br></br>
        <button type="submit">Submit</button>
        <br></br>
        <br></br>
        <Link to="/signup">No account? Signup</Link>
      </form>
      {error && <div> Login failed </div>}
    </div>
  );
};

export default Login;
