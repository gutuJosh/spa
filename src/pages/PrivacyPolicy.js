import React from "react";
import BackBtn from "../components/back-button/BackBtn.js";
import "../config/i18n.js";
import { withTranslation } from "react-i18next";

const PrivacyPolicy = (props) => {
    return(
        <React.Fragment>
        <section className="section screen-blue">
         <div className="wrapper">
          <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12">
             <h2 className="text-white">{props.t('privacy:Policy sul trattamento dei dati dei utenti di Bancomail')}</h2>
             <p className="text-white"></p>
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
            <h3>{props.t('privacy:Titolare del Trattamento dei Dati')}</h3>
            <p><strong>Neosoft S.r.l.</strong> (P.IVA: 01288440991 - REA: GE 398030), {props.t('privacy:con sede a Genova, via Casaregis 30/13 - 16129 - Genova')}</p>
            <p><strong>{props.t('privacy:Telefono')}:</strong> +39 010 8681372 / +39 010 8446402</p>
            <p><strong>Fax:</strong> +39 010 8681383</p>
            <p><strong>Email:</strong> <a href="mailto:database@bancomail.it" className="text-skyblue">database@bancomail.it</a></p>
            <p><strong>Pec:</strong> <a href="mailto:bancomail@bancopec.it" className="text-skyblue">bancomail@bancopec.it</a></p>
            <h3 className="mtop20">{props.t('privacy:Quali informazioni raccogliamo?')}</h3>
            <p>{props.t('privacy:Raccogliamo le informazioni fornite volontariamente dal momento della creazione del tuo account, quando acquisti prodotti o servizi ad es. nome azienda, contatto di riferimento, indirizzo, indirizzo email e numero di telefono.')}</p>
            <p>{props.t('privacy:Registriamo inoltre le informazioni quando ci contatti telefonicamente o tramite chat, comprese le richieste di assistenza o preventivo e le note o i dettagli che spiegano che cosa hai richiesto e come abbiamo risposto.')}</p>
            <p>{props.t('privacy:Il mancato conferimento dei dati comporter?? l???impossibilit?? per Neosoft di dar corso agli impegni contrattuali assunti o alle richieste dell???utente.')}</p>
            <p>
              {props.t('privacy:Utilizziamo anche cookie e tecnologie simili sui nostri siti web e applicazioni mobile per raccogliere informazioni sulle interazioni e l???utilizzo.')}&nbsp;
              {props.t('privacy:Consulta la Policy sui Cookie per ulteriori dettagli sulla tipologia specifica di informazioni che possiamo raccogliere e sulle tue scelte in relazione a questi dati.')}
           </p>
            <hr/>
            <h3 className="mtop20">{props.t('privacy:In che modo utilizziamo le informazioni raccolte?')}</h3>
            <p>
                {props.t('privacy:I dati forniti dall???utente sono raccolti e trattati per le seguenti finalit??')}:
                <br/>
                - {props.t('privacy:Per lo svolgimento delle attivit?? di relazione con il cliente in base agli accordi contrattuali')}. 
                <br/>
                - {props.t('privacy:Per finalit?? amministrative e per l???adempimento di obblighi di legge quali ad esempio quelli di natura contabile, fiscale, o per dar corso a richieste dell???autorit?? giudiziaria.')}
                <br/>
                - {props.t('privacy:A fini statistici, per migliorare la nostra offerta e il servizio verso i clienti e per individuare e prevenire frodi e abusi.')}
                <br/>
                - {props.t('privacy:In presenza di specifico consenso, per l???invio periodico, tramite e-mail, di newsletter e materiale pubblicitario.')} 
                <br/>
                - {props.t('privacy:Nel caso di invio di curriculum vitae, esclusivamente per finalit?? di selezione.')}
            </p>
            <p>{props.t('privacy:Inoltre, utilizziamo le tue informazioni per creare il tuo account dove offriamo i nostri servizi e ti diamo visibilit?? dei dati in nostro possesso, unitamente alle modalit?? di esercizio dei tuoi diritti.')}</p>
            
            <hr/>

            <h3 className="mtop20">{props.t('privacy:Quali soggetti sono autorizzati al trattamento dei tuoi dati? I tuoi dati vengono condivisi con terzi?')}</h3>
            <p>{props.t('privacy:Il trattamento dei dati raccolti ?? effettuato da personale interno di Neosoft autorizzato al trattamento secondo specifiche istruzioni impartite nel rispetto della normativa vigente.')}</p>
            <p>{props.t('privacy:I tuoi dati non saranno mai ceduti a terzi, n?? inseriti nel Database Bancomail, a meno che non siano stati conferiti spontaneamente su questo sito nell???apposita form Fanne Parte (sezione Supporto) o acquisite attraverso altre fonti autorizzate, in ogni caso previa comunicazione.')}</p>
            <p>
              {props.t('privacy:Tuttavia, ?? possibile che alcuni tuoi dati vengano condivisi da noi con fornitori fidati, necessari per offrire servizio per nostro conto come comunicazione tramite email e annunci pubblicitari basati sugli interessi.')}&nbsp;
              {props.t('privacy:Condividiamo solo le informazioni minime necessarie e non ?? consentito a soggetti terzi di utilizzare le tue informazioni per scopi diversi da quelli indicati nella nostra Policy sulla privacy.')}
              {props.t('privacy:In ogni caso, i dati non saranno mai diffusi.')}
            </p>
         
            <hr/>

            <h3 className="mtop20">{props.t('privacy:Come vengono conservati i dati e per quanto tempo?')}</h3>
            <p>{props.t('privacy:I dati raccolti sono trattati mediante strumenti informatici o comunque automatizzati, con logiche strettamente correlate alle finalit?? per le quali i dati personali sono stati raccolti e, comunque, in modo da garantire in ogni caso la sicurezza dei medesimi.')}</p>
            <p>{props.t('privacy:La gestione e la conservazione dei dati personali avviene su server ubicati all???interno ed all???esterno dell???Unione Europea di propriet?? e/o nella disponibilit?? di Neosoft e/o di societ?? terze incaricate, debitamente nominate quali responsabili del trattamento.')} {props.t('privacy:Il trasferimento all???estero dei dati nei paesi extra-UE avviene in conformit?? alle disposizioni contenute nel GDPR.')}</p>
            <p>{props.t('privacy:I dati sono conservati per il tempo necessario alla gestione delle finalit?? per le quali i dati stessi sono raccolti, nel rispetto delle norme vigenti e degli obblighi di legge.')}</p>
            
            <hr/>

            <h3 className="mtop20">{props.t('privacy:Quali sono i tuoi diritti sui dati?')}</h3>
            <p>{props.t('privacy:In ogni momento (se non ricorrono le limitazioni previste dalla legge) puoi richiedere accesso ai dati, opporti al trattamento o chiedere la cancellazione, la modifica o l???aggiornamento di tutte le informazioni raccolte da Neosoft, esercitando il diritto alla limitazione del trattamento e il diritto alla portabilit?? dei dati, inviando un???e-mail all???indirizzo')} 
            &nbsp;<a href="mailto:database@bancomail.it" className="text-skyblue">database@bancomail.it</a> o <a href="mailto:bancomail@bancopec.it" className="text-skyblue">bancomail@bancopec.it</a>
            </p>
          </div>
         </div>
         <div className="page-footer flex-grid">
          <BackBtn/>
         </div>
         <div className="mtop50">&nbsp;</div>
        </div>
        </section>
        </React.Fragment>
    );
}
export default withTranslation()(PrivacyPolicy);