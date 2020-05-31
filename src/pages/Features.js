import React from "react";
import {NavLink} from "react-router-dom";
import BackBtn from "../components/back-button/BackBtn.js";
import List from "../components/ordered-list/List.js";

function Features() {
  return(
       <React.Fragment>
        <section className="section screen-blue">
         <div className="wrapper">
          <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12">
             <h2 className="text-white">Quello che rende le nostre liste migliori, rende migliore il tuo Email Marketing.</h2>
             <p className="text-white">
             Prepariamo la nostra fornitura specificatamente per il tuo email marketing, selezionando pacchetti di anagrafiche in grado di soddisfare esigenze e obiettivi diversi - ma sempre con lo stesso elevato e meticoloso standard di qualità.
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
            <h3>Come prepariamo e gestiamo ogni Database:</h3>
            <List type="skyblue" number="1">  
                <h4 className="text-skyblue">Acquisizione data</h4>
                <p>Il database Bancomail raccoglie con scrupolosa osservanza normativa unicamente Aziende o Professionisti italiani ed esteri che hanno liberamente indicato i loro recapiti (elettronici e non) fornendoceli direttamente o pubblicandoli in fonti di primaria qualità (elenchi pubblici e terzi autorizzati). Tutte le aziende all’interno del nostro database sono informate preliminarmente e poi periodicamente su modalità, tempi e finalità del trattamento.</p>
                <p className="small"><i className="pe-7s-check"></i> Conformità GDPR e Normative Privacy <i className="pe-7s-check"></i> Fonti proprietarie <i className="pe-7s-check"></i> Fonti di primaria qualità </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="2">  
                <h4 className="text-skyblue">Validazione e verifica</h4>
                <p>Giornalmente il database viene controllato ed aggiornato da un reparto dedicato. Ogni dato relativo ai diversi campi (e-mail, indirizzo, telefono, fax, cap, etc.) passa attraverso 21 differenti processi di refilazione, normalizzazione e standardizzazione al fine di garantire dati unici, aggiornati e coerenti.</p>
                <p className="small">
                 <i className="pe-7s-check"></i> Deduplicazione&nbsp; 
                 <i className="pe-7s-check"></i> Test DNS Validazione&nbsp; 
                 <i className="pe-7s-check"></i> Validazione Email&nbsp; 
                 <i className="pe-7s-check"></i> Check email spamtrap &amp; honeypot, inconsitency
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="3">  
                <h4 className="text-skyblue">Geolocalizzazione e Normalizzazione</h4>
                <p>Ogni azienda nel Database è completa di tutti i dati di geolocalizzazione allineati e formattati secondo gli standard ISO 3166 (Country Code e Name), ISO 3166-2:CC (Administrative Division 1&amp;2) e secondo standard proprietari per la normalizzazione delle Località (oltre 15 milioni di record georeferenziati), postcode e Indirizzo. Lo standard ITU è utilizzato per la normalizzazione dei numeri telefonici.</p>
                <p className="small">
                 <i className="pe-7s-check"></i> Normalizazzione country code &amp; country name&nbsp; 
                 <i className="pe-7s-check"></i> Normalizazzione administrative divisions 1 &amp; 2&nbsp; 
                 <i className="pe-7s-check"></i> Geolocalizzazione località&nbsp; 
                 <i className="pe-7s-check"></i> Normalizzazione indirizzi &amp; zip code&nbsp; 
                 <i className="pe-7s-check"></i> Normalizzazione numeri telefono &amp; fax   
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="4">  
                <h4 className="text-skyblue">Classificazione merceologica </h4>
                <p>Ogni azienda censita nel Database è convertita nella classificazione a tre rami di Bancomail: 26 comparti comprendono 292 macro categorie a loro volta suddivise in 1.879 micro categorie. Ogni azienda è poi etichettata con complementi di specificazione ad uso interno che permettono ai consulenti commerciali di Bancomail di fornire le tipologie di attività più rilevanti per il marketing dei nostri clienti.</p>
                <p className="small">
                 <i className="pe-7s-check"></i> 26 comparti&nbsp; 
                 <i className="pe-7s-check"></i> 292 macro-categorie&nbsp; 
                 <i className="pe-7s-check"></i> 1.879 micro-categorie &nbsp;
                 <i className="pe-7s-check"></i> Oltre 350 specificazioni supplementari
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="5">  
                <h4 className="text-skyblue">Dati integrati </h4>
                <p>Ogni record è contraddistinto da una classificazione aziendale profonda che comprende anche il volume di fatturato, la forma sociale, il numero di dipendenti e altre caratteristiche tipiche (ad esempio le stelle per gli alberghi). Le partite IVA sono normalizzate secondo i registri nazionali e locali (EU VAT numbers, USA EIN TIN, India Bin, ecc.) e su richiesta sono disponibili i principali profili social delle aziende.</p>
                <p className="small">
                 <i className="pe-7s-check"></i> Integrazione Dati economici&nbsp; 
                 <i className="pe-7s-check"></i> Integrazione Social&nbsp; 
                 <i className="pe-7s-check"></i> Normalizzazione Partite IVA 
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="6">  
                <h4 className="text-skyblue">Conformità Normativa e GDPR </h4>
                <p>I dati forniti da Bancomail sono reperiti, trattati e gestiti in piena conformità alle leggi nazionali comunitarie e sulla Protezione dei Dati (GDPR). I diritti dell'interessato all’aggiornamento, rettifica e cancellazione, vengono rigorosamente rispettati e ne viene fornito riscontro con estrema rapidità - così come previsto dalle regolamentazioni vigenti. Dopo la prima informativa inoltre, inviamo periodicamente una notifica sul trattamento dei dati e sul loro aggiornamento in modo da garantire un database aggiornato ed in linea con i principi della Protezione dei Dati.</p>
                <p className="small">
                 <i className="pe-7s-check"></i> Dati reperiti secondo le normative&nbsp; 
                 <i className="pe-7s-check"></i> Dati verificabili e gestibili da tutti gli interessati&nbsp; 
                 <i className="pe-7s-check"></i> Gestione Blacklist&nbsp; 
                 <i className="pe-7s-check"></i> GDPR Ready 
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="7">  
                <h4 className="text-skyblue">Supporto &amp; garanzie</h4>
                <p>Eventuali indirizzi non funzionanti sono sostituiti contrattualmente con altri di eguali o - facoltativamente - differenti caratteristiche oppure rimborsati con uno storno o un coupon. Nessun disco o voce registrata: un nostro operatore in carne e ossa è sempre a tua disposizione per fornirti assistenza gratuita, dal pre al post vendita, per qualsiasi necessità: dall’importazione alla gestione del pacchetto.</p>
                <p className="small">
                 <i className="pe-7s-check"></i> Sostituzione garantita per eventuali indirizzi invalidi&nbsp; 
                 <i className="pe-7s-check"></i> Assistenza pre e post vendita&nbsp; 
                 <i className="pe-7s-check"></i> Piattaforme di spedizione compatibili 
                </p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="8">  
                <h4 className="text-skyblue">Tracciabilità</h4>
                <p>Ogni operazione sul Database è tracciata: dall'acquisizione del dato (fonte e data del trattamento) ad ogni successivo aggiornamento, comprese eventuali rimozioni. Archiviamo anche ogni acquirente per ogni singolo record: in questo modo possiamo gestire in modo specifico eventuali controversie e siamo in grado di offrire sole anagrafiche integrative - senza rischio duplicati - ai clienti che vogliono aggiornare il loro database.</p>
                <p className="small">
                    <i className="pe-7s-check"></i> Fonte e data di acquisizione&nbsp;  
                    <i className="pe-7s-check"></i> Ogni modifica tracciata&nbsp;
                    <i className="pe-7s-check"></i> Ogni acquisto tracciato 
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
             <p>Se hai bisogno di maggiori informazioni:</p>
             <NavLink to="/contatti" title="Preventivi" className="btn btn-yellow">Contattaci</NavLink>
             <p className="mtop20">&nbsp;</p>
           </div>
         </div>
         </div>
       </section>
       </React.Fragment>
  )
}

export default Features;