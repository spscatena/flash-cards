import React, { Component } from 'react'
import SubjectCreate from "./SubjectCreate"
import { Link } from 'react-router-dom';


export default class Subjects extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <SubjectCreate
          handleChange={this.props.handleChange}
          handleSubjectSubmit={this.props.handleSubjectSubmit}
          subjectData={this.props.subjectData}
        // handleEditSubject={this.props.handleEditSubject}
        />

        <div id="subject-container">
          {this.props.subjects.map(subject => (

            <div id="subject-card" key={subject.id}>
              <p>{subject.title}</p>
              <p>{subject.description}</p>
              <button onClick={() => this.props.handleSubjectDelete(subject.id)}>Delete</button>
              <Link to={`/subjects/${subject.id}/edit`} >Edit </Link>
              {/* // <button onClick={() => this.props.handleEditSubject(subject.id)}>Edit</button> */}
            </div>))}
        </div>
      </div>
    )
  }
}


