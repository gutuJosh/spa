import React from "react"

const Input = (props) => {

  const getValue = (event) => {
    return event.target.value;
  }

  return (
      <div className="cont mtop10">
        {props.label && (
        <label htmlFor={props.name}><p className="mbottom0">{props.label}:</p></label>
        )}
        <input 
         defaultValue={props.defaultValue}
         name={props.name}
         placeholder={props.placeholder}
         onChange={getValue}
         ref={props.inputRef}
         onFocus={ (event)=> {
           const el = event.target;
           if(el.classList.contains('input-error')){
               event.target.classList.remove('input-error');
               el.nextSibling.classList.add('hidden');
           }
         }}
         onBlur={ (event) => {
           const el = event.target;
           if(props.getValue){
              props.getValue(el);
           }
           if(props.required && el.value.trim() === ''){
              el.classList.add('input-error');
              el.nextSibling.classList.remove('hidden');
           }
         }}
         />
         {props.required &&(
         <span className="small text-red hidden">{props.required}</span>
         )}
      </div>
  )
}

export default Input;