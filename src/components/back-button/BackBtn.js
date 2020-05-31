import React from "react"

const BackBtn = (props) => {
  return (
    <a href="/" id="backBtn" onClick={ (event) => {
        event.preventDefault();
        window.history.back();
    }}>
      <i className="pe-7s-angle-left"></i> <span>Torna indietro</span>
   </a>
  )
}

export default BackBtn;