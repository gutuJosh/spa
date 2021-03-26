import React from "react";
import Modal from "../components/modal/Modal.js";
import Input from "../components/form/input.js";
import TextArea from "../components/form/textarea.js";
import Button from "../components/form/button.js";
import Checkbox  from "../components/form/checkbox.js";
import IndexedDb  from '../helpers/IndexedDb.js';
import StoreFormData from '../helpers/storeFormData.js';
import "../config/i18n.js";
import { withTranslation } from "react-i18next";

const formData = {
  'nome' : '',
  'azienda' : '',
  'tel' : '',
  'email' : '',
  'note' : ''
}

const form = new StoreFormData('contactForm');
var formFileds = form.getData();

class Contact extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isRequestInfoActive: true,
        isFormSubmited : false,
        showModal : {
          'active' : false
        },
        formData: Object.keys(formFileds).length > 0 ? formFileds : formData
      }
      this.submitContactForm = this.submitContactForm.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    async componentDidMount(){
      const self = this;
      const catalog = new IndexedDb('BancomailAuxiliars');
      let getInfo = await catalog.requestData('requestInfo').catch( (response) =>{
        if(response.status === 'ko' && response.message === 'requestInfo is empty'){
          self.setState({
            isRequestInfoActive: false,
          });
        }
      });
      if(getInfo !== undefined && getInfo.values.length > 0){
        this.setState({
          isFormSubmited : true
        });
      }
      if(Object.keys(form.getData()).length > 0){
        this.setState({
          'formData': form.getData()
        });
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

    submitContactForm(event){
      event.preventDefault();
      const self = this;
      let errors = 0;
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
      if(this.note.value.trim() === ''){
        this.note.classList.add('input-error');
        this.note.nextSibling.classList.remove('hidden');
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
            'message' : this.props.t("checkout:Impossibile salvare il form per l'invio! Controlla i campi evidenziati in rosso!"),
            'btn' : 'btn-red',
            'btnTxt' : 'OK',
             'icn' : 'svg-nope'
          }
        });
     }
     else{
       let data = {
          'nome' : this.nome.value.trim(),
          'azienda' : this.azienda.value.trim(),
          'note' : this.note.value.trim(),
          'email' : this.email.value.trim(),
          'tel' : this.tel.value.trim()
       }

      let d = new Date();
      let month = d.getMonth() < 9 ? '0'+(d.getMonth() +1) : (d.getMonth() +1);
      data['date'] = `${d.getDate()}-${month}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      this.refs.contactForm.reset();
      const catalog = new IndexedDb('BancomailAuxiliars');
    
      catalog.storeData('requestInfo', data).then( (response) => {
        if(response.status === 'ok'){
          self.setState({
            isFormSubmited : true
          });
         form.clearData('contactForm');
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
               {this.props.t('contact:Qualunque cosa tu voglia dirci noi vogliamo ascoltarla')}  
              </h2>
              <p className="text-white">
              {this.props.t('contact:Se hai fretta o vuoi sentire la nostra voce, puoi prenotare una richiamata oppure chiamaci al')}:  
              <a href="/" className="text-white" onClick={(event) => {
                event.preventDefault();
                window.location='tel:390108681372';
              }}>
               &nbsp;+39 010-8681372
               </a> o al:  
               <a href="/" className="text-white" onClick={(event) => {
                event.preventDefault();
                window.location='tel:39010844640';
              }}>
                &nbsp;+39 010-8446402.
                </a>
              <br/>
              {this.props.t('contact:Se hai bisogno di informazioni o se vuoi richiederci un preventivo oppure proporci una collaborazione')}:
              </p>
            </div>
           </div>
           <div className="flex-grid page-header mtop20">
            <div className="flex-lg-12 flex-md-12 flex-sm-12"> 
             <h3>{this.props.t('contact:Parliamo italiano, inglese, francese e spagnolo.')}</h3>
            </div>
           </div>
         </div>
       </section>
       <section>
        <div className="wrapper">
        {this.state.isRequestInfoActive === true ? 
         <div className="page-body">
           {this.state.isFormSubmited === false ?
          <form className="form form-big flex-grid contactForm" method="post" action="/" ref="contactForm" onSubmit={this.submitContactForm}>
            <div className="flex-lg-6 flex-md-6 flex-sm-12">
                <Input 
                name="nome" 
                placeholder={this.props.t("checkout:es. Mario Bianchi")} 
                label={this.props.t("contact:Nome contatto")}
                required={this.props.t("checkout:Campo obbligatorio")}
                inputRef={el => (this.nome = el)}
                defaultValue={this.state.formData.nome}
                getValue={ (element)=>{
                 form.addData('nome', element.value);
                }}
                /> 
                <Input 
                name="azienda" 
                placeholder={this.props.t("checkout:es. Progetti Industriali di Mario Bianchi")} 
                label={this.props.t("contact:Azienda")}
                inputRef={el => (this.azienda = el)}
                defaultValue={this.state.formData.azienda}
                getValue={ (element)=>{
                 form.addData('azienda', element.value);
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
                placeholder={this.props.t("es. 0108446402")} 
                label={this.props.t("checkout:Telefono")}
                inputRef={el => (this.tel = el)}
                defaultValue={this.state.formData.tel}
                getValue={ (element)=>{
                 form.addData('tel', element.value);
                }}
                />

               
            </div>
            <div className="flex-lg-6 flex-md-6 flex-sm-12">
                  <TextArea 
                   name="note"
                   label={this.props.t("contact:Informazioni aggiuntive")}
                   placeholder={this.props.t("contact:Max. 2000 caratteri")}
                   maxlength="2000"
                   inputRef={el => (this.note = el)}
                   required={this.props.t("checkout:Campo obbligatorio")}
                   style={{height:"236px"}}
                   defaultValue={this.state.formData.note}
                   getValue={ (value)=>{
                    form.addData('note', value);
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
           {this.props.t('contact:I dati sono stati salvati con successo! Non appena l\'applicazione tornerà online, invieremo il tuo form.')} &nbsp;
           {this.props.t('contact:Riceverai una risposta da parte di un nostro operatore entro 48 ore lavorative!')}
            </p>
          </div>
          }
         </div>
         :
         <div className="page-body">
            <div className="flex-grid">
             <div className="flex-lg-12 flex-md-12 flex-sm-12 center">
               <i className="svg svg-small svg-attention"></i>
               <p>{this.props.t('contact:Non è possibile inviare richieste informazioni! Ci scusiamo per il disagio.')}</p>
             </div>
            </div>
         </div>
         }
         <div className="page-footer">
                 &nbsp;
         </div>
        </div>
       </section>
       <section className="section">
          <div className="wrapper">
           <div className="flex-grid">
            <div className="flex-lg-4 flex-md-4 flex-sm-12 center">
              <p>
              {this.props.t('contact:Richieste generiche o di supporto')}:
                <br/>
               <a href="mailto:info@bancomail.it" className="text-skyblue">info@bancomail.it</a>
               <br/>
               <a href="mailto:support@bancomail.it" className="text-skyblue">support@bancomail.it</a>
              </p>
            </div>
            <div className="flex-lg-4 flex-md-4 flex-sm-12 center">
             <p>
             {this.props.t('contact:Richieste di preventivo o amministrative')}:
                <br/>
               <a href="mailto:commerciale@bancomail.it" className="text-skyblue">commerciale@bancomail.it</a>
               <br/>
               <a href="mailto:amministrazione@bancomail.it" className="text-skyblue">amministrazione@bancomail.it</a>
              </p>
            </div>
            <div className="flex-lg-4 flex-md-4 flex-sm-12 center">
               <p>
               {this.props.t('contact:Marketing e Web')}:
                <br/>
               <a href="mailto:marketing@bancomail.it" className="text-skyblue">marketing@bancomail.it</a>
              </p>
            </div>
          </div>
          <div className="flex-grid mtop50">&nbsp;</div>
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
export default withTranslation()(Contact);