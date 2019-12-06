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
          name="title"
          placeholder="Card Title"
          id="title"
          value={props.createCardData.title}
        />
        <input type="text"
          onChange={props.handleChange}
          name="description"
          placeholder="Card Description"
          id="description"
          value={props.createCardData.description}
        />
        <input type="submit" value="Add Card" />
      </form>
    </div>
  )
}
