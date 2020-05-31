import React from "react"

const TextArea = (props) => {

  return (
      <div className="cont mtop10">
        <label htmlFor={props.name}><p className="mbottom0">{props.label}:</p></label>
        <textarea 
        defaultValue={props.defaultValue}
        name={props.name}
        placeholder={props.placeholder}
        ref={props.inputRef}
        maxLength={props.maxlength}
        onBlur={(e) => {
          if(props.getValue){
           props.getValue(e.target.value);
          }
        }}
        style={props.style}></textarea>
        {props.required &&(
         <span className="small text-red hidden">{props.required}</span>
        )}
      </div>
  )
}

export default TextArea;