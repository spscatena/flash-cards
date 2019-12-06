import React from 'react';
import { Link } from 'react-router-dom';

// This component handles our register form
const Register = (props) => {

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        {/* <hr /> */}
        <form onSubmit={props.handleRegister} >
          <p>Username:</p>
          <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
          {/* <p>Email:</p>
        <input name="email" type="text" value={props.formData.email} onChange={props.handleChange} /> */}
          <p>Password:</p>
          <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
          <br />
          <button>Register</button>
          <p>Already a memeber?Sign in <Link to="/login">here.</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
