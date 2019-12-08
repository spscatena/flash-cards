import React, { Component } from 'react'

export default class SubjectCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createSubjectData: {
        title: "",
        description: ""
      },
    }
  }

  handleSubmit = async () => {
    this.props.handleCreate(this.state.createSubjectData)
    this.setState(prevState => ({
      createSubjectData: {
        title: "",
        description: ""
      }
    }));
  }

  handleChange = async (ev) => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      createSubjectData: {
        ...prevState.createSubjectData,
        [name]: value
      }
    }))
  }

  render() {
    return (
      <div id="add-subject-form">
        <form onSubmit={(e) => {
          e.preventDefault();
          this.handleSubmit();
        }}
        >
          <input
            type="text"
            onChange={this.handleChange}
            name="title"
            placeholder="Subject Title"
            id="title"
            value={this.state.createSubjectData.title}
          />
          <input type="text"
            onChange={this.handleChange}
            name="description"
            placeholder="Subject Description"
            id="description"
            value={this.state.createSubjectData.description}
          />
          <input type="submit" value="Add Subject" />
        </form>
      </div>
    )
  }
}
