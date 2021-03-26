import React from "react";
import Modal from "../components/modal/Modal.js";
import Input from "../components/form/input.js";
import TextArea from "../components/form/textarea.js";
import Button from "../components/form/button.js";
import Checkbox  from "../components/form/checkbox.js";
import IndexedDb  from './../helpers/IndexedDb.js';
import StoreFormData from './../helpers/storeFormData.js';
import "../config/i18n.js";
import { withTranslation } from "react-i18next";

const formData = {
  'cosa' : '',
  'dove' : '',
  'nome' : '',
  'rsoc' : '',
  'tel' : '',
  'email' : '',
  'note' : ''
}

const form = new StoreFormData('prevForm');
var formFileds = form.getData();

class Quotes extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isQuoteRequestActive: true,
        isFormSubmited : false,
        showModal : {
          'active' : false
        },
        formData: Object.keys(formFileds).length > 0 ? formFileds : formData
      }
      this.submitPrevForm = this.submitPrevForm.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    async componentDidMount(){
      try{
       window.scrollTo(0,0);
      }
      catch(e){
        //console.log(e.message);
      }
      const self = this;
      const catalog = new IndexedDb('BancomailAuxiliars');
      let getQuote = await catalog.requestData('quote').catch (response => {
        if(response.status === 'ko' && response.message === 'quote is empty'){
          self.setState({
            isQuoteRequestActive: false,
          });
        }
      });
      if(getQuote !== undefined && getQuote.values.length > 0){
        this.setState({
          isFormSubmited : true
        });
      }
      if(Object.keys(form.getData()).length > 0){
        this.setState({
          'formData': form.getData()
        })
      }
    }

    componentWillUnmount(){
      try{
        window.scrollTo(0,0);
       }
       catch(e){
         //console.log(e.message);
       }
      formFileds = form.getData();
    }

    submitPrevForm(event){
      event.preventDefault();
      let errors = 0;
      const self = this;
      if(this.what.value.trim() === ''){
        this.what.classList.add('input-error');
        this.what.nextSibling.classList.remove('hidden');
        errors++;
      }
      if(this.where.value.trim() === ''){
        this.where.classList.add('input-error');
        this.where.nextSibling.classList.remove('hidden');
        errors++;
      }
      if(this.rsoc.value.trim() === ''){
        this.rsoc.classList.add('input-error');
        this.rsoc.nextSibling.classList.remove('hidden');
        errors++;
      }
      if(this.nome.value.trim() === ''){
        this.nome.classList.add('input-error');
        this.nome.nextSibling.classList.remove('hidden');
        errors++;
      }
      if(this.email.value.trim() === ''){
        this.email.classList.add('input-error');
        this.email.nextSibling.classList.remove('hidden');
        errors++;
      }
      if(this.privacyPrev.checked === false){
        this.privacyPrev.nextSibling.classList.add('input-error');
        errors++;
      }

      if(errors > 0){
        this.setState({
          showModal : {
            'active' : true,
            'message' : this.props.t("Impossibile salvare il form per l'invio! Controlla i campi evidenziati in rosso!"),
            'btn' : 'btn-red',
            'btnTxt' : 'OK',
             'icn' : 'svg-nope'
          }
        });
     }
     else{
       let data = {
          'cosa' : this.what.value.trim(),
          'dove' : this.where.value.trim(),
          'note' : this.note.value.trim(),
          'rsoc' : this.rsoc.value.trim(),
          'nome' : this.nome.value.trim(),
          'email' : this.email.value.trim(),
          'tel' : this.tel.value.trim()
       }

      let d = new Date();
      let month = d.getMonth() < 9 ? '0'+(d.getMonth() +1) : (d.getMonth() +1);
      data['date'] = `${d.getDate()}-${month}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      this.refs.prevForm.reset();
      const catalog = new IndexedDb('BancomailAuxiliars');
      catalog.storeData('quote', data).then( (response) => {
        if(response.status === 'ok'){
          self.setState({
            isFormSubmited : true
          });
          form.clearData('prevForm');
        }
      });
     }

    }

    closeModal(){
      this.setState({
        showModal : {
          'active' : false
        }
      });
     }

    render(){
        return(
          <React.Fragment>
            <section className="section screen-blue">
         <div className="wrapper">
           <div className="flex-grid">
            <div className="flex-lg-12 flex-md-12 flex-sm-12">
              <h2 className="text-white">
                {this.props.t("quotes:Hai bisogno di profilazione avanzata?")}
              </h2>
              <p className="text-white">
              {this.props.t('quotes:Cerchi un target particolare?')}  {this.props.t('quotes:Scrivici!')}&nbsp;
                {this.props.t('quotes:Un commerciale Bancomail analizza il tuo target ed entro un giorno lavorativo ti dà tutti i dettagli che ti servono, compresa la quantità di anagrafiche disponibili.')}&nbsp;
                {this.props.t('quotes:Rispetto ai pacchetti disponibili online, i preventivi personalizzati consentono anche profilazioni avanzate')}: {this.props.t('quotes:ad esempio forma sociale, fasce di fatturato, numero di dipendenti, microcategorie, province e CAP, classificazione a stelle per gli hotel.')}    
              </p>
            </div>
           </div>
           <div className="flex-grid page-header mtop20">
            <div className="flex-lg-12 flex-md-12 flex-sm-12"> 
             <h3>{this.props.t('quotes:Richiedi un preventivo gratuito')}</h3>
             <p>{this.props.t('quotes:Se deciderai di concludere il tuo acquisto, avrai diritto a un 10% di sconto aggiuntivo (cumulabile con altre promozioni fino a un massimo del 50%)!')}</p>
            </div>
           </div>
         </div>
       </section>
       <section>
        <div className="wrapper">
        {this.state.isQuoteRequestActive === true ? 
         <div className="page-body">
           {this.state.isFormSubmited === false ?
          <form className="form form-big flex-grid prevForm" method="post" action="/" ref="prevForm" onSubmit={this.submitPrevForm}>
            <div className="flex-lg-6 flex-md-6 flex-sm-12">
              <h4> {this.props.t('quotes:Spiegaci il tuo target')}:</h4>
                <Input 
                name="cosa" 
                placeholder= {this.props.t("quotes:es. Ristoranti e alberghi")} 
                label={this.props.t("quotes:Settore di interesse")}
                required= {this.props.t("checkout:Campo obbligatorio")}
                inputRef={el => (this.what = el)}
                defaultValue={this.state.formData.cosa}
                getValue={ (element)=>{
                 form.addData('cosa', element.value);
                }}
                /> 
                <Input 
                name="dove" 
                placeholder= {this.props.t("quotes:es. Italia, Sicilia")} 
                label= {this.props.t("quotes:Locazione geografica")}
                required= {this.props.t("checkout:Campo obbligatorio")}
                inputRef={el => (this.where = el)}
                defaultValue={this.state.formData.dove}
                getValue={ (element)=>{
                 form.addData('dove', element.value);
                }}
                /> 
                <TextArea 
                   name="note"
                   label= {this.props.t("contact:Informazioni aggiuntive")}
                   placeholder= {this.props.t("contact:Max. 2000 caratteri")}
                   maxlength="2000"
                   inputRef={el => (this.note = el)}
                   style={{height:"144px"}}
                   defaultValue={this.state.formData.note}
                   getValue={ (value)=>{
                    form.addData('note', value);
                   }}

                />
               
            </div>
            <div className="flex-lg-6 flex-md-6 flex-sm-12">
                <h4>{this.props.t('quotes:Come contattarti?')}</h4>
                <Input 
                name="rsoc" 
                placeholder={this.props.t("checkout:es. Progetti Industriali di Mario Bianchi")} 
                label={this.props.t("quotes:Ragione sociale")}
                required={this.props.t("checkout:Campo obbligatorio")}
                inputRef={el => (this.rsoc = el)}
                defaultValue={this.state.formData.rsoc}
                getValue={ (element)=>{
                 form.addData('rsoc', element.value);
                }}
                /> 
                <Input 
                name="nome" 
                placeholder={this.props.t("checkout:es. Mario Bianchi")} 
                label={this.props.t("checkout:Nome contatto")}
                required={this.props.t("checkout:Campo obbligatorio")}
                inputRef={el => (this.nome = el)}
                defaultValue={this.state.formData.nome}
                getValue={ (element)=>{
                 form.addData('nome', element.value);
                }}
                /> 
                <Input 
                name="email" 
                placeholder={this.props.t("contact:es. mario.bianchi@info.it")} 
                label={this.props.t("checkout:Indirizzo email")}
                required={this.props.t("checkout:Campo obbligatorio")}
                inputRef={el => (this.email = el)}
                defaultValue={this.state.formData.email}
                getValue={ (element)=>{
                 form.addData('email', element.value);
                }}
                />
                <Input 
                name="tel" 
                placeholder={this.props.t("checkout:es.") + " 0108446402"} 
                label={this.props.t("checkout:Telefono")}
                inputRef={el => (this.tel = el)}
                defaultValue={this.state.formData.tel}
                getValue={ (element)=>{
                 form.addData('tel', element.value);
                }}
                />
                <div className="cont pad10">
                  <Checkbox id="privacy-prev" inputRef={el => (this.privacyPrev = el)}>
                  {this.props.t('checkout:Accetto la')}  <a href="/" className="text-blue" onClick={(e) => {
                    e.preventDefault();
                    this.props.history.push('/about/privacy-policy');
                  }}>{this.props.t('checkout:normativa')}</a> {this.props.t('checkout:della privacy')}*
                  </Checkbox>
                </div>
                <div className="cont mtop20">
                 <Button type="btn-blue center f-right">
                 {this.props.t('checkout:SALVA')}
                 </Button> 
                </div>  
            </div>
          </form>
          :
          <div className="center mtop20">
           <i className="svg svg-small svg-ok"></i>
           <p>
           {this.props.t('quotes:I dati sono stati salvati con successo!')}&nbsp;{this.props.t('quotes:Non appena l\'applicazione tornerà online, invieremo il tuo form.')}&nbsp;
           {this.props.t('quotes:Un commerciale Bancomail analizzerà il tuo target ed entro un giorno lavorativo ti darà tutti i dettagli che ti servono.')}
            </p>
          </div>
          }
         </div>
         :
         <div className="page-body">
         <div className="flex-grid">
          <div className="flex-lg-12 flex-md-12 flex-sm-12 center">
            <i className="svg svg-small svg-attention"></i>
            <p>{this.props.t('Non è possibile inviare richieste di preventivo! Ci scusiamo per il disagio.')}</p>
          </div>
         </div>
      </div>
        }
         <div className="page-footer">
                 &nbsp;
         </div>
        </div>
       </section>
       <Modal 
        status={this.state.showModal} 
        handleModal={this.closeModal.bind(this)}
      />
    </React.Fragment>
        )
    }
}
export default withTranslation()(Quotes);