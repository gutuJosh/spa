import React from "react";
import BackBtn from "../components/back-button/BackBtn.js";

function PrivacyPolicy() {
    return(
        <React.Fragment>
        <section className="section screen-blue">
         <div className="wrapper">
          <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12">
             <h2 className="text-white">Policy sul trattamento dei dati dei utenti di Bancomail</h2>
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
            <h3>Titolare del Trattamento dei Dati</h3>
            <p><strong>Neosoft S.r.l.</strong> (P.IVA: 01288440991 - REA: GE 398030), con sede a Genova, via Casaregis 30/13 - 16129 - Genova</p>
            <p><strong>Telefono:</strong> +39 010 8681372 / +39 010 8446402</p>
            <p><strong>Fax:</strong> +39 010 8681383</p>
            <p><strong>Email:</strong> <a href="mailto:database@bancomail.it" className="text-skyblue">database@bancomail.it</a></p>
            <p><strong>Pec:</strong> <a href="mailto:bancomail@bancopec.it" className="text-skyblue">bancomail@bancopec.it</a></p>
            <h3 className="mtop20">Quali informazioni raccogliamo?</h3>
            <p>Raccogliamo le informazioni fornite volontariamente dal momento della creazione del tuo account, quando acquisti prodotti o servizi ad es. nome azienda, contatto di riferimento, indirizzo, indirizzo email e numero di telefono.</p>
            <p>Registriamo inoltre le informazioni quando ci contatti telefonicamente o tramite chat, comprese le richieste di assistenza o preventivo e le note o i dettagli che spiegano che cosa hai richiesto e come abbiamo risposto.</p>
            <p>Il mancato conferimento dei dati comporterà l’impossibilità per Neosoft di dar corso agli impegni contrattuali assunti o alle richieste dell’utente.</p>
            <p>Utilizziamo anche cookie e tecnologie simili sui nostri siti web e applicazioni mobile per raccogliere informazioni sulle interazioni e l’utilizzo. Consulta la Policy sui Cookie per ulteriori dettagli sulla tipologia specifica di informazioni che possiamo raccogliere e sulle tue scelte in relazione a questi dati.</p>

            <hr/>

            <h3 className="mtop20">In che modo utilizziamo le informazioni raccolte?</h3>
            <p>
                I dati forniti dall’utente sono raccolti e trattati per le seguenti finalità:
                <br/>
                - Per lo svolgimento delle attività di relazione con il cliente in base agli accordi contrattuali. 
                <br/>
                - Per finalità amministrative e per l’adempimento di obblighi di legge quali ad esempio quelli di natura contabile, fiscale, o per dar corso a richieste dell’autorità giudiziaria.
                <br/>
                - A fini statistici, per migliorare la nostra offerta e il servizio verso i clienti e per individuare e prevenire frodi e abusi.
                <br/>
                - In presenza di specifico consenso, per l’invio periodico, tramite e-mail, di newsletter e materiale pubblicitario. 
                <br/>
                - Nel caso di invio di curriculum vitae, esclusivamente per finalità di selezione.
            </p>
            <p>Inoltre, utilizziamo le tue informazioni per creare il tuo account dove offriamo i nostri servizi e ti diamo visibilità dei dati in nostro possesso, unitamente alle modalità di esercizio dei tuoi diritti.</p>
            
            <hr/>

            <h3 className="mtop20">Quali soggetti sono autorizzati al trattamento dei tuoi dati? I tuoi dati vengono condivisi con terzi?</h3>
            <p>Il trattamento dei dati raccolti è effettuato da personale interno di Neosoft autorizzato al trattamento secondo specifiche istruzioni impartite nel rispetto della normativa vigente. </p>
            <p>I tuoi dati non saranno mai ceduti a terzi, né inseriti nel Database Bancomail, a meno che non siano stati conferiti spontaneamente su questo sito nell’apposita form Fanne Parte (sezione Supporto) o acquisite attraverso altre fonti autorizzate, in ogni caso previa comunicazione.</p>
            <p>Tuttavia, è possibile che alcuni tuoi dati vengano condivisi da noi con fornitori fidati, necessari per offrire servizio per nostro conto come comunicazione tramite email e annunci pubblicitari basati sugli interessi. Condividiamo solo le informazioni minime necessarie e non è consentito a soggetti terzi di utilizzare le tue informazioni per scopi diversi da quelli indicati nella nostra Policy sulla privacy. In ogni caso, i dati non saranno mai diffusi.</p>
         
            <hr/>

            <h3 className="mtop20">Come vengono conservati i dati e per quanto tempo?</h3>
            <p>I dati raccolti sono trattati mediante strumenti informatici o comunque automatizzati, con logiche strettamente correlate alle finalità per le quali i dati personali sono stati raccolti e, comunque, in modo da garantire in ogni caso la sicurezza dei medesimi. </p>
            <p>La gestione e la conservazione dei dati personali avviene su server ubicati all’interno ed all’esterno dell’Unione Europea di proprietà e/o nella disponibilità di Neosoft e/o di società terze incaricate, debitamente nominate quali responsabili del trattamento. Il trasferimento all’estero dei dati nei paesi extra-UE avviene in conformità alle disposizioni contenute nel GDPR.</p>
            <p>I dati sono conservati per il tempo necessario alla gestione delle finalità per le quali i dati stessi sono raccolti, nel rispetto delle norme vigenti e degli obblighi di legge.</p>
            
            <hr/>

            <h3 className="mtop20">Quali sono i tuoi diritti sui dati?</h3>
            <p>In ogni momento (se non ricorrono le limitazioni previste dalla legge) puoi richiedere accesso ai dati, opporti al trattamento o chiedere la cancellazione, la modifica o l’aggiornamento di tutte le informazioni raccolte da Neosoft, esercitando il diritto alla limitazione del trattamento e il diritto alla portabilità dei dati, inviando un’e-mail all’indirizzo 
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
export default PrivacyPolicy;