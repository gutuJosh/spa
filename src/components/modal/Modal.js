import React from 'react';
import "../../config/i18n.js";
import { withTranslation } from "react-i18next";

const Modal = (props) => {

    return(
        <React.Fragment>
         <div className={(props.status.active === true) ? "mask mask-on" : "mask"} id={props.status.id}>
            <div className="pop-up-panel">
              <div className="center">
                <i className={"svg svg-small "+props.status.icn}></i>
                <p>{props.t(props.status.message)}</p>
                <button className={"btn "+props.status.btn} onClick={(event) =>{
                    event.preventDefault();
                    if(props.status.closeAction){
                       props.status.closeAction();
                    }
                    if(props.handleModal){
                     props.handleModal('showModal', false);
                    }
                    
                }}>
                    {props.t(props.status.btnTxt)}
                </button>
              </div>
            </div>
         </div>
        </React.Fragment>
    )
}

export default withTranslation()(Modal);