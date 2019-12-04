import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header>
      <h1><Link to='/' onClick={props.resetForm}>Flashcards</Link></h1>
      <div>
        
          
            <p>{props.currentUser.username}</p>
            <button onClick={props.handleLogout}>logout</button>
          
          
      </div>
    </header>
  )
}
