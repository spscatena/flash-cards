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
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.handleEditSubmit(this.props.subjectId);
        }}>
          <label htmlFor="title">Subject Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.editSubjectData.title}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="description">Subject Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={this.state.editSubjectData.description}
            onChange={this.handleChange}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

