import React from "react"

const Checkbox = (props) => {
  return (
    <React.Fragment>
    <input 
     type="checkbox" 
     name={props.name} 
     id={props.id} 
     className="custom-checkbox check" 
     value={props.value} ref={props.inputRef}
     onChange={(e) => {
         if(e.target.checked){
             e.target.nextSibling.classList.remove('input-error');
         }
     }}
     /> 
    <label htmlFor={props.id} className="grey transp">{props.children}</label>
  </React.Fragment>
  )
}

export default Checkbox;