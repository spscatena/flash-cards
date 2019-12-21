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

  // handleCheckboxChange = async (ev) => {
  //   alert(ev.target.checked)

  // }

  render() {
    return (
      <div id="card-page">
        {/* <CardCreate
          subjectId={this.props.subjectId}
          handleCreate={this.handleCreate}
        /> */}
        <p><span style={{ fontFamily: 'Kalam', fontSize: "1.8vw", paddingLeft: ".2em", color: "white" }}>{this.state.subjectTitle}</span></p>

        <Link to='/subjects' style={{ color: "white", fontSize: "1.8vw" }}>Return to My Subjects</Link>
        <div id="card-container">
          {this.state.cards.map(card => (
            <div>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div id="card" key={card.id}>
                    <div className="flip-card-front">
                      <p id="cards-question"><b className="sub-titles" >Question: </b> <span className="handwriting">{card.question}</span></p>
                    </div>
                    <div className="flip-card-back">
                      <p id="card-ans"><b className="sub-titles" >Answer: </b><span className="handwriting">{card.answer}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="card-buttons">
                <button className="button-effect" onClick={() => this.handleDelete(this.props.subjectId, card.id)}>Delete</button>
                <button className="button-effect"><Link to={`/subjects/${this.props.subjectId}/cards/${card.id}/edit`}>Edit </Link></button>
                {/* <input type="checkbox" id={card.id} value="learned" checked={card.learned} onChange={this.handleCheckboxChange} />Learned */}
              </div>
            </div>
          ))}
          <CardCreate
            subjectId={this.props.subjectId}
            handleCreate={this.handleCreate}
          />

        </div>
      </div >
    )
  }
}


