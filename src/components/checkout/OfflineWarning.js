import React from "react"
import { Translation } from 'react-i18next';
const Warning = (props) => {
  return (
    <Translation>{(t, { i18n }) =>  
    <p>
        {t('Sei in modalità offline! I dati verranno salvati e ricaricati non appena l\'applicazione tornerà online.')}
        {t('Una volta ripristinata la connessione, riceverai una notifica da parte nostra e avrai la possibiltà di concludere il tuo ordine, per questo ti consigliamo di consentire le notifiche di Bancomail.')} 
    </p>
     }
    </Translation>
  )
}

export default Warning;
