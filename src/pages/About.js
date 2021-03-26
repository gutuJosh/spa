import React from "react";
import {NavLink} from "react-router-dom";
import BackBtn from "../components/back-button/BackBtn.js";
import "../config/i18n.js";
import { withTranslation } from "react-i18next";

const About = (props) => {
  return(
       <React.Fragment>
        <section className="section screen-blue">
         <div className="wrapper">
          <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12">
             <h2 className="text-white"> {props.t('about:Qui a Bancomail gira tutto intorno all’email marketing.')}</h2>
             <p className="text-white"> {props.t('about:Fornire database per l\'Email Marketing di qualità e con alti standard è quello che facciamo meglio e ciò che ci rende unici.')}</p>
           </div>
          </div>
          <div className="flex-grid page-header mtop20">
           <BackBtn/>
          </div>
        </div>
       </section>
       <section>
        <div className="wrapper">
         <div className="page-body">
          <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12">
           <h3 className="text-skyblue"> {props.t('about:Chi siamo')}:</h3>
            <p>
            {props.t('about:Bancomail è l’unità di Neosoft nata nel 2001 per la vendita del più preciso e aggiornato database di aziende, in supporto alle attività di marketing B2B di altre aziende.')}&nbsp;
            {props.t('about:Dal 2001 abbiamo aiutato le aziende - piccole medie imprese e grandi realtà fino al settore pubblico - a raggiungere i propri clienti fornendo liste targetizzate per l’email marketing.')}&nbsp;
             {props.t('about:Fornire prodotti con standard qualitativi elevati è da sempre l’obiettivo che guida ogni nostra strategia, procedura o servizio.')}&nbsp;
             {props.t('about:Oltre ad avere più di')} 8.000  {props.t('about:clienti, collaboriamo con più di 500 partner, aziende del settore che rivendono o integrano i nostri database all’interno dei propri servizi di email marketing.')}
            </p>
           </div>
          </div>
          <div className="flex-grid">
           <div className="flex-lg-6 flex-md-6 flex-sm-12">
            <h3 className="text-skyblue">{props.t('about:Bancomail per le agenzie')}:</h3>
            <p>{props.t('about:Bancomail offre strumenti di integrazione facili ed avanzati per consentirti di vendere facilmente il nostro Database ad un prezzo riservato.')}</p>
            <p>{props.t('about:Puoi fornire database profilati ai tuoi clienti attraverso i tuoi canali tradizionali oppure collegare il tuo sito o strumenti come piattaforme d’invio al database Bancomail.')}</p>
            <p><i className="pe-7s-check"></i> {props.t('about:Sconti fissi')}</p>
            <p><i className="pe-7s-check"></i> {props.t('about:Promozioni dedicate')}</p>
            <p><i className="pe-7s-check"></i> {props.t('about:Estensione Garanzie')}</p>
           </div>
           <div className="flex-lg-6 flex-md-6 flex-sm-12">
            <h3 className="text-skyblue">{props.t('about:Bancomail per il Non Profit')}:</h3>
            <p>{props.t('about:Il programma Non Profit di Bancomail sostiene tutte le Associazioni che vogliono sviluppare attraverso l’Email Marketing un dialogo con enti e aziende.')}</p>
            <p>
              {props.t('about:Potrai ricevere supporto dai clienti Bancomail che sceglieranno donare alla tua Organizzazione il 10% di ogni loro acquisto.')}&nbsp;
              {props.t('about:Inoltre potrai beneficiare sempre del 40% di sconto su tutti i database Bancomail.')}
            </p>
            <p><i className="pe-7s-check"></i> {props.t('about:Sconto fisso 40% su tutte le Liste')}</p>
            <p><i className="pe-7s-check"></i> {props.t('about:Raccolta fondi attraverso gli acquisti su Bancomai')}</p>
            <p><i className="pe-7s-check"></i> {props.t('about:Sostegno con DEM dedicate')}</p>
          </div>
         </div>
        </div>
        <div className="page-footer">
           &nbsp;
        </div>
        </div>
       </section>
       <section>
        <div className="wrapper">
         <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12 center">
             <p>{props.t('Se hai bisogno di informazioni o se vuoi proporci una collaborazione:')}</p>
             <NavLink to="/contatti" title="Preventivi" className="btn btn-yellow">{props.t('Contattaci')}</NavLink>
           </div>
           <div className="flex-lg-12 mtop80">&nbsp;</div>
         </div>
         </div>
       </section>
       </React.Fragment>
  )
}

export default withTranslation()(About);