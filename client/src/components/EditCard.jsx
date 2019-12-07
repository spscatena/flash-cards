import React from 'react'

export default function EditCard(props) {
  if (props.editCardData.id !== parseInt(props.cardId)) {
    props.mountCardEditForm(props.cardId)
  }

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleCardEditSubmit(props.cardId);
      }}>
        <label htmlFor="question">Question Title</label>
        <input
          type="text"
          name="question"
          id="question"
          value={props.editCardData.title}
          onChange={props.handleChange}
        />
        <br />
        <label htmlFor="answer">Answer Description</label>
        <input
          type="text"
          name="answer"
          id="answer"
          value={props.editCardData.description}
          onChange={props.handleChange}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  )
}
