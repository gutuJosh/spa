import React, { useState } from 'react';
import "../../config/i18n.js";
import { withTranslation } from "react-i18next";

const InputField = (props) => {

    const [switcher, setSwitcher] = useState(false);
    const [selectedValue, setValue] = useState(props.value);
    const [displayValue, setDisplayValue] = useState('');

    const changeValue = (event) =>{
      event.preventDefault();
      setValue(event.target.value);
      setDisplayValue('');
      props.handleInput(props.name, event.target.value.trim());
    }

      return(
        <React.Fragment>
          <div className="flex-item auto">
           <span className="selector-control pointer">
             <i className={switcher === false ? "pe-7s-angle-down" : "pe-7s-angle-up"}></i>
           </span>
           <input type="hidden" id={props.name} value={displayValue}/>
           <input className="custom-input" 
                  defaultValue={props.defaultValue} 
                  value={selectedValue}
                  name={props.name} 
                  id={props.id} 
                  placeholder={props.placeholder} 
                  type="text" 
                  onFocus={(event) => {
                    event.target.parentNode.classList.add('focus');
                    setSwitcher(true);
                  }}       
                  onChange={changeValue}
                  onBlur={(event) => {
                      const parent = event.target.parentNode;
                      setTimeout( () => {
                        parent.classList.remove('focus');
                        setSwitcher(false);
                     }, 300);
                    }}
                  ref={props.inputRef}
                  autoComplete="off" />  
            <div className={(switcher) ? "custom-selector-holder custom-scroll-bar" : "custom-selector-holder hidden"}>
             <ul className="custom-selector">
              {props.suggesstions && (
               props.suggesstions.map((item, i) => {
                
               return (
                <li className="suggesstion-item" key={i} onClick={ (event) => {
                  event.preventDefault();
                  let value = props.flags ? props.t(`countries:${item}`) : props.t(`macro:${item}`);
                  setValue(value);
                  setDisplayValue(item);
                  props.handleSelect(props.name, item);
                 }}>
	               {props.flags ?
                 <React.Fragment>
                  <span className={`flag-${props.flags[item]}`}></span>
                  {props.t(`countries:${item}`)}
                 </React.Fragment>
                 :
                 <React.Fragment>
                 {props.t(`macro:${item}`)}
                 </React.Fragment>
                 }
                
                </li> 
                )
               }) 
              )}  
               <li data-value="all" onClick={ (event) => {
                  event.preventDefault();
                  setValue(props.label);
                  props.reset(props.name);
                 }}>
                {props.t(props.label)}
              </li>   
             </ul>
            </div> 
          </div>
        </React.Fragment>
      );
     
  
  };

  export default withTranslation()(InputField);
  