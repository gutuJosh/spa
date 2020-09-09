import React from "react";
import {NavLink} from "react-router-dom";
import BackBtn from "../components/back-button/BackBtn.js";
import List from "../components/ordered-list/List.js";

function Garanzie() {
  return(
       <React.Fragment>
        <section className="section screen-blue">
         <div className="wrapper">
          <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12">
             <h2 className="text-white">Garanzie<br/><span className="text-white">Un nome, una garanzia. Anzi tre.</span></h2>
             <p className="text-white">Ogni pacchetto Bancomail è coperto da una garanzia contrattuale sulla liceità di raccolta e trattamento dei dati.</p>
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
            <List type="skyblue" number="1">  
                <h3>Protezione dei Dati</h3>
            </List>
            <p className="mtop20">I dati forniti da Bancomail sono reperiti, trattati e gestiti in piena conformità con il Regolamento generale sulla protezione dei dati (GDPR, Regolamento UE 2016/679) e con le leggi nazionali.</p>
            <p>Tutte le aziende all’interno del nostro database sono informate preliminarmente e poi con cadenza periodica su modalità, tempi e finalità del trattamento. </p>
            <p>I diritti dell'interessato all’aggiornamento, rettifica e cancellazione, vengono rigorosamente rispettati e ne viene fornito riscontro con estrema rapidità - come previsto dal Regolamento generale sulla protezione dei dati e dalle leggi nazionali.</p>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="2">  
                <h3>Precisione dei Dati</h3>
            </List>
            <p className="mtop20">Giornalmente il database viene controllato ed aggiornato da un reparto dedicato. Ogni dato relativo ai diversi campi (e-mail, indirizzo, telefono, fax, cap, etc.) passa attraverso 21 differenti processi di refilazione, normalizzazione e standardizzazione al fine di garantire dati unici, aggiornati e coerenti.</p>
            <p>Il dato email viene testato periodicamente dal nostro personale. La verifica avviene attraverso controlli software incrociati atti a garantire sia l'esistenza dell'indirizzo (unknown user, Not In DSN, etc.) sia la sua
funzionalità (over quota, spamcop etc).</p>
            <p>Ci impegniamo a rimborsare tutti gli indirizzi e-mail che, nell'arco di 60 giorni dalla fornitura, si rivelassero malfunzionanti o cessati.</p>
            <h4 className="mtop20">Come funziona il rimborso dei bounce?</h4>
            <p>Nessuna scusa: se è un hard bounce, il risarcimento è garantito. Stabilita l'entità degli indirizzi invalidi, potrai scegliere la modalità di rimborso preferita tra:</p>
            <List number="1">  
                <p>Sostituiamo gli indirizzi errati con altri di eguali o - se vuoi - differenti caratteristiche.</p>
            </List>
            <List number="2">  
                <p>Un buono valido su qualunque acquisto del valore speso per le anagrafiche errate, maggiorato in questo caso di un 30% aggiuntivo di sconto.</p>
            </List>
            <List number="3">  
                <p>Un <em>Credito Anagrafiche</em>, pari al numero di record non idonei, da scalare sui successivi acquisti esclusivamente tramite preventivo (gratuito e personalizzato).</p>
            </List>
            <p className="mtop20">&nbsp;</p>
            <List type="skyblue" number="3">  
                <h3>Professionalità</h3>
            </List>
            <p className="mtop20">
                Nessun disco o voce registrata: un nostro operatore in carne e ossa è sempre a tua disposizione per fornirti assistenza gratuita, anche post vendita, per qualsiasi necessità: dall’importazione alla gestione del pacchetto.
                Rispondiamo alle vostre richieste entro un massimo di 48 ore.
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

export default Garanzie;