import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <div id="header">
      <div id="header-left">
        <h1><Link to='/subjects' id="logo">Flashcards</Link></h1>
      </div>
      <div id="header-right">
        <p id="welcome">Welcome {props.currentUser.username.toUpperCase()}</p>
        <Link to='/login' id="login-out" onClick={props.handleLogout}>Logout</Link>
      </div>
    </div>
  )
}



