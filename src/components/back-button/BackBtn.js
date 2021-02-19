import React from "react"
import { Translation } from 'react-i18next';

const BackBtn = (props) => {
  return (
  <Translation>{(t, { i18n }) =>  
    <a href="/" id="backBtn" onClick={ (event) => {
        event.preventDefault();
        window.history.back();
    }}>
      <i className="pe-7s-angle-left"></i> <span>{t('Torna indietro')}</span>
   </a> 
   }
  </Translation>
  )
}

export default BackBtn;