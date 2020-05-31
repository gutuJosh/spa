import React from "react"
import {NavLink} from "react-router-dom";
const ListItem = (props) => {
  return (
    <div className="list-body">
        <p>
        <strong>
            <NavLink to={props.link} className="text-skyblue">
             {props.linkTxt}
            </NavLink>
        </strong>
        </p>
        <p>
        {props.text}
        </p>
    </div>
  )
}

export default ListItem;