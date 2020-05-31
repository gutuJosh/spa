import React from "react"

const Thumb = (props) => {
  return (
    <React.Fragment>
	    <div className="ul-thumb"><span className={props.color}>{props.number}</span></div>
		<div className="ul-body">
		  {props.children}
		</div>
    </React.Fragment>
  )
}

export default Thumb;
