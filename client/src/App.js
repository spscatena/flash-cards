import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Login from './components/Login'
import Register from './components/Register'
import Cards from './components/Cards'


import {
  createCard,
  readAllCards,
  updateCard,
  destroyCard,
  putSubject,
  destroySubject,
  readAllSubjects,
  createSubject,
  loginUser,
  registerUser,
  verifyUser
} from './services/api-helper'

import './App.css';
import Header from './components/Header';
import Subjects from './components/Subjects';
import EditSubject from './components/EditSubject';
import EditCard from './components/EditCard'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // comments: [],

      currentUser: null,
      authFormData: {
        username: "",
        password: ""
      },
      editSubjectData: {
        title: "",
        description: ""
      },
      createSubjectData: {
        title: "",
        description: ""
      },
      createCardData: {
        question: "",
        answer: ""
      },
      editCardData: {
        queston: "",
        answer: ""
      },

      subjects: [],
      cards: []
    }
      ;
  }

  async componentDidMount() {

    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
      this.getSubjects();
    } else {
      this.props.history.push("/login")
    }
  }

  getSubjects = async () => {
    const subjects = await readAllSubjects(this.state.currentUser.id)
    this.setState({
      subjects
    })
    this.props.history.push("/subjects")
  }


  getCards = async () => {
    const cards = await readAllCards(this.state.currentUser.id)
    this.setState({
      cards
    })
    this.props.history.push("/cards")
  }


  handleSubjectDelete = async (id) => {
    await destroySubject(id);
    this.setState(prevState => ({
      subjects: prevState.subjects.filter(subject => subject.id !== parseInt(id))
    }))
  }


  handleCardDelete = async (id) => {
    await destroyCard(id);
    this.setState(prevState => ({
      cards: prevState.cards.filter(card => card.id !== parseInt(id))
    }))
  }

  // when the submit button is pressed
  handleEditSubmit = async (id) => {
    const updatedSubject = await putSubject(id, this.state.editSubjectData);
    this.setState(prevState => ({
      subjects: prevState.subjects.map(subject => {
        return subject.id === parseInt(id) ? updatedSubject : subject
      })
    }));
    this.props.history.push(`/subjects`);
  }

  handleCardEditSubmit = async (id) => {
    const updatedCard = await updateCard(id, this.state.editCardData);
    this.setState(prevState => ({
      cards: prevState.cards.map(card => {
        return card.id === parseInt(id) ? updatedCard : card
      })
    }));
    this.props.history.push(`/cards`);
  }



  // Create subject
  handleSubjectSubmit = async () => {
    const subject = await createSubject(this.state.createSubjectData)
    this.setState(prevState => ({
      subjects: [...prevState.subjects, subject],
      createSubjectData: {
        title: "",
        description: ""
      }
    }));
  }

  //Create card
  handleCardSubmit = async () => {
    const card = await createCard(this.state.createCardData)
    this.setState(prevState => ({
      cards: [...prevState.cards, card],
      createCardData: {
        question: "",
        answer: ""
      }
    }));
  }



  mountEditForm = async (id) => {
    const subjects = await readAllSubjects();
    const subject = subjects.find(el => el.id === parseInt(id));
    this.setState({
      editSubjectData: subject
    });
  }

  mountCardEditForm = async (id) => {
    const cards = await readAllCards();
    const card = cards.find(el => el.id === parseInt(id));
    this.setState({
      editCardData: card
    });
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
    this.getSubjects();
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


  // MOVE THIS TO THE ABOVE? MAKE SURE. 

  handleCreateSubjectChange = async (ev) => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      createSubjectData: {
        ...prevState.createSubjectData,
        [name]: value
      }
    }))
  }

  handleEditSubjectChange = async (ev) => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      editSubjectData: {
        ...prevState.editSubjectData,
        [name]: value
      }
    }))
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
                subjects={this.state.subjects}
                handleSubjectDelete={this.handleSubjectDelete}
                handleSubjectSubmit={this.handleSubjectSubmit}
                createSubjectData={this.state.createSubjectData}
                handleChange={this.handleCreateSubjectChange}
              />
            )} />
            <Route exact path="/subjects/:id/edit" render={(props) => {
              const subjectId = props.match.params.id
              return <EditSubject
                subjectId={subjectId}
                editSubjectData={this.state.editSubjectData}
                handleChange={this.handleEditSubjectChange}
                handleEditSubmit={this.handleEditSubmit}
                mountEditForm={this.mountEditForm}
              />
            }}
            />
            <Route exact path="/subjects/:id/cards" render={(props) => (
              <Cards
                cards={this.state.cards}
                handleCardDelete={this.handleCardDelete}
                handleCardSubmit={this.handleCardSubmit}
                createCardData={this.state.createCardData}
                handleChange={this.handleCreateCardChange}
              />
            )} />
            <Route exact path="/subjects/:id/cards/:id/edit" render={(props) => {
              const cardId = props.match.params.id
              return <EditCard
                subjectId={cardId}
                editCardData={this.state.editCardData}
                handleChange={this.handleEditCardChange}
                handleEditSubmit={this.handleCardEditSubmit}
                mountEditForm={this.mountCardEditForm}
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

        {/* <Route exact path="/"render={() => (
            <CommentsView
              comments={this.state.comments}
              commentForm={this.state.commentForm}
              handleFormChange={this.handleFormChange}
              newComment={this.newComment} />
          )}
        /> */}

        {/* <Route path="/new/comment" render={() => (
            <CreateComment
              handleFormChange={this.handleFormChange}
              commentForm={this.state.commentForm}
              newComment={this.newComment} />
        )} /> */}

        {/* <Route path="/comments/:id" render={(props) => {
            const { id } = props.match.params;
            const comment = this.state.comments.find(el => el.id === parseInt(id));
            return <CommentPage
              id={id}
              comment={comment}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editComment={this.editComment}
              commentForm={this.state.commentForm}
              deleteComment={this.deleteComment} />
          }}
        /> */}
      </div>
    );
  }
}


export default withRouter(App);