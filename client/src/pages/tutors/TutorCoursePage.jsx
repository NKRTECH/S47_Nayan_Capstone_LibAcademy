import React from 'react'
import { Link } from 'react-router-dom'

function TutorCoursePage() {
  return (
    <>
    <Link to={"/courses/create"}><button>Create Course</button></Link>
    </>
  )
}

export default TutorCoursePage