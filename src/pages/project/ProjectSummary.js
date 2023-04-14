import React from 'react'
import Avatar from '../../components/Avatar'

const ProjectSummary = ({ project }) => {
    return (
        <div>
            <div className='project-summary'>
                <h2 className='page-tile'>{project.name}</h2>
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
        </div>
    )
}

export default ProjectSummary