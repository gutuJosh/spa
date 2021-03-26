import React from "react";
import {NavLink} from "react-router-dom";
//import worker from '../worker.js';
//import workerSetup from '../workerSetup.js';
import ListItem from "./../components/unordered-list/listItem.js";
import SearchForm from "./../components/search-form/searchForm.js";
import Store from "./../helpers/Storage.js";
import "../config/i18n.js";
import { withTranslation } from "react-i18next";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.submitSearchForm = this.submitSearchForm.bind(this);
  }

   componentDidMount(){
    try{
      window.scrollTo(0,0);
     }
     catch(e){
       //console.log(e.message);
     }
    /*if(Store.getSession('check4update') === false){
      this.worker = new workerSetup(worker);
        this.worker.onmessage = (event) => {
        console.log(event.data);
        if(event.data.indexOf('Database updated') !== -1){
          Store.setSession('check4update', 1);
        }
      }; 
    } */
    Store.removeSession('offlineSearch');
   }

   componentWillUnmount(){
    try{
      window.scrollTo(0,0);
     }
     catch(e){
       //console.log(e.message);
     }
   }


   submitSearchForm(nation, categories){
      nation = nation.includes('tutte')  ? '' : nation;
      categories = categories.includes('tutte')  ? '' : categories;
      Store.setSession('offlineSearch', JSON.stringify({
        'nation': nation, 
        'category':categories, 
        'region':''
      }));
      Store.removeSession('currentPage');
      this.props.history.push('/liste-email');
     
   }

   render(){
    return(
      <React.Fragment>
       <section className="section screen-blue home">
         <div className="wrapper">
           <div className="flex-grid">
            <div className="center flex-lg-12 flex-md-12 flex-sm-12">
                <h2 className="text-white">
                    {this.props.t('home:Database e Liste Indirizzi Email')}<br/>{this.props.t('home:di Aziende per l\'Email Marketing B2B')}
                </h2>
       
              <h3 className="text-white">
               8 {this.props.t('home:Milioni di aziende profilate per far crescere il tuo business')}
              </h3>
            </div>
           </div>
           <div className="flex-grid align-center">
            <div className="flex-lg-10 flex-md-10 flex-sm-12">
               <SearchForm action="/liste" method="get" handleSubmit={this.submitSearchForm}/>
              <div className="mtop50 center">
            
                <p className="text-white">
                   {this.props.t('home:Per profilazioni avanzate richiedi un')}&nbsp;
                   <NavLink to="/richiesta-preventivo" className="underlined text-white request-quote-btn">{this.props.t('home:preventivo gratuito')}</NavLink>
                </p>

              </div>
            </div>
           </div>
         </div>
       </section>
       <section className="light">
        <div className="wrapper">
        <div className="flex-grid">
          <div className="center flex-lg-12 flex-md-12 flex-sm-12">
            <h2><strong>{this.props.t('home:Database profilati')}</strong><br/>{this.props.t('home:per strategie vincenti di Email Marketing.')}</h2>
          </div>
         </div>
         <div className="flex-grid mtop30">
          <div className="center flex-lg-6 flex-md-6 flex-sm-12 pad10">
            <img src="/images/png/various/4agencies.png" alt=""  className="figure" />
          </div>
          <div className="flex-lg-6 flex-md-6 flex-sm-12 pad10">
            <h3>
            <NavLink to="/liste-email" className="text-skyblue">
              <strong>{this.props.t('home:Contatti esclusivi. Senza intermediari.')}</strong>
            </NavLink>
            </h3>
            <p>{this.props.t('home:Crea in breve tempo legami misurabili con un’audience molto vasta. Il tutto ad un costo decisamente contenuto.')}</p>
           
            <ul className="list">
              <li>
                <ListItem 
                 link="/liste-email/conformita-gdpr"
                 linkTxt={this.props.t('home:Conformità GDPR e Normativa')}
                 text={this.props.t('home:I Database Bancomail rispettano il Regolamento generale sulla protezione dei dati e le Leggi Nazionali e possono essere utilizzati per finalità di Direct Marketing.')}
                 />
              </li>
              <li>
              <ListItem 
                 link="/liste-email/caratteristiche"
                 linkTxt={this.props.t('home:Dati classificati e geo-normalizzati')}
                 text={this.props.t('home:Una segmentazione a tre rami fino a oltre 2000 categorizzazioni. Standard ISO 3166, ITU e Standard Proprietari per oltre 15MM di record. Partite IVA secondo i Registri Nazionali, classi di fatturato, numero dipendenti e link social.')}
                />
              </li>
              <li>
              <ListItem 
                 link="/liste-email/garanzie"
                 linkTxt={this.props.t('home:Validati e garantiti')}
                 text={this.props.t('home:Nessun record duplicato, check A/MX Record, validità formale e controllo della complain inclination.') + ' ' + this.props.t('home:Garanzia vuol dire Sicurezza dei Dati') + ': '+ this.props.t('home:se trovi indirizzi non funzionanti, ti rimborsiamo.')}
                />
              </li>
            </ul>
          </div>
         </div>
        </div>
       </section>
       <section className="mtop50">
        <div className="wrapper">
         <div className="flex-grid home-faq">
          <div className="center flex-lg-12 flex-md-12 flex-sm-12">
            <h2>{this.props.t('home:Domande frequenti')}</h2>
            <h3>
            {this.props.t('home:Come acquistare e utilizzare un database di indirizzi email e liste aziende')}<br/>
            {this.props.t('home:per campagne DEM e Email Marketing B2B')}
            </h3>
          </div>
         </div>
         <div className="flex-grid">
            <div className="flex-lg-6 flex-md-6 flex-sm-12 pad10">
               <div className="accordion mtop20">
                  <div>
                   <input className="step-chk" id="ac-1" name="accordion-1" type="checkbox"/>
	                 <label htmlFor="ac-1" className="accordion-title">{this.props.t('home:Quali campi contengono le anagrafiche?')}</label> 
                   <div className="ac-content">
                      <div className="pad10">
                        <p>{this.props.t('home:Ogni anagrafica è composta dai seguenti campi')}:</p>
                        <table className="table table-light">
                      <thead>
                        <tr>
                        <th>{this.props.t('home:Nazione')}</th>
                        </tr>
                      </thead>
                          <tbody>
                          <tr>
                          <td>{this.props.t('home:Categoria merceologica')}</td>
                          </tr>
                          <tr>
                          <td>{this.props.t('home:Indirizzo email')}</td>
                          </tr>
                          <tr>
                          <td>{this.props.t('home:Ragione sociale')}</td>
                            </tr>
                            <tr>
                          <td>{this.props.t('home:Indirizzo')}*</td>
                            </tr>
                            <tr>
                          <td>{this.props.t('home:CAP')}</td>
                            </tr>
                            <tr>
                          <td>{this.props.t('home:Città')}</td>
                            </tr>
                          <tr>
                          <td>{this.props.t('home:Nazione')}</td>
                          </tr>
                          <tr>
                          <td>{this.props.t('home:Regione')}*</td>
                          </tr>
                          <tr>
                          <td>{this.props.t('home:Telefono')}*</td>
                          </tr>
                          <tr>
                          <td>{this.props.t('home:Fax')}*</td>
                          </tr>
                          <tr>
                          <td>{this.props.t('home:Fatturato')}*</td>
                          </tr>
                          <tr>
                          <td>{this.props.t('home:Dipendenti')}*</td>
                          </tr>
                          </tbody>
                        </table>
                        <hr className="thin"/>
                        <p className="small">* {this.props.t('home:campo a percentuale di copertura variabile')}</p>
                        <p className="small">{this.props.t('home:Profilazioni avanzate possono essere accordate, se disponibili, tramite Preventivo personalizzato.')}</p>
                       </div>
                    </div> 
                  </div>

                  <div className="mtop20">
                   <input className="step-chk" id="ac-6" name="accordion6" type="checkbox"/>
	                 <label htmlFor="ac-6" className="accordion-title">{this.props.t('home:Quali sono i criteri di filtro per la ricerca?')}</label> 
                   <div className="ac-content">
                      <div className="pad10">
                        <p>                       
                        {this.props.t('home:Puoi combinare tutti i filtri che vuoi per comporre il tuo pacchetto. Scegli tra criteri categorici e geografici, forma sociale, fasce di fatturato e numero di dipendenti.')}
                        <br/>
                        {this.props.t('home:I filtri forma sociale, fasce di fatturato, numero di dipendenti e altre configurazioni avanzate (microcategorie, province e CAP, classificazione a stelle per gli hotel, etc.) non sono disponibili per l\'acquisto online.')}&nbsp;
                        {this.props.t('home:Per una profilazione avanzata puoi contattare i nostri operatori')}:
                        <br/>
                        <NavLink to="/richiesta-preventivo" className="text-skyblue">
                         {this.props.t('home:chiedi un preventivo.')}
                         </NavLink>
                        </p>
                       </div>
                    </div> 
                  </div>

                  <div className="mtop20">
                   <input className="step-chk" id="ac-7" name="accordion-7" type="checkbox"/>
	                 <label htmlFor="ac-7" className="accordion-title"> {this.props.t('home:Che tipo di indirizzi contiene il database?')}</label> 
                   <div className="ac-content">
                      <div className="pad10">
                       <p>
                         {this.props.t('home:Il Database di Bancomail contiene ad oggi più di')} 8.000.000  {this.props.t('home:di record di aziende, associazioni e liberi professionisti.')}&nbsp;
                         {this.props.t('home:Tutte le tipologie di dati sono conformi al trattamento o all’uso secondo quando stabilito dal Regolamento generale sulla protezione dei dati (GDPR) e dalle leggi nazionali.')}
                       </p>
                       <p>
                        {this.props.t('home:Non detiene dati relativi ai ruoli aziendali.')}&nbsp;
                        {this.props.t('home:Considerata la transitorietà di tali contatti e, in particolare, le best practices del Permission Marketing riteniamo opportuno utilizzare contatti generici, avendo cura di indirizzare il messaggio al reparto più opportuno sfruttando il campo oggetto (es. "alla c.a. Responsabile Acquisti" - Vendite etc.).')}
                       </p>
                       <p> 
                         {this.props.t('home:Per maggiori informazioni sulla tipologia di indirizzi presenti, consultare la sezione')}&nbsp;
                         <NavLink to="/liste-email/conformita-gdpr" className="text-skyblue"> {this.props.t('home:Conformità GDPR')}</NavLink>.
                      </p>
                     </div>
                    </div> 
                  </div>

                  <div className="mtop20">
                   <input className="step-chk" id="ac-8" name="accordion-8" type="checkbox"/>
	                 <label htmlFor="ac-8" className="accordion-title">{this.props.t('home:Esistono opzioni di matching o aggiornamento dati?')}</label> 
                   <div className="ac-content">
                      <div className="pad10">
                       <p>
                        {this.props.t('home:Sì, passati almeno 6 mesi dal tuo acquisto, puoi richiederne l\'aggiornamento.')}&nbsp;
                        {this.props.t('home:L\'aggiornamento del tuo database prevede la fornitura delle sole nuove anagrafiche integrative.')}
                       </p>
                       <p>
                        {this.props.t('home:Se invece disponi già di un tuo database e non vuoi acquistare duplicati, effettuiamo il matching tra il tuo database e il nostro.')}&nbsp;
                        {this.props.t('home:Il servizio ha un costo variabile sul numero di anagrafiche da analizzare.')}
                       &nbsp;<NavLink to="/contatti" className="text-skyblue">{this.props.t('home:Contattaci')}</NavLink> {this.props.t('home:per un preventivo gratuito.')}</p>
                      </div>
                    </div> 
                  </div>

               </div>
            </div>
            <div className="flex-lg-6 flex-md-6 flex-sm-12 pad10">
              <div className="accordion col-2 mtop20">
              <div>
                   <input className="step-chk" id="ac-2" name="accordion-2" type="checkbox"/>
	                 <label htmlFor="ac-2" className="accordion-title">{this.props.t('home:In che formato vengono forniti i dati?')}</label> 
                   <div className="ac-content">
                      <div className="pad10">
                       <p>
                         {this.props.t('home:Prepariamo il database in formato XLS')}:&nbsp;
                         {this.props.t('home:hai il controllo completo sulla manipolazione dei dati e puoi importarlo su tutti gli strumenti di invio disponibili sul mercato.')}
                        <br/>
                        {this.props.t('home:Le anagrafiche sono suddivise in colonne per ogni campo, così puoi ordinarle facilmente, trovare subito ciò che cerchi e importare solo i campi che ti servono.')}
                        </p>
                       </div>
                    </div> 
                  </div>
                  <div className="mtop20">
                   <input className="step-chk" id="ac-3" name="accordion-3" type="checkbox"/>
	                 <label htmlFor="ac-3" className="accordion-title">{this.props.t('home:Quali sono i tempi di consegna?')}</label> 
                   <div className="ac-content">
                      <div className="pad10">
                        <p>
                         {this.props.t('home:Prepariamo il tuo database in massimo 3 giorni dal ricevimento del pagamento, ma spesso ci bastano 24 ore.')}
                          <br/>
                          {this.props.t('home:I tempi di consegna possono variare a seconda dell\'entità del pacchetto e della durata di eventuali test di verifica.')}
                        </p>
                       </div>
                    </div> 
                  </div>
                  <div className="mtop20">
                   <input className="step-chk" id="ac-4" name="accordion-4" type="checkbox"/>
	                 <label htmlFor="ac-4" className="accordion-title">{this.props.t('home:Quali sono i costi?')}</label> 
                   <div className="ac-content">
                      <div className="pad10">
                      <p>{this.props.t('home:Il costo per ogni anagrafica (CPA) dipende dalla dimensione del pacchetto che acquisterai e varia da un massimo di 0,24 a un minimo di 0,06 euro + iva per anagrafica.')}</p>
	                  	<p>
                        {this.props.t('home:Esempio')}:&nbsp;
                        {this.props.t('home:una fornitura di 1.000 anagrafiche ha un CPA di 0,20 per un totale di 200,00 euro + Iva')}
                      </p>
                      <table className="table table-light">
                        <thead>
                          <tr>
                          <th>{this.props.t('home:Quantità di anagrafiche')}</th>
                          <th>{this.props.t('home:CPA in Euro (iva esclusa)')}</th>
                            </tr></thead>
                            <tbody>
                            <tr>
                            <td>0-499</td>
                            <td>0,24</td>
                                </tr>
                                  <tr>
                                    <td>500-999</td>
                                      <td>0,23</td>
                                      </tr>
                                  <tr>
                                  <td>1.000-1.999</td>
                                    <td>0,20</td>
                                      </tr>
                                      <tr>
                                    <td>2.000-2.999</td>
                                    <td>0,19</td>
                                      </tr>
                                      <tr>
                                    <td>3.000-3.999</td>
                                    <td>0,18</td>
                                      </tr>
                                      <tr>
                                    <td>4.000-4.999</td>
                                    <td>0,17</td>
                                      </tr>
                                      <tr>
                                    <td>5.000-5.999</td>
                                    <td>0,16</td>
                                      </tr>
                                      <tr>
                                    <td>6.000-6.999</td>
                                    <td>0,15</td>
                                      </tr><tr>
                                      <td>7.000-8.999</td>
                                    <td>0,14</td>
                                    </tr>
                                      <tr>
                                      <td>9.000-9.999</td>
                                    <td>0,13</td>
                                    </tr>
                                      <tr>
                                      <td>10.000-29.999</td>
                                    <td>0,12</td>
                                      </tr><tr>
                                      <td>30.000-39.999</td>
                                    <td>0,11</td>
                                    </tr>
                                      <tr>
                                      <td>40.000-59.999</td>
                                    <td>0,10</td>
                                    </tr>
                                      <tr>
                                      <td>60.000-79.999</td>
                                    <td>0,09</td>
                                      </tr>
                                      <tr>
                                    <td>80.000-99.999</td>
                                    <td>0,08</td>
                                      </tr>
                                      <tr>
                                    <td>100.000-129.999</td>
                                    <td>0,07</td>
                                      </tr>
                                      <tr>
                                    <td>{this.props.t('home:oltre')} 130.000</td>
                                    <td>0,06</td>
                                      </tr>
                                      </tbody>
                              </table>
                       </div>
                    </div> 
                  </div>
                  <div className="mtop20">
                   <input className="step-chk" id="ac-5" name="accordion-5" type="checkbox"/>
	                 <label htmlFor="ac-5" className="accordion-title">{this.props.t('home:Che tipo di comunicazione permette il database?')}</label> 
                   <div className="ac-content">
                      <div className="pad10">
                       <p>
                       {this.props.t('home:Qualsiasi sia l\'origine e la natura del dato, le normative stabiliscono che il "consenso" non è cedibile')}:&nbsp;
                       {this.props.t('home:per questa ragione per utilizzare un database di contatti acquisito da terzi, si è tenuti a ottenere riscontro e consenso per l\'invio di ulteriori comunicazioni promozionali.')}
                        </p>
                        <p>
                        {this.props.t('home:La richiesta del consenso rientra nell’ambito del Permission Marketing che, pur restando nel completo rispetto della normativa sulla Protezione dei Dati, consente alle aziende ampi margini sulla scelta di contenuti e creatività.')}
                        </p>
                        <p>
                        {this.props.t('home:Il Regolamento (UE) n. 2016/679 (conosciuto come GDPR) inoltre, ha introdotto il concetto di "legittimo interesse" del titolare quale base giuridica su cui valutare la liceità delle operazioni di trattamento di dati personali aggiungendo che "può essere considerato legittimo interesse trattare dati personali per finalità di marketing diretto".')}
                        </p>
                        <p>
                        {this.props.t('home:L\'invio dell\'informativa riguardante il trattamento dei dati personali (GDPR per l’Europa e/o Leggi Nazionali) in cui si richiede il consenso per l\'invio di materiale promozionale, è l\'occasione in cui potrai descrivere la tua azienda / servizio.')}&nbsp;
                        {this.props.t('home:Ti consigliamo di mantenere il carattere del tuo messaggio prettamente informativo, limitando enfatizzazioni commerciali.')}&nbsp;
                        {this.props.t('home:Includi sempre le istruzioni per richiedere i dati in tuo possesso, per richiedere la rimozione dalla lista (unsubscribe) e in generale per accedere ai propri diritti (accesso, rettifica, cancellazione, limitazione, opposizione al trattamento, portabilità).')}
                        </p>
                       </div>
                    </div> 
                  </div>
               </div>
            </div>
         </div>
         <div className="mtop50">&nbsp;</div>
        </div>
      </section>
      </React.Fragment>
    )
   }

}
export default withTranslation()(Home);