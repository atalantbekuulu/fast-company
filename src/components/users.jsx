import React,{useState} from "react";
import api from "../api";
import User from './user';
import Qualitie from "./qualitie";
import SearchStatus from "./searchStatus";
import Bookmark from "./bookmark";

const Users =()=>{
  const [users,setUser] = useState(api.users.fetchAll()) 
  const handleDelete = (userId) =>{
      setUser(prevState=> prevState.filter((user)=> user._id !== userId))
    }
    const renderInfomation = () =>{
      return(
       users.map((user)=>{
         return(
         <tr key={user._id}>
          <User value = {user.name}/>
          <Qualitie value = {user.qualities}/>
        {<td key={user.profession._id}>{user.profession.name}</td>}
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td><Bookmark value = {user}/></td>

        <td><button onClick={()=> handleDelete(user._id)} className="btn btn-danger m-1">delete</button></td>
      </tr>)
       })
      )
    }
    if(users.length !== 0){
      return (<>
      <SearchStatus value = {users.length}/>
    <table className="table">
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col">Избранное</th>
      </tr>
    </thead>
    <tbody>
        {renderInfomation()}
    </tbody>
  </table>

      </>)
      }
  return( <> 
    <SearchStatus value = {users.length}/>
      
    </>)
}


export default Users  