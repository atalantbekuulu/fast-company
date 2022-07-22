import React,{useState} from "react";


const Bookmark = (props) =>{
    let [bookmarkStatus,SetStatus] = useState(props.value.bookmark)
  const handleSelected = (id) =>{
   bookmarkStatus === true ? bookmarkStatus = false: bookmarkStatus = true
   SetStatus(bookmarkStatus)
  }
  if (bookmarkStatus === false){
return (<i onClick={()=>handleSelected(props.value._id)} className="bi bi-bookmark"></i>)
  }
  else {
  return (<i onClick ={()=>handleSelected(props.value._id)} className="bi bi-bookmark-heart-fill"></i>)
  }
}

export default Bookmark