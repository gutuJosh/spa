import React from "react"

const List = (props) => {
  return (
    <div className={"list " + props.type}>
	    <div className="list-thumb long-shadow"><strong>{props.number}</strong></div>
		<div className="list-body">
		  {props.children}
		</div>
	</div>
  )
}

export default List;
