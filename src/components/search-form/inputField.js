import React, { useState } from 'react';


const InputField = (props) => {

    const [switcher, setSwitcher] = useState(false);
    const [selectedValue, setValue] = useState(props.value);

    const changeValue = (event) =>{
      event.preventDefault();
      setValue(event.target.value);
      props.handleInput(props.name, event.target.value.trim());
    }

      return(
        <React.Fragment>
          <div className="flex-item auto">
           <span className="selector-control pointer">
             <i className={switcher === false ? "pe-7s-angle-down" : "pe-7s-angle-up"}></i>
           </span>
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
                  setValue(item);
                  props.handleSelect(props.name, item);
                 }}>
	               
                 {item}
                
                </li> 
                )
               }) 
              )}  
               <li data-value="all" onClick={ (event) => {
                  event.preventDefault();
                  setValue(props.label);
                  props.reset(props.name);
                 }}>
                {props.label}
              </li>   
             </ul>
            </div> 
          </div>
        </React.Fragment>
      );
     
  
  };

  export default InputField;
  