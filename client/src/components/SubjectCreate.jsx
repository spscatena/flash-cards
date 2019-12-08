import React from 'react'

export default function SubjectCreate(props) {

  return (
    <div id="add-subject-form">
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleSubjectSubmit();
      }}
      >
        <input
          type="text"
          onChange={props.handleChange}
          name="title"
          placeholder="Subject Title"
          id="title"
          value={props.createSubjectData.title}
        />
        <input type="text"
          onChange={props.handleChange}
          name="description"
          placeholder="Subject Description"
          id="description"
          value={props.createSubjectData.description}
        />
        <input type="submit" value="Add Subject" />
      </form>
    </div>
  )
}
