import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

// import CommentsView from './components/CommentsView';
// import CommentPage from './components/CommentPage';
// import CreateComment from './components/CreateComment'
import Login from './components/Login'
import Register from './components/Register'

import {
  // createComment,
  // readAllComments,
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // comments: [],
      // commentForm: {
      //   content: "",
      //   hashtag: "",
      //   title: ""
      // },
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
      subjects: []
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



  // newComment = async (e) => {
  //   e.preventDefault();
  //   const comment = await createComment(this.state.commentForm);
  //   this.setState(prevState => ({
  //     comments: [...prevState.comments, comment],
  //     commentForm: {
  //       content: "",
  //       hashtag: "",
  //       title: ""
  //     }
  //   }))
  // }


  // editComment = async () => {
  //   const { commentForm } = this.state
  //   await updateComment(commentForm.id, commentForm);
  //   this.setState(prevState => (
  //     {
  //       comments: prevState.comments.map(comment => {
  //         return comment.id === commentForm.id ? commentForm : comment
  //       }),
  //     }
  //   ))
  // }

  handleSubjectDelete = async (id) => {

    await destroySubject(id);
    this.setState(prevState => ({
      subjects: prevState.subjects.filter(subject => subject.id !== parseInt(id))
    }))
  }

  handleEditSubmit = async (id) => {
    const updatedSubject = await putSubject(id, this.state.editSubjectData);
    debugger;
    this.setState(prevState => ({
      subjects: prevState.subjects.map(subject => {
        return subject.id === parseInt(id) ? updatedSubject : subject
      })
      // ,
      // subjectData: {
      //   title: "",
      //   description: ''
      // }

    }));
    // this.resetForm();
    this.props.history.push(`/subjects`);
  }


  handleSubjectSubmit = async () => {
    const subject = await createSubject(this.state.createSubjectData)
    this.setState(prevState => ({
      subjects: [...prevState.subjects, subject],
      createSubjectData: {
        title: "",
        description: ''
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



  // resetForm = () => {
  //   debugger
  //   this.setState({
  //     subjectData: {
  //       title: "",
  //       description: ""
  //     }
  //   })
  // }


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

  // handleSubjectEditChange = async (ev) => {
  //   const { name, value } = ev.target
  //   this.setState(prevState => ({
  //     subjectData: {
  //       ...prevState.subjectData,
  //       [name]: value
  //     }
  //   }))
  // }


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