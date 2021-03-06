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
      <div>
        <div id="add-subject-form">
          <p id="addsub"><span style={{ color: "white", fontSize: 28, }}>Add a Subject</span></p>
          <form onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
          >
            <div id="form">
            <input
              className="form-subject-title"
              type="text"
              onChange={this.handleChange}
              name="title"
              placeholder="Subject Title"
              value={this.state.createSubjectData.title}
            />
            <textarea
              type="text"
              className="form-subject-description"
              onChange={this.handleChange}
              name="description"
              placeholder="Subject Description"
              value={this.state.createSubjectData.description}
              />
              </div>
            <div>
              <input id="input-sub" type="submit" value="Add Subject" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
