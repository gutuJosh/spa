import React from "react"

const Switcher = (props) => {
  return (
    <React.Fragment>
     <input type="checkbox" className="sw" id={props.id} onChange={(event) => {
        if(event.target.checked){
           let copyPaste = props.handleSwitcher(true);
           if(copyPaste > 0){
             event.target.checked = false;
           }
        }
        else{
          props.handleSwitcher(false);
        }
     }}/>
     <label className={"switch "+props.type} htmlFor={props.id}></label>
    </React.Fragment>
  )
}

export default Switcher;