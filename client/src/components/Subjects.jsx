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
          createSubjectData={this.props.createSubjectData}
        />

        <div id="subject-container">
          {this.props.subjects.map(subject => (
            <div>
              <div id="subject-card" key={subject.id}>
                <p>Subject: {subject.title}</p>
                <p>Description: {subject.description}</p>
              </div>
              <div>
                <button onClick={() => this.props.handleSubjectDelete(subject.id)}>Delete</button>
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


