import React from "react";
import {NavLink} from "react-router-dom";
import BackBtn from "../components/back-button/BackBtn.js";
import List from "../components/ordered-list/List.js";
import Thumb from "../components/ordered-list/Thumb.js";
import "../config/i18n.js";
import { withTranslation } from "react-i18next";

const Gdpr = (props) => {
  return(
       <React.Fragment>
        <section className="section screen-blue">
         <div className="wrapper">
          <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12">
             <h2 className="text-white">{props.t('Conformità GDPR di Bancomail')}</h2>
             <p className="text-white">{props.t('In Bancomail, il rispetto delle normative è fondamentale, per questo da sempre ci impegniamo a conoscere e rispettare la normativa vigente ed applicabile per la tutela dei contatti nel nostro Database')}</p>
           </div>
          </div>
          <div className="flex-grid page-header mtop20">
           <BackBtn/>
          </div>
        </div>
       </section>
       <section>
        <div className="wrapper">
         <div className="page-body flex-grid">
          <div className="flex-lg-12 flex-md-12 flex-sm-12">
             
            <h3>{props.t('Il Database Bancomail')}</h3>
            <p>{props.t('Al suo interno esistono 2 casi/tipologie di dati')}:</p>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="1">  
                <h3>{props.t('Il caso preciso')}:</h3>
                <h4>{props.t('Full Legal Person')}</h4>
                <p>{props.t('Rappresenta il 75% del totale dei record nel nostro Database: aziende, associazioni ed enti con varie forme di composizione (Spa, Srl, Snc, Sas etc.) e dati di contatto generici (es.: info@) o di reparto (es.: marketing@, sales@, etc.).')}</p>
                <p>{props.t('Questi soggetti sono chiaramente esclusi dalla tutela del Regolamento in base al Considerando 14 della stessa che riportiamo integralmente')}:</p>
                <div className="quote full">
                 <p className="text-skyblue">
                 {props.t('The protection afforded by this Regulation should apply to natural persons, whatever their nationality or place of residence, in relation to the processing of their personal data.')} 
					{props.t('This Regulation')} <strong className="underlined">{props.t('does not cover')}</strong> {props.t('the processing of personal data which concerns')} <strong className="underlined">{props.t('legal persons')}</strong> {props.t('and in particular undertakings established as legal persons,')}' <strong className="underlined">{props.t('including the name and the form of the legal person and the contact details of the legal person')}</strong>.
				 </p>
                </div>
                <p className="mtop10">{props.t('Tuttavia, per deontologia e maggior garanzia, le nostre procedure - sebbene questa esclusione dalla tutela dal trattamento fosse già compresa nella revisione della 196/03 (decreto Monti “Salva Italia”) - assicuriamo da sempre anche a questi Soggetti i Diritti Universali (informazione, verifica, aggiornamento e rimozione). Continueremo a farlo anche con il GDPR.')}</p>
                <p>{props.t('Nella stessa ottica virtuosa e strategica, consigliamo ai nostri clienti di usare lo stesso tipo di approccio, assicurando ai destinatari informazione e diritti.')}</p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="2"> 
              <h3>{props.t('Il caso misto')}:</h3>
              <h4>{props.t('Legal Person with natural person contact data')}</h4>
              <p>
              {props.t('È un caso molto meno frequente nel nostro Database, ma esistente.')} {props.t('Dati di contatto che incidentalmente identificano la “persona fisica” possono presentarsi secondo due pattern')}: 
              <br/>
              a) mario.rossi@azienda.it 
              <br/>
              b) mario.rossi@gmail.com 
              </p>
              <p>{props.t('Mentre nel primo caso, la persona è pur chiaramente identificata dall’attività aziendale cui è relazionata; il secondo caso raccoglie per lo più Liberi Professionisti in forma singola che utilizzano, pur a scopo Business, dati di contatto che identificano chiaramente la “persona fisica” anche al di là della sua veste professionale. Nota: non si contemplano in questa casistica, gli Studi Associati che rientrano di fatto nelle Legal Person.')}</p>
              <p>{props.t('In entrambi i casi le argomentazioni sono due, ugualmente pertinenti')}:</p>
              <ul>
                <li>
                    <Thumb color="text-grey" number="A">
                    <p>{props.t('Se l’indirizzo email (o il nome e cognome, la carica, etc.) sono stati conferiti dal soggetto, indicandoli come dati di contatto per la propria attività, la stessa azione li fa chiaramente rientrare nell’esclusione del Considerando 14.')}</p>
                    </Thumb>
                </li>
                <li>
                 <Thumb color="text-grey" number="B">
                     <p>{props.t('Se invece (aldilà delle intenzioni del conferente) si vogliono considerare questi dati come riferiti alla “Natural Person”, il diritto al trattamento ci viene assicurato da altri due Considerando della Legge: il 47 e il 70.')}</p>
                 </Thumb>  
                </li>
              </ul>
              <p>{props.t('In particolare il 47 scrive, come conclusione')}:</p>
              <div className="quote full">
                 <p className="text-skyblue">
                 {props.t('The processing of personal data for direct marketing purposes may be regarded as carried out for a legitimate interest.')}
                 </p>
              </div>
              <p>{props.t('Quindi, se il legittimo interesse è finalizzato al direct marketing, il trattamento di questo tipo di dati è consentito.')} {props.t('In questo caso però l’assicurazione dei diritti all’interessato non è più una scelta, ma un obbligo.')} {props.t('Questo significa informare chiaramente il destinatario del trattamento e delle sue finalità assicurandogli l’esercizio dei diritti.')}</p>
              <p>{props.t('La trasmissione dell’informativa, è l’occasione stessa in cui presentare la propria attività e l\'oggetto della eventuale promozione.')}</p>
            </List>
            <h3 className="mtop20">{props.t('Altre cose che facciamo per assicurare la compatibilità con il GDPR')}:</h3>
            <List type="skyblue" number="1"> 
             <p><strong>DPO:</strong> {props.t('nonostante il Regolamento non ci obblighi in questo senso, ci stiamo dotando di un Data Protection Officer per la supervisione di tutte le procedure relative al trattamento dei dati e il rilievo di eventuali criticità.')}</p>
            </List>
            <List type="skyblue" number="2"> 
             <p><strong>Lia:</strong> {props.t('è un audit interno (“Legitimate Interest Assessment”) che serve a mettere su carta ed archiviare la valutazione fatta dal Team Databale e DPO, in merito al nostro legittimo interesse e al legittimo interesse dei nostri clienti.')}</p>
             <p>{props.t('Questo documento tiene conto di un “balance test” oggettivo, per la verifica che gli interessi individuali non prevarichino il nostro.')}</p>
            </List>
            <List type="skyblue" number="3"> 
             <p><strong>Traking:</strong> {props.t('sin dalla nascita di Bancomail, abbiamo creato routine per tracciare i dati che cediamo. Ogni singolo record contiene tutti i dati sul reperimento (data, fonte, etc) e i riferimenti (nominativo e temporale) di coloro a cui lo abbiamo fornito.')}</p>
             <p>{props.t('Questo approccio è molto importante al fine di una piena compatibilità con il Regolamento.')}</p>
            </List>
            <List type="skyblue" number="4"> 
             <p><strong>ISO 27001:</strong> {props.t('anche se non strettamente correlato al Regolamento, la nostra società si sta dotando della Certificazione ISO 27001 per la gestione della sicurezza delle informazioni. Sempre in quest’ottica i nostri sistemi sono all’avanguardia da anni, applicando tecnologie avanzate di protezione dei dati.')}</p>
            </List>
            <h3 className="mtop20">{props.t('Quindi?')}</h3>
            <p>
            {props.t('L’analisi mostra che le disposizioni del GDPR non solo non costituiscono un problema per i nostri clienti e per i marketer in generale, ma - sotto molti punti di vista - chiariscono ed ampliano le possibilità relative al direct marketing aprendo strade (es. possibilità di cessione dei dati dei “contatti” interni) che prima, per carenze normative, rimanevano nella zona d’ombra.')} 
            </p>
          </div>
        
         </div>
         <div className="page-footer">
          <BackBtn/>
         </div>
        </div>
       </section>
       <section>
        <div className="wrapper">
         <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12 center">
             <p>{props.t('Se hai bisogno di maggiori informazioni')}</p>
             <NavLink to="/contatti" title="Preventivi" className="btn btn-yellow">{props.t('Contattaci')}</NavLink>
             <p className="mtop20">&nbsp;</p>
           </div>
         </div>
         </div>
       </section>
       </React.Fragment>
  )
}

export default  withTranslation()(Gdpr);