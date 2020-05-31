import React , { useState } from "react"


const RadioBtn = (props) => {
  const [defaultChecked, setchecked] = useState(props.isChecked);
  const handleChange = (e) => {
     if(props.handleChange && e.target.checked === true){
        props.handleChange(e.target.value);
     }
     setchecked(e.target.checked);
  }

  return (
    <React.Fragment>
      <input 
       type="radio" 
       name={props.name} 
       id={props.id} 
       className="custom-radio" 
       value={props.value} 
       ref={props.inputRef} 
       checked={defaultChecked} 
       onChange={handleChange}
       /> 
      <label htmlFor={props.id} className="grey transp">{props.label}</label>
    </React.Fragment>
  )
}

export default RadioBtn;