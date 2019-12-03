import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

// import CommentsView from './components/CommentsView';
// import CommentPage from './components/CommentPage';
// import CreateComment from './components/CreateComment'
import Login from './components/Login'
import Register from './components/Register'

import {
  // createComment,
  // readAllComments,
  // updateComment,
  // destroyComment,
  loginUser,
  registerUser,
  verifyUser
} from './services/api-helper'

import './App.css';
import Header from './components/Header';

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
      }
    };
  }

  async componentDidMount() {
    // this.getComments();
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
    }
  }

  // getComments = async () => {
  //   const comments = await readAllComments();
  //   this.setState({
  //     comments
  //   })
  // }

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

  // deleteComment = async (id) => {
  //   await destroyComment(id);
  //   this.setState(prevState => ({
  //     comments: prevState.comments.filter(comment => comment.id !== id)
  //   }))
  // }

  // handleFormChange = (e) => {
  //   const { name, value } = e.target;
  //   this.setState(prevState => ({
  //     commentForm: {
  //       ...prevState.commentForm,
  //       [name]: value
  //     }
  //   }))
  // }

  // mountEditForm = async (id) => {
  //   const comments = await readAllComments();
  //   const comment = comments.find(el => el.id === parseInt(id));
  //   this.setState({
  //     commentForm: comment
  //   });
  // }

  // resetForm = () => {
  //   this.setState({
  //     commentForm: {
  //       content: "",
  //       hashtag: "",
  //       title: ""
  //     }
  //   })


// -------------- AUTH ------------------

handleLoginButton = () => {
  this.props.history.push("/login")
}

handleLogin = async () => {
  const currentUser = await loginUser(this.state.authFormData);
  this.setState({ currentUser });
}

handleRegister = async (e) => {
  e.preventDefault();
  const currentUser = await registerUser(this.state.authFormData);
  this.setState({ currentUser });
}

handleLogout = () => {
  localStorage.removeItem("jwt");
  this.setState({
    currentUser: null
  })
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
      <Header
        handleLoginButton={this.handleLoginButton}
        handleLogout={this.handleLogout}
        currentUser={this.state.currentUser}
      />
      <Route exact path="/login" render={() => (
        <Login
          handleLogin={this.handleLogin}
          handleChange={this.authHandleChange}
          formData={this.state.authFormData} />)} />

      <Route exact path="/register" render={() => (
        <Register
          handleRegister={this.handleRegister}
          handleChange={this.authHandleChange}
          formData={this.state.authFormData} />)} />

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