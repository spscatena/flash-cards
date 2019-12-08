import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header>
      <h1><Link to='/subjects'>Flashcards</Link></h1>
      {/* <div> */}
      <p>Welcome {props.currentUser.username.toUpperCase()}</p>
      {/* <button id="logout" onClick={props.handleLogout}>logout</button> */}
      <Link to='/login'onClick={props.handleLogout}>LOGOUT</Link>
      {/* </div> */}
    </header>
  )
}



{/* <h1><Link to='/' onClick={props.resetForm}>Flashcards</Link></h1> */ }
