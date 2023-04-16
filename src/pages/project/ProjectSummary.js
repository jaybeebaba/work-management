import React from 'react'
import Avatar from '../../components/Avatar'
import {useFirestore} from "../../hooks/useFirestore"
import { useAuthContext } from '../../hooks/useAuthContext'
import {useHistory} from "react-router-dom"

const ProjectSummary = ({ project }) => {

    console.log("project", project)
    const {deleteDocument} = useFirestore("projects")
    const { user } = useAuthContext()
    const history = useHistory()

    const handleClick = () =>{
        deleteDocument(project.id)
        history.push("/")
    }
    return (
        <div>
            <div className='project-summary'>
                <h2 className='page-tile'>{project.name}</h2>
                <p>By: {project.createdBy.name.toLowerCase()}</p>
                <p className='due-date'>Project due by {project.dueDate.toDate().toDateString()}</p>

                <p className='details'>{project.details}</p>
                <h4>The project is assigned to:</h4>
                <div className='assigned-users'>
                {project.assignedUsersList.map(user =>{
                    return (
                        <div key={user.photoURL}>
                            <Avatar src={user.photoURL}/>
                        </div>
                    )
                })}
                </div>

            </div>

            { user.uid === project.createdBy.id && <button className='btn' onClick={handleClick}>Mark as complete</button> }
        </div>
    )
}

export default ProjectSummary