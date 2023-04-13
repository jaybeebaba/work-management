import "./Dashboard.css"
import React from 'react'
import { useCollection } from "../../hooks/useCollection"
import ProjectList from "../../components/ProjectList"

const Dashboard = () => {
  const {documents, error} = useCollection("projects")

  console.log(documents, error)
  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectList projects={documents}/>}
    </div>
  )
}

export default Dashboard