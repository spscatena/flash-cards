import React from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom'
import LandingPage from './components/Login'



class App extends React.Component {
  constructor() {
    super();
    this.state = {
   
    }





    return (
      <div className="app">
        <LandingPage />

      </div>
    );
  }
}


export default App;