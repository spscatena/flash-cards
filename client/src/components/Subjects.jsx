import React, { Component } from 'react'
import SubjectCreate from "./SubjectCreate"
import { Link } from 'react-router-dom';
import { destroySubject, readAllSubjects, createSubject } from '../services/api-helper'


export default class Subjects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subjects: []
    }
  }

  async componentDidMount() {
    const subjects = await readAllSubjects(this.props.userId)
    this.setState({
      subjects
    })
  }

  // Create subject
  handleCreate = async (data) => {
    const subject = await createSubject(data)
    this.setState(prevState => ({
      subjects: [...prevState.subjects, subject],
    }));
  }

  handleSubjectDelete = async (id) => {
    if (window.confirm("This action will delete this Subject and all of it's cards. Would you like to continue?")) {
      await destroySubject(id);
      this.setState(prevState => ({
        subjects: prevState.subjects.filter(subject => subject.id !== parseInt(id))
      }))
    }
  }

  render() {
    return (
      <div className="subject-card-page">
        <SubjectCreate
          handleCreate={this.handleCreate}
        />

        <div id="subject-container">
          {this.state.subjects.map(subject => (
            <div>
              <div id="subject-card" key={subject.id}>
                <p>Subject:<span className="handwriting"> {subject.title}</span></p>
                <p>Description:<span className="handwriting"> {subject.description}</span></p>
              </div>
              <div>
                <button onClick={() => this.handleSubjectDelete(subject.id)}>Delete</button>
                <button><Link to={`/subjects/${subject.id}/edit`}>Edit</Link></button>
                <button><Link to={`/subjects/${subject.id}/cards`}>Cards</Link></button>
              </div>
            </div>
          ))}

        </div>
        </div>
    )
  }
}


