import React, { Component } from 'react'
import CardCreate from "./CardCreate"
import { Link } from 'react-router-dom';
import { createCard, readAllCards, destroyCard } from '../services/api-helper'


export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: []
    }
  }

  async componentDidMount() {
    const cards = await readAllCards(this.props.subjectId)
    this.setState({
      cards
    })
  }

  handleCreate = async (subjectId, data) => {
    const card = await createCard(subjectId, data)
    this.setState(prevState => ({
      cards: [...prevState.cards, card]
    }));
  }

  handleDelete = async (subjectId, cardId) => {
    await destroyCard(subjectId, cardId);
    this.setState(prevState => ({
      cards: prevState.cards.filter(card => card.id !== parseInt(cardId))
    }))
  }

  render() {
    return (
      <div>
        <CardCreate
          subjectId={this.props.subjectId}
          handleCreate={this.handleCreate}
        />

        <Link to='/subjects'>Return to My Subjects</Link>

        <div id="card-container">
          {this.state.cards.map(card => (
            <div>
              <div id="card" key={card.id}>
                <p>Title: {card.title}</p>
                <p>Question: {card.question}</p>
                <p>Answer: {card.answer}</p>
                <p>Answer Notes {card.answer_notes}</p>
              </div>
              <div>
                <button onClick={() => this.handleDelete(this.props.subjectId, card.id)}>Delete</button>
                <button><Link to={`/subjects/${this.props.subjectId}/cards/${card.id}/edit`}>Edit </Link></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}


