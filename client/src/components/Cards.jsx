import React, { Component } from 'react'
import CardCreate from "./CardCreate"
import { Link } from 'react-router-dom';
import { createCard, destroyCard, getSubject } from '../services/api-helper'


export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      subjectTitle: ""
    }
  }

  async componentDidMount() {
    const subject = await getSubject(this.props.subjectId)
    this.setState({
      cards: subject.cards,
      subjectTitle: subject.title
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

  handleCheckboxChange = async (ev) => {
    alert(ev.target.checked)

  }

  render() {
    return (
      <div>
        <CardCreate
          subjectId={this.props.subjectId}
          handleCreate={this.handleCreate}
        />
        <p><span style={{ fontFamily: 'Kalam', fontSize: "2em", paddingLeft: ".2em" }}>{this.state.subjectTitle}</span></p>
        <Link to='/subjects'>Return to My Subjects</Link>

        <div id="card-container">
          {this.state.cards.map(card => (
            <div>
              <div id="card" key={card.id}>
                <p>Title: <span className="handwriting">{card.title}</span></p>
                <p>Question: <span className="handwriting">{card.question}</span></p>
                <p>Answer: <span className="handwriting">{card.answer}</span></p>
                <p>Answer Notes: <span className="handwriting">{card.answer_notes}</span></p>
              </div>
              <div>
                <button onClick={() => this.handleDelete(this.props.subjectId, card.id)}>Delete</button>
                <button><Link to={`/subjects/${this.props.subjectId}/cards/${card.id}/edit`}>Edit </Link></button>
                {/* <input type="checkbox" id={card.id} value="learned" checked={card.learned} onChange={this.handleCheckboxChange} />Learned */}

              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}


