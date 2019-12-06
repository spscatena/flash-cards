import React from 'react'

export default function EditSubject(props) {
  if (props.subjectData.id !== parseInt(props.subjectId)) {
    props.mountEditForm(props.subjectId)
  }

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleEditSubmit(props.subjectId);
      }}>
        <label htmlFor="title">Subject Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={props.subjectData.title}
          onChange={props.handleChange}
        />
        <br />
        <label htmlFor="description">Subject Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={props.subjectData.description}
          onChange={props.handleChange}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  )
}
