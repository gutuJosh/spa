import React from "react";
import {NavLink} from "react-router-dom";
import BackBtn from "../components/back-button/BackBtn.js";
import List from "../components/ordered-list/List.js";
import "../config/i18n.js";
import { withTranslation } from "react-i18next";

const Features = (props) => {
  return(
       <React.Fragment>
        <section className="section screen-blue">
         <div className="wrapper">
          <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12">
             <h2 className="text-white">{props.t('Quello che rende le nostre liste migliori, rende migliore il tuo Email Marketing.')}</h2>
             <p className="text-white">
             {props.t('Prepariamo la nostra fornitura specificatamente per il tuo email marketing, selezionando pacchetti di anagrafiche in grado di soddisfare esigenze e obiettivi diversi - ma sempre con lo stesso elevato e meticoloso standard di qualità.')}
             </p>
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
            <h3>{props.t('Come prepariamo e gestiamo ogni Database')}:</h3>
            <List type="skyblue" number="1">  
                <h4 className="text-skyblue">{props.t('Acquisizione data')}</h4>
                <p>{props.t('Il database Bancomail raccoglie con scrupolosa osservanza normativa unicamente Aziende o Professionisti italiani ed esteri che hanno liberamente indicato i loro recapiti (elettronici e non) fornendoceli direttamente o pubblicandoli in fonti di primaria qualità (elenchi pubblici e terzi autorizzati).')} {props.t('Tutte le aziende all’interno del nostro database sono informate preliminarmente e poi periodicamente su modalità, tempi e finalità del trattamento.')}</p>
                <p className="small"><i className="pe-7s-check"></i> {props.t('Conformità GDPR e Normative Privacy')} <i className="pe-7s-check"></i> {props.t('Fonti proprietarie')} <i className="pe-7s-check"></i> {props.t('Fonti di primaria qualità')} </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="2">  
                <h4 className="text-skyblue">{props.t('Validazione e verifica')}</h4>
                <p>{props.t('Giornalmente il database viene controllato ed aggiornato da un reparto dedicato. Ogni dato relativo ai diversi campi (e-mail, indirizzo, telefono, fax, cap, etc.) passa attraverso 21 differenti processi di refilazione, normalizzazione e standardizzazione al fine di garantire dati unici, aggiornati e coerenti.')}</p>
                <p className="small">
                 <i className="pe-7s-check"></i> {props.t('Deduplicazione')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Test DNS Validazione')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Validazione Email')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Check email spamtrap')} &amp; {props.t('honeypot, inconsitency')}
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="3">  
                <h4 className="text-skyblue">{props.t('Geolocalizzazione e Normalizzazione')}</h4>
                <p>{props.t('Ogni azienda nel Database è completa di tutti i dati di geolocalizzazione allineati e formattati secondo gli standard ISO 3166 (Country Code e Name),')} ISO 3166-2:CC {props.t('Administrative Division 1&amp;2) e secondo standard proprietari per la normalizzazione delle Località (oltre 15 milioni di record georeferenziati), postcode e Indirizzo.')} {props.t('Lo standard ITU è utilizzato per la normalizzazione dei numeri telefonici.')}</p>
                <p className="small">
                 <i className="pe-7s-check"></i> {props.t('Normalizazzione country code &amp; country name')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Normalizazzione administrative divisions')} 1 &amp; 2&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Geolocalizzazione località')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Normalizzazione indirizzi')} &amp; {props.t('zip code')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Normalizzazione numeri telefono')} &amp; {props.t('fax')}   
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="4">  
                <h4 className="text-skyblue">{props.t('Classificazione merceologica')}</h4>
                <p>{props.t('Ogni azienda censita nel Database è convertita nella classificazione a tre rami di Bancomail')}: {props.t('26 comparti comprendono 292 macro categorie a loro volta suddivise in 1.879 micro categorie.')} {props.t('Ogni azienda è poi etichettata con complementi di specificazione ad uso interno che permettono ai consulenti commerciali di Bancomail di fornire le tipologie di attività più rilevanti per il marketing dei nostri clienti.')}</p>
                <p className="small">
                 <i className="pe-7s-check"></i> {props.t('26 comparti')}&nbsp; 
                 <i className="pe-7s-check"></i> 292 {props.t('macro-categorie')}&nbsp; 
                 <i className="pe-7s-check"></i> 1.879 {props.t('micro-categorie')}&nbsp;
                 <i className="pe-7s-check"></i> {props.t('Oltre 350 specificazioni supplementari')}
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="5">  
                <h4 className="text-skyblue">{props.t('Dati integrati')}</h4>
                <p>{props.t('Ogni record è contraddistinto da una classificazione aziendale profonda che comprende anche il volume di fatturato, la forma sociale, il numero di dipendenti e altre caratteristiche tipiche (ad esempio le stelle per gli alberghi). Le partite IVA sono normalizzate secondo i registri nazionali e locali (EU VAT numbers, USA EIN TIN, India Bin, ecc.) e su richiesta sono disponibili i principali profili social delle aziende.')}</p>
                <p className="small">
                 <i className="pe-7s-check"></i> {props.t('Integrazione Dati economici')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Integrazione Social')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Normalizzazione Partite IVA')} 
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="6">  
                <h4 className="text-skyblue">{props.t('Conformità Normativa e GDPR')}</h4>
                <p>{props.t('I dati forniti da Bancomail sono reperiti, trattati e gestiti in piena conformità alle leggi nazionali comunitarie e sulla Protezione dei Dati (GDPR).')} {props.t('I diritti dell\'interessato all’aggiornamento, rettifica e cancellazione, vengono rigorosamente rispettati e ne viene fornito riscontro con estrema rapidità - così come previsto dalle regolamentazioni vigenti. Dopo la prima informativa inoltre, inviamo periodicamente una notifica sul trattamento dei dati e sul loro aggiornamento in modo da garantire un database aggiornato ed in linea con i principi della Protezione dei Dati.')}</p>
                <p className="small">
                 <i className="pe-7s-check"></i> {props.t('Dati reperiti secondo le normative')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Dati verificabili e gestibili da tutti gli interessati')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Gestione Blacklist')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('GDPR Ready')} 
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="7">  
                <h4 className="text-skyblue">{props.t('Supporto e garanzie')}</h4>
                <p>{props.t('Eventuali indirizzi non funzionanti sono rimborsati con uno storno o un coupon. Nessun disco o voce registrata')}: {props.t('un nostro operatore in carne e ossa è sempre a tua disposizione per fornirti assistenza gratuita, dal pre al post vendita, per qualsiasi necessità')}: {props.t('dall’importazione alla gestione del pacchetto.')}</p>
                <p className="small">
                 <i className="pe-7s-check"></i> {props.t('Sostituzione garantita per eventuali indirizzi invalidi')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Assistenza pre e post vendita')}&nbsp; 
                 <i className="pe-7s-check"></i> {props.t('Piattaforme di spedizione compatibili')} 
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="8">  
                <h4 className="text-skyblue">{props.t('Tracciabilità')}</h4>
                <p>{props.t('Ogni operazione sul Database è tracciata')}: {props.t('dall\'acquisizione del dato (fonte e data del trattamento) ad ogni successivo aggiornamento, comprese eventuali rimozioni.')} {props.t('Archiviamo anche ogni acquirente per ogni singolo record')}: {props.t('in questo modo possiamo gestire in modo specifico eventuali controversie e siamo in grado di offrire sole anagrafiche integrative - senza rischio duplicati - ai clienti che vogliono aggiornare il loro database.')}</p>
                <p className="small">
                    <i className="pe-7s-check"></i> {props.t('Fonte e data di acquisizione')}&nbsp;  
                    <i className="pe-7s-check"></i> {props.t('Ogni modifica tracciata')}&nbsp;
                    <i className="pe-7s-check"></i> {props.t('Ogni acquisto tracciato')} 
                </p>
            </List>
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
             <p>{props.t('Se hai bisogno di maggiori informazioni')}:</p>
             <NavLink to="/contatti" className="btn btn-yellow">{props.t('Contattaci')}</NavLink>
             <p className="mtop20">&nbsp;</p>
           </div>
         </div>
         </div>
       </section>
       </React.Fragment>
  )
}

export default  withTranslation()(Features);