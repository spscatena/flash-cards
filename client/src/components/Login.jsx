import React from 'react';
import { Link } from 'react-router-dom';


// This component handles our login form and has a link to the register form
const Login = (props) => {

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login into Flashcards</h2>
        {/* <hr /> */}
        <form onSubmit={(e) => {
          e.preventDefault();
          props.handleLogin();
        }} >
          <p>Username:</p>
          <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
          <p>Password:</p>
          <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
          {/* <hr /> */}
          <p><button className="login-reg-button">Login</button></p>
          <p>Don't have an account yet? Register <Link to="/register"><b>here</b>!</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;

