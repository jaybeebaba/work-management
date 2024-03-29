import {useState} from 'react'
import { timeStamp } from '../../config/config'
import {useAuthContext} from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../../components/Avatar'
import moment from "moment"

const ProjectComments = ({project}) => {
    const [newComment, setNewComment] =useState("")
    const { user } = useAuthContext()

    const { updateDocument, response } = useFirestore("projects")

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: timeStamp.fromDate(new Date()),
            content: newComment,
            id: Math.random()
        }

        updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })

        if(!response.error){
            setNewComment("")
        }
    }
  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 && project.comments.map(comment => (
          <li key={comment.id}>
            <div className="comment-author">
              <Avatar src={comment.photoURL} />
              <p>{comment.displayName.toLowerCase()}</p>
            </div>
            <div className="comment-date">
              {moment(comment.createdAt.toDate(), "YYYYMMDD").fromNow()}
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  )
}

export default ProjectComments