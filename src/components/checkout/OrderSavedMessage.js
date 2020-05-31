import React, { useState } from "react"

const OrderSavedMessage = (props) => {

  const [permission, setPermissionStatus] = useState(false);

  return (
    <div className="center">
        <i className="svg svg-small svg-ok"></i>
        <p>
            I dati sono stati salvati con successo! Non appena l'applicazione tornerà online, riceverai una email di notifica.
            Ricordati di attivare le notifiche per essere informato subito sullo stato della tua connessione.
        </p>
        <p>
          <a href="/"
          onClick = { (event) => {
            event.preventDefault();
            if (("Notification" in window)) {
              if(Notification.permission === "granted"){
                setPermissionStatus('Perfetto! Le notifiche da Bancomail sono attive!');
              }
              else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                  if (permission === "granted") {
                    setPermissionStatus('Notifiche attive!');
                  }
                  else{
                    setPermissionStatus('Notifiche bloccate!');
                  }
                });
              }
              else{
                setPermissionStatus('Notifiche bloccate!');
              }
            }
          }}
          >
            {permission === false ?
            <span>Attiva le notifiche</span>
            :
            <span>{permission }</span>
          }
            </a>
        </p>
    </div>
  )
}

export default OrderSavedMessage;
