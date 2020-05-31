import React from "react";
import Modal from "../components/modal/Modal.js";
import Input from "../components/form/input.js";
import TextArea from "../components/form/textarea.js";
import Button from "../components/form/button.js";
import Checkbox  from "../components/form/checkbox.js";
import IndexedDb  from './../helpers/IndexedDb.js';
import StoreFormData from './../helpers/storeFormData.js';

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

export default class Quotes extends React.Component {

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
            'message' : "Impossibile salvare il form per l'invio: controlla i campi evidenziati in rosso!",
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
                Hai bisogno di profilazione avanzata? 
              </h2>
              <p className="text-white">
               Cerchi un target particolare? Scrivici! 
               Un commerciale Bancomail analizza il tuo target ed entro un giorno lavorativo ti dà tutti i dettagli che ti servono, compresa la quantità di anagrafiche disponibili. 
               Rispetto ai pacchetti disponibili online, i preventivi personalizzati consentono anche profilazioni avanzate: ad esempio forma sociale, fasce di fatturato, 
               numero di dipendenti, microcategorie, province e CAP, classificazione a stelle per gli hotel.    
              </p>
            </div>
           </div>
           <div className="flex-grid page-header mtop20">
            <div className="flex-lg-12 flex-md-12 flex-sm-12"> 
             <h3> Richiedi un preventivo gratuito</h3>
             <p>Se deciderai di concludere il tuo acquisto, avrai diritto a un 10% di sconto aggiuntivo (cumulabile con altre promozioni fino a un massimo del 50%)!</p>
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
              <h4>Spiegaci il tuo target:</h4>
                <Input 
                name="cosa" 
                placeholder="es. Ristoranti e alberghi" 
                label="Settore di interesse"
                required="Campo obbligatorio"
                inputRef={el => (this.what = el)}
                defaultValue={this.state.formData.cosa}
                getValue={ (element)=>{
                 form.addData('cosa', element.value);
                }}
                /> 
                <Input 
                name="dove" 
                placeholder="es. Italia, Sicilia" 
                label="Locazione geografica"
                required="Campo obbligatorio"
                inputRef={el => (this.where = el)}
                defaultValue={this.state.formData.dove}
                getValue={ (element)=>{
                 form.addData('dove', element.value);
                }}
                /> 
                <TextArea 
                   name="note"
                   label="Informazioni aggiuntive"
                   placeholder="Max. 2000 caratteri"
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
                <h4>Come contattarti?</h4>
                <Input 
                name="rsoc" 
                placeholder="es. Progetti Industriali di Mario Bianchi" 
                label="Ragione sociale"
                required="Campo obbligatorio"
                inputRef={el => (this.rsoc = el)}
                defaultValue={this.state.formData.rsoc}
                getValue={ (element)=>{
                 form.addData('rsoc', element.value);
                }}
                /> 
                <Input 
                name="nome" 
                placeholder="es. Mario Bianchi" 
                label="Nome contatto"
                required="Campo obbligatorio"
                inputRef={el => (this.nome = el)}
                defaultValue={this.state.formData.nome}
                getValue={ (element)=>{
                 form.addData('nome', element.value);
                }}
                /> 
                <Input 
                name="email" 
                placeholder="es. mario.bianchi@info.it" 
                label="Indirizzo email"
                required="Campo obbligatorio"
                inputRef={el => (this.email = el)}
                defaultValue={this.state.formData.email}
                getValue={ (element)=>{
                 form.addData('email', element.value);
                }}
                />
                <Input 
                name="tel" 
                placeholder="es. 0108446402" 
                label="Telefono"
                inputRef={el => (this.tel = el)}
                defaultValue={this.state.formData.tel}
                getValue={ (element)=>{
                 form.addData('tel', element.value);
                }}
                />
                <div className="cont pad10">
                  <Checkbox id="privacy-prev" inputRef={el => (this.privacyPrev = el)}>
                  Accetto la  <a href="/" className="text-blue" onClick={(e) => {
                    e.preventDefault();
                    this.props.history.push('/about/privacy-policy');
                  }}>normativa</a> della privacy*
                  </Checkbox>
                </div>
                <div className="cont mtop20">
                 <Button type="btn-blue center f-right">
                      SALVA
                 </Button> 
                </div>  
            </div>
          </form>
          :
          <div className="center mtop20">
           <i className="svg svg-small svg-ok"></i>
           <p>
           I dati sono stati salvati con successo! Non appena l'applicazione tornerà online, invieremo il tuo form. 
           Un commerciale Bancomail analizzerà il tuo target ed entro un giorno lavorativo ti darà tutti i dettagli che ti servono.
            </p>
          </div>
          }
         </div>
         :
         <div className="page-body">
         <div className="flex-grid">
          <div className="flex-lg-12 flex-md-12 flex-sm-12 center">
            <i className="svg svg-small svg-attention"></i>
            <p>Non è possibile inviare richieste di preventivo! Ci scusiamo per il disagio.</p>
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