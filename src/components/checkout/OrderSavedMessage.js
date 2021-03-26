import React, { useState } from "react"
import "../../config/i18n.js";
import { withTranslation } from "react-i18next";

const OrderSavedMessage = (props) => {

  const [permission, setPermissionStatus] = useState(false);

  return (
   
      <div className="center">
        <i className="svg svg-small svg-ok"></i>
        <p>
            {props.t('checkout:I dati sono stati salvati con successo! Non appena l\'applicazione tornerà online, riceverai una email di notifica.')}&nbsp;
             {props.t('checkout:Ricordati di attivare le notifiche per essere informato subito sullo stato della tua connessione.')}
        </p>
        <p>
          <a href="/"
          onClick = { (event) => {
            event.preventDefault();
            if (("Notification" in window)) {
              if(Notification.permission === "granted"){
                setPermissionStatus(props.t('checkout:Perfetto! Le notifiche da Bancomail sono attive!'));
              }
              else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                  if (permission === "granted") {
                    setPermissionStatus(props.t('checkout:Notifiche attive!'));
                  }
                  else{
                    setPermissionStatus(props.t('checkout:Notifiche bloccate!'));
                  }
                });
              }
              else{
                setPermissionStatus(props.t('checkout:Notifiche bloccate!'));
              }
            }
          }}
          >
            {permission === false ?
            <span>{props.t('checkout:Attiva le notifiche')}</span>
            :
            <span>{permission }</span>
          }
            </a>
        </p>
    </div>
  )
}

export default withTranslation()(OrderSavedMessage);
