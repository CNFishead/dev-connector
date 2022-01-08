import React, { useState } from "react";

const Login = () => {
  // Component State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Destructure state
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1 class="large text-primary">Sign In</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Sign into Your Account
      </p>
      <form class="form" onSubmit={submitHandler}>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
        Don't have an account? <a href="register.html">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
