import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <div id="header">
      <div id="header-left">
      <h1><Link to='/subjects'>Flashcards</Link></h1>
      <p id="welcome">Welcome {props.currentUser.username.toUpperCase()}</p>
      </div>
        <Link to='/login' id="login-out" onClick={props.handleLogout}>Logout</Link>
    </div>
  )
}



{/* <h1><Link to='/' onClick={props.resetForm}>Flashcards</Link></h1> */ }
