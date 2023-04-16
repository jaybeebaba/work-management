import "./Dashboard.css"
import React, { useEffect, useState } from 'react'
import { useCollection } from "../../hooks/useCollection"
import ProjectList from "../../components/ProjectList"
import ProjectFilter from "./ProjectFilter"
import { useAuthContext } from "../../hooks/useAuthContext"

const Dashboard = () => {
  const { documents, error } = useCollection("projects")
  const [currentFilter, setCurrentFilter] = useState("all")
  const { user } = useAuthContext()

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  console.log(documents)

  const projects = documents ? documents.filter((doc) =>{
    if(currentFilter === "all"){
      return doc
    }else if(currentFilter === "mine"){
      const assignedUserIds = doc.assignedUsersList.map(user => user.id);
      return assignedUserIds.includes(user.uid);
    }else{
      return doc.category === currentFilter
    }
  }) : null


  

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {documents && <ProjectList projects={projects} />}
    </div>
  )
}

export default Dashboard