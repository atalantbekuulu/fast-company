import React,{useState} from "react";
import api from "../api";
import 'bootstrap/dist/css/bootstrap.css'

const Users =()=>{
  const [users,setUser] = useState(api.users.fetchAll()) 
  const handleDelete = (userId) =>{
    console.log(userId)
    setUser(prevState=> prevState.filter((user)=> user._id !== userId))
  }
  const renderInfomation = () =>{
    return(
     users.map((user)=>{
       return(<tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.qualities.map((qualitie)=> <span className={'badge m-1 bg-'+qualitie.color} key={qualitie._id}>{qualitie.name}</span>)}</td>
      {<td key={user.profession._id}>{user.profession.name}</td>}
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td><button onClick={()=>handleDelete(user._id)} className="btn btn-danger m-1">delete</button></td>
    </tr>)
     })
    )
  }
  const formatCountUsers = () =>{
    if(users.length === 4 || users.length ===3 || users.length === 2 )
    return (<span className={'badge bg-primary'}>{users.length} человека
     тусанут с тобой сегодня </span>)
     return (<span className={'badge bg-primary'}>{users.length} человек
      тусанет с тобой сегодня </span>)
  }
    
  let classes = 'badge '
  users.length ===0? classes+='bg-danger': classes += 'bg-primary'
  if(users.length === 0)
  return (<span className={classes}>никто с тобой не тусанет</span>)  
  return (
    <>
    {formatCountUsers()}
      <table className="table">
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
      </tr>
    </thead>
    <tbody>
      {renderInfomation()}
    </tbody>
  </table>
  </>
  )
}
export default Users