import React from "react";

const SearchStatus = (props) =>{
  
  const formatCountUsers = () =>{
    if(props.value === 4 || props.value ===3 || props.value === 2 )
    return (<span className={'badge bg-primary'}>{props.value} человека
     тусанут с тобой сегодня </span>)
    return (<span className={'badge bg-primary'}>{props.value} человек
      тусанет с тобой сегодня </span>)
  }
  let classes = 'badge '
  props.value ===0? classes+='bg-danger': classes += 'bg-primary'
  if(props.value === 0)
  return (<span className={classes}>никто с тобой не тусанет</span>)
  return <>
      {formatCountUsers()}
    </>
}

export default SearchStatus;