import React, { Component } from 'react'
import SubjectCreate from "./SubjectCreate"

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
        />

        <div id="subject-container">
          {this.props.subjects.map(subject => (

            <div id="subject-card" key={subject.id}>
              <p>{subject.title}</p>
              <p>{subject.description}</p>
              <button onClick={() => this.props.handleSubjectDelete(subject.id)}>Delete</button>
            </div>))}
        </div>
      </div>
    )
  }
}


