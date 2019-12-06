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
        />

        <div id="card-container">
          {this.props.cards.map(card => (

            <div id="card" key={card.id}>
              <p>Card Title: {card.question}</p>
              <p>Description: {card.answer}</p>
              <button onClick={() => this.props.handleCardDelete(card.id)}>Delete</button>
              <Link to={`/cards/${card.id}/edit`}>Edit </Link>
            </div>))}
        </div>
      </div>
    )
  }
}


