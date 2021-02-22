import React, { useState } from "react"
import { Translation } from 'react-i18next';

const OrderSavedMessage = (props) => {

  const [permission, setPermissionStatus] = useState(false);

  return (
    <Translation>{(t, { i18n }) => 
      <div className="center">
        <i className="svg svg-small svg-ok"></i>
        <p>
            {t('I dati sono stati salvati con successo! Non appena l\'applicazione tornerà online, riceverai una email di notifica.')}
             {t('Ricordati di attivare le notifiche per essere informato subito sullo stato della tua connessione.')}
        </p>
        <p>
          <a href="/"
          onClick = { (event) => {
            event.preventDefault();
            if (("Notification" in window)) {
              if(Notification.permission === "granted"){
                setPermissionStatus(t('Perfetto! Le notifiche da Bancomail sono attive!'));
              }
              else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                  if (permission === "granted") {
                    setPermissionStatus(t('Notifiche attive!'));
                  }
                  else{
                    setPermissionStatus(t('Notifiche bloccate!'));
                  }
                });
              }
              else{
                setPermissionStatus(t('Notifiche bloccate!'));
              }
            }
          }}
          >
            {permission === false ?
            <span>{t('Attiva le notifiche')}</span>
            :
            <span>{permission }</span>
          }
            </a>
        </p>
    </div>
  }
  </Translation>
  )
}

export default OrderSavedMessage;
