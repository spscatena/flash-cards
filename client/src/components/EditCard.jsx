import React, { Component } from 'react'
import { readAllCards, updateCard } from '../services/api-helper'

export default class EditCard extends Component {

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

  async componentDidMount() {
    const cards = await readAllCards(this.props.subjectId);
    const card = cards.find(el => el.id === parseInt(this.props.cardId));
    this.setState({
      data: card
    });
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

  handleSubmit = async () => {
    await updateCard(this.props.subjectId, this.props.cardId, this.state.data);
    this.props.history.push(`/subjects/${this.props.subjectId}/cards`);
  }

  render() {
    return (
      <div id="edit-card-form">
        <p><span style={{ color: "white", fontSize: 19, marginTop: "0" }}>Edit Your Card</span></p>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.handleSubmit();
        }}>
          {/* <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.data.title}
            onChange={this.handleChange}
          /> */}
          <label htmlFor="question"></label>
          <input
            type="text"
            name="question"
            id="question"
            value={this.state.data.question}
            onChange={this.handleChange}
            placeholder="Question"
          />
          <label htmlFor="answer"></label>
          <textarea
            type="text"
            name="answer"
            id="answer"
            value={this.state.data.answer}
            onChange={this.handleChange}
            placeholder="Answer"
          />
          {/* <label htmlFor="title">Answers Notes</label>
          <input
            type="text"
            name="answer_notes"
            id="answer_notes"
            value={this.state.data.answer_notes}
            onChange={this.handleChange}
          /> */}
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
