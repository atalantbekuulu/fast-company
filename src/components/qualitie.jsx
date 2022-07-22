import React from "react";


const Qualitie = (props) =>{ 
  return (<>
     <td>{props.value.map((qualitie)=> <span className={'badge m-1 bg-'+qualitie.color} key={qualitie._id}>{qualitie.name}</span>)}</td>
  </>)
}
export default Qualitie;