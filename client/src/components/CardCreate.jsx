import React, { Component } from 'react'

export default class CardCreate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {
        title: "",
        question: "",
        answer: "",
        answer_notes: "",
        learned: false
      }
    }
  }

  handleChange = async (ev) => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }))
  }

  handleSubmit = async (subjectId) => {
    this.props.handleCreate(subjectId, this.state.data)
    this.setState(prevState => ({
      data: {
        title: "",
        question: "",
        answer: "",
        answer_notes: "",
        learned: false
      }
    }));
  }

  render() {
    return (
      <div id="add-card-form">
        <p><span style={{ color: "white", fontSize: 19, marginTop: "0" }}>Add a Card</span></p>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.handleSubmit(this.props.subjectId);
        }}
        >
          <div id="card-form">
            <input type="text"
              onChange={this.handleChange}
              name="question"
              placeholder="Card Question"
              id="question"
              value={this.state.data.question}
            />
            <textarea type="text"
              onChange={this.handleChange}
              name="answer"
              placeholder="Card Answer"
              id="answer"
              value={this.state.data.answer}
            />
          </div>
          <div id="create-card-buttons">
            <input id="submit-card-form" type="submit" value="Add Card" />
          </div>
        </form>
      </div >
    )
  }
}