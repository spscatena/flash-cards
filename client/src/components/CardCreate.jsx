import React from 'react'

export default function CardCreate(props) {

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleCardSubmit(props.subjectId);
      }}
      >
        <input
          type="text"
          onChange={props.handleChange}
          name="title"
          placeholder="Card Title"
          id="title"
          value={props.createCardData.title}
        />
        <input type="text"
          onChange={props.handleChange}
          name="question"
          placeholder="Card Question"
          id="question"
          value={props.createCardData.question}
        />
        <input type="text"
          onChange={props.handleChange}
          name="answer"
          placeholder="Card Answer"
          id="answer"
          value={props.createCardData.answer}
        />
        <input type="text"
          onChange={props.handleChange}
          name="answer_notes"
          placeholder="Answer Notes"
          id="answer_notes"
          value={props.createCardData.answer_notes}
        />
        <input type="submit" value="Add Card" />
      </form>
    </div>
  )
}
