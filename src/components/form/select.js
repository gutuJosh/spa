import React, { useState } from 'react';
import "../../config/i18n.js";
import { withTranslation } from "react-i18next";

const Select = (props) => {

  const [inputError, setError] = useState(false);
  const [defaultSelect, setSelect] = useState(props.defaultValue);


  const handleChange = (e) => {
    const element = e.target;
     setSelect(element.value);
     if(props.handleChange){
      props.handleChange(element.value);
     }
     if(props.required && element.value !== ''){
       element.classList.remove('input-error');
       element.parentNode.nextSibling.classList.add('hidden')    
     }
  }

  
  

  return (
      <div className="cont mtop10">
        <label htmlFor={props.name}><p className="mbottom0">{props.label}:</p></label>
        <div className="custom-select">
        <select name={props.name} className="select"
         value={defaultSelect}
         onFocus={ (event)=> {
          const el = event.target;
          if(el.classList.contains('input-error')){
              event.target.classList.remove('input-error');
              setError(false);
          }
        }}
        onBlur={ (event) => {
          const el = event.target;
          if(props.required && el.value.trim() === ''){
             el.classList.add('input-error');
             setError(true);
          }
        }}
        onChange = {handleChange}
        ref={props.inputRef}
        >
         <option value="">--</option>
         <option value="IT">{props.t(`countries:Italia`)}</option>
         {props.values.map((item, i) => (
            <option key={i} value={item.value}>{props.t(`countries:${item.title}`)}</option>
          ))}
         </select>
        </div>
        {props.required &&(
         <span className={ (inputError === false) ? "small text-red hidden" : "small text-red"}>{props.required}</span>
        )}
      </div>
  )
}

export default withTranslation()(Select);