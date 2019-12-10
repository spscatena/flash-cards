import React, { Component } from 'react'
import { readAllSubjects, putSubject } from '../services/api-helper'

export default class EditSubject extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editSubjectData: {
        title: "",
        description: ""
      }
    }
  }

  componentDidMount = async () => {
    const subjects = await readAllSubjects();
    const subject = subjects.find(el => el.id === parseInt(this.props.subjectId));
    this.setState({
      editSubjectData: subject
    });
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

  // when the submit button is pressed
  handleEditSubmit = async (id) => {
    await putSubject(id, this.state.editSubjectData);
    this.props.history.push(`/subjects`);
  }

  handleChange = async (ev) => {
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
      <div id="add-subject-edit-form">
        <p><span style={{ color: "white", fontSize: 26, }}>Edit Your Subject</span></p>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.handleEditSubmit(this.props.subjectId);
        }}
        >
          <div id="edit-subject-form">
            <label htmlFor="title"></label>
            <input
              className="form-subject-title"
              type="text"
              name="title"
              value={this.state.editSubjectData.title}
              onChange={this.handleChange}
            />
            <label htmlFor="description"></label>
            <textarea
              className="form-subject-description"
              type="text"
              name="description"
              value={this.state.editSubjectData.description}
              onChange={this.handleChange}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

