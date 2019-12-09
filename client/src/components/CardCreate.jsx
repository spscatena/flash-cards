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
        <p><span style={{ color: "white", fontSize: 28, }}>Add a Card</span></p>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.handleSubmit(this.props.subjectId);
        }}
        >
          <input
            type="text"
            onChange={this.handleChange}
            name="title"
            placeholder="Card Title"
            id="title"
            value={this.state.data.title}
          />
          <input type="text"
            onChange={this.handleChange}
            name="question"
            placeholder="Card Question"
            id="question"
            value={this.state.data.question}
          />
          <input type="text"
            onChange={this.handleChange}
            name="answer"
            placeholder="Card Answer"
            id="answer"
            value={this.state.data.answer}
          />
          <input type="text"
            onChange={this.handleChange}
            name="answer_notes"
            placeholder="Answer Notes"
            id="answer_notes"
            value={this.state.data.answer_notes}
          />
          <input type="submit" value="Add Card" />
        </form>
      </div >
    )
  }
}