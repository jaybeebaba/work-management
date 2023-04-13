import { useState } from 'react'
import Select from "react-select"
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from "react-router-dom"
// styles
import './Create.css'
import { useEffect } from 'react'
import { timeStamp } from '../../config/config'


const categories = [
  {value: "development", label: "development"},
  {value: "design", label: "design"},
  {value: "sales", label: "sales"},
  {value: "marketing", label: "marketing"}
]
export default function Create() {
  const {documents} = useCollection("users")
  const [selectUsers, setSelectUsers] = useState([])
  const [formError, setFormError] = useState("")

  const {user} = useAuthContext()

  const { addDocument, response } = useFirestore("projects")
  const history = useHistory()


  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])


  useEffect(() =>{
    if(documents){
      const options = documents.map(user =>{
        return { value: user, label: user.displayName.toLowerCase()}
      })

      setSelectUsers(options)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    if(!category){
      setFormError("Please select a category")
      return
    }
    if(assignedUsers.length < 1) {
      setFormError("Please assign the project to at least one user")
      return
    }

    const createdBy = {
      name: user.displayName,
      photoURL: user.photoURL,
      id: user.uid

    }

    const assignedUsersList = assignedUsers.map(u =>{
      return {
        name: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id

      }
    }) 

    const project = {
      createdBy,
      name,
      details,
      assignedUsersList,
      category: category.value,
      comments: [],
      dueDate: timeStamp.fromDate(new Date(dueDate))


    }

    await addDocument(project)
    if(!response.error){
      history.push("/")
    }
    
  }



  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea 
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details} 
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate}
          />
        </label>
        
        <label>
          <span>Project category:</span>
          <Select 
            options={categories}
            onChange={(option) => setCategory(option) }
          />
        </label>

        <label>
          <span>Assign to:</span>
          <Select 
            options={selectUsers}
            onChange={(option) => setAssignedUsers(option) }
            isMulti
          />
        </label>
        

        <button className="btn">Add Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}