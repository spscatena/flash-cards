import React, { Component } from 'react'
import CardCreate from "./CardCreate"
import { Link } from 'react-router-dom';


export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <CardCreate
          handleChange={this.props.handleChange}
          handleCardSubmit={this.props.handleCardSubmit}
          createCardData={this.props.createCardData}
          subjectId={this.props.subjectId}
        />

        <Link to='/subjects'>Return to My Subjects</Link>

        <div id="card-container">
          {this.props.cards.map(card => (
            <div>
              <div id="card" key={card.id}>
                <p>Title: {card.title}</p>
                <p>Question: {card.question}</p>
                <p>Answer: {card.answer}</p>
                <p>Answer Notes {card.answer_notes}</p>
              </div>
              <div>
                <button onClick={() => this.props.handleCardDelete(card.id)}>Delete</button>
                <button><Link to={`/cards/${card.id}/edit`}>Edit </Link></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}


