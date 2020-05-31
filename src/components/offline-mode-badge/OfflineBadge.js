import React from "react";
import Modal from "../modal/Modal.js";

const badgeStyle = {
    backgroundColor: '#4A65FE',
    color: '#ffffff',
    position: 'fixed',
    left:'20px',
    bottom: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 200000
  };

  const iconStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '20px'
  }

  const modal = {
    'active' : false,
    'message' : "Sei nella versione offline di Bancomail: hai accesso a contenuti ridotti, ma puoi salvare alcune azioni che verranno eseguite non appena ritornerai in linea!",
    'btn' : 'btn-blue',
    'btnTxt' : 'OK',
    'icn' : 'svg-info',
    'id' : 'offlineBadgeWarning',
    'closeAction' : () => {
        document.querySelector('#offlineBadgeWarning').classList.remove('mask-on');
        if(("Notification" in window)) {
            Notification.requestPermission();
        }
    }
}

const OfflineBadge = (props) => {


 

 return (
    <React.Fragment>
        <div style={badgeStyle} className="offline-badge" onClick={ (e) => {
            e.preventDefault();
            document.querySelector('#offlineBadgeWarning').classList.add('mask-on');
        }}> 
        <i className="pe-7s-plane" style={iconStyle}></i>
        </div>
        <Modal status={modal} />
    </React.Fragment>
 );
}
export default OfflineBadge;