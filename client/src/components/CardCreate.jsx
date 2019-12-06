import React from 'react'

export default function CardCreate(props) {

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleCardSubmit();
      }}
      >
        <input
          type="text"
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
        <input type="submit" value="Add Card" />
      </form>
    </div>
  )
}
