import React from "react";
import {NavLink} from "react-router-dom";
import BackBtn from "../components/back-button/BackBtn.js";

function About() {
  return(
       <React.Fragment>
        <section className="section screen-blue">
         <div className="wrapper">
          <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12">
             <h2 className="text-white">Qui a Bancomail gira tutto intorno all’email marketing.</h2>
             <p className="text-white">Fornire database per l'Email Marketing di qualità e con alti standard è quello che facciamo meglio e ciò che ci rende unici.</p>
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
           <h3 className="text-skyblue">Chi siamo:</h3>
            <p>Bancomail è l’unità di Neosoft nata nel 2001 per la vendita del più preciso e aggiornato database di aziende, in supporto alle attività di marketing B2B di altre aziende.
             Dal 2001 abbiamo aiutato le aziende - piccole medie imprese e grandi realtà fino al settore pubblico - a raggiungere i propri clienti fornendo liste targetizzate per l’email marketing.
            Fornire prodotti con standard qualitativi elevati è da sempre l’obiettivo che guida ogni nostra strategia, procedura o servizio. 
             Oltre ad avere più di 8.000 clienti, collaboriamo con più di 500 partner, aziende del settore che rivendono o integrano i nostri database all’interno dei propri servizi di email marketing.</p>
           </div>
          </div>
          <div className="flex-grid">
           <div className="flex-lg-6 flex-md-6 flex-sm-12">
            <h3 className="text-skyblue">Bancomail per le agenzie:</h3>
            <p>Bancomail offre strumenti di integrazione facili ed avanzati per consentirti di vendere facilmente il nostro Database ad un prezzo riservato. </p>
            <p>Puoi fornire database profilati ai tuoi clienti attraverso i tuoi canali tradizionali oppure collegare il tuo sito o strumenti come piattaforme d’invio al database Bancomail.</p>
            <p><i className="pe-7s-check"></i> Sconti fissi</p>
            <p><i className="pe-7s-check"></i> Promozioni dedicate</p>
            <p><i className="pe-7s-check"></i> Estensione Garanzie </p>
           </div>
           <div className="flex-lg-6 flex-md-6 flex-sm-12">
            <h3 className="text-skyblue">Bancomail per il Non Profit:</h3>
            <p>Il programma Non Profit di Bancomail sostiene tutte le Associazioni che vogliono sviluppare attraverso l’Email Marketing un dialogo con enti e aziende.</p>
            <p>Potrai ricevere supporto dai clienti Bancomail che sceglieranno donare alla tua Organizzazione il 10% di ogni loro acquisto. Inoltre potrai beneficiare sempre del 40% di sconto su tutti i database Bancomail.</p>
            <p><i className="pe-7s-check"></i> Sconto fisso 40% su tutte le Liste</p>
            <p><i className="pe-7s-check"></i> Raccolta fondi attraverso gli acquisti su Bancomai</p>
            <p><i className="pe-7s-check"></i> Sostegno con DEM dedicate</p>
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
             <p>Se hai bisogno di informazioni o se vuoi proporci una collaborazione:</p>
             <NavLink to="/contatti" title="Preventivi" className="btn btn-yellow">Contattaci</NavLink>
           </div>
           <div className="flex-lg-12 mtop80">&nbsp;</div>
         </div>
         </div>
       </section>
       </React.Fragment>
  )
}

export default About;