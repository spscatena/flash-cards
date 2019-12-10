import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Login from './components/Login'
import Register from './components/Register'
import Cards from './components/Cards'
import { loginUser, registerUser, verifyUser } from './services/api-helper'
import './App.css';
import Header from './components/Header';
import Subjects from './components/Subjects';
import EditSubject from './components/EditSubject';
import EditCard from './components/EditCard'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      subjects: [],
      authFormData: {
        username: "",
        password: ""
      },

    }
  }

  async componentDidMount() {

    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
    } else {
      this.props.history.push("/login")
    }
  }



  // -------------- AUTH ------------------

  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleRegisterButton = () => {
    this.props.history.push("/register")
  }

  handleLogin = async () => {
    const currentUser = await loginUser(this.state.authFormData);
    this.setState({
      currentUser,
      authFormData: {
        username: "",
        password: ""
      }
    });
    this.props.history.push("/subjects")
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({
      currentUser,
      authFormData: {
        username: "",
        password: ""
      }
    });
    this.props.history.push("/subjects")
  }

  handleLogout = () => {

    localStorage.removeItem("authToken");
    this.setState({
      currentUser: null
    })
    this.props.history.push("/login")
  }

  authHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  render() {
    return (
      <div className="App" >
        {this.state.currentUser &&
          <>
            <Header
              handleLoginButton={this.handleLoginButton}
              handleRegisterButton={this.handleRegisterButton}
              handleLogout={this.handleLogout}
              currentUser={this.state.currentUser}
            />
            <Route exact path="/subjects" render={(props) => (
              <Subjects
                userId={this.state.currentUser.id}
              />
            )} />
            <Route exact path="/subjects/:id/edit" render={(props) => {
              const subjectId = props.match.params.id
              return <EditSubject
                subjectId={subjectId}
                history={this.props.history}
              />
            }}
            />
            <Route exact path="/subjects/:id/cards" render={(props) => {
              const subjectId = props.match.params.id
              return <Cards
                subjectId={subjectId}
              />
            }} />
            <Route exact path="/subjects/:subjectId/cards/:cardId/edit" render={(props) => {
              const subjectId = props.match.params.subjectId
              const cardId = props.match.params.cardId
              return <EditCard
                subjectId={subjectId}
                cardId={cardId}
                history={this.props.history}
              />
            }}
            />

          </>


        }
        {!this.state.currentUser &&
          <>
            <Route exact path="/login" render={() => (
              <Login
                handleLogin={this.handleLogin}
                handleChange={this.authHandleChange}
                formData={this.state.authFormData}
                handleRegisterButton={this.handleRegisterButton}
              />)} />

            <Route exact path="/register" render={() => (
              <Register
                handleRegister={this.handleRegister}
                handleChange={this.authHandleChange}
                formData={this.state.authFormData}
                handleLoginButton={this.handleLoginButton}
              />)} />
          </>
        }
      </div>
    );
  }
}


export default withRouter(App);