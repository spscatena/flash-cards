import React from 'react'

export default function SubjectCreate(props) {

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleSubjectSubmit();
      }}
      >
        <input type="text" onChange={props.handleChange} name="title" placeholder="Subject Title" id="title" value={props.subjectData.title} />
        <input type="text" onChange={props.handleChange} name="description" placeholder="Subject Description" id="description" value={props.subjectData.description} />
        <input type="submit" value="Add Subject" />
      </form>
    </div>
  )
}
