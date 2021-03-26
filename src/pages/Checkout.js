import React from "react";
import BackBtn from "../components/back-button/BackBtn.js";
import Input from "../components/form/input.js";
import Select from "../components/form/select.js";
import Switcher from "../components/form/switcher.js";
import TextArea from "../components/form/textarea.js";
import RadioBtn from "../components/form/radioBtn.js";
import Checkbox  from "../components/form/checkbox.js";
import Button from "../components/form/button.js";
import Nations from "../config/nations";
import Warning from "../components/checkout/OfflineWarning.js";
import OrderSummary from "../components/checkout/OrderSummary.js";
import OrderSavedMessage from "../components/checkout/OrderSavedMessage.js";
import Modal from "../components/modal/Modal.js";
import IndexedDb from './../helpers/IndexedDb.js';
import StoreFormData from './../helpers/storeFormData.js';
import "../config/i18n.js";
import { withTranslation } from "react-i18next";

const formData = {
  'ragione_sociale' : '',
  'nome_contatto' : '',
  'indirizzo' : '',
  'cap' : '',
  'citta' : '',
  'nazione' : '',
  'telefono' : '',
  'email_principale' : '',
  'email_principale2' : '',
  'F_ragione_sociale' : '',
  'F_indirizzo' : '',
  'F_cap' : '',
  'F_citta' : '',
  'F_nazione' : '',
  'note' : '',
  'payment' : ''
}

const form = new StoreFormData('checkoutForm');
var formFileds = form.getData();

class Checkout extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
         invoiceCountry : false,
         showModal: {
          'active' : false,
          'message' : this.props.t("checkout:Impossibile salvare il form per l'invio! Controlla i campi evidenziati in rosso!"),
          'btn' : 'btn-red',
          'btnTxt' : 'OK',
          'icn' : 'svg-nope'
        },
        formData: Object.keys(formFileds).length > 0 ? formFileds : formData,
        cart : false,
        formStatus : null,
        catalog: null
      }
      this.copyData = this.copyData.bind(this);
      this.saveData = this.saveData.bind(this);
    
    }

    async componentDidMount(){
      const self = this;
      const catalog = new IndexedDb('BancomailAuxiliars');
      let cart = await catalog.requestData('cart');
      for(let i = 0; i < cart.values.length; i++){
        if(cart.values[i].pi === 1 && cart.values[i].owner !== undefined){
            cart.values.splice(i,1);
            break;
        }
      }
      if(cart.values.length === 0){
         this.props.history.push('/');
      }
      else{
       
        this.setState({
          'cart': cart.values,
          'formData': Object.keys(form.getData()).length > 0 ? form.getData() : formData,
        }, ()=>{
          catalog.requestData('checkout').then( (response) => {
            if(response.values.length > 0){
              self.setState({'formStatus' : 'saved'});
            }
          });
        });
      }
      try{
        window.scrollTo(0,0);
       }
       catch(e){
         //console.log(e.message);
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


   

    copyData(status){
       let errors = 0;
       const form = new StoreFormData('checkoutForm');
       if(status === true){
          if(this.ragioneSociale.value !== ''){
                this.ragioneSocialeF.value = this.ragioneSociale.value;
                form.addData('F_ragione_sociale',  this.ragioneSociale.value);
          }
          else{
              this.ragioneSociale.classList.add('input-error');
              this.ragioneSociale.nextSibling.classList.remove('hidden');
              errors++;
          }
        
          if(this.indirizzo.value !== ''){
            this.indirizzoF.value = this.indirizzo.value;
            form.addData('F_indirizzo', this.indirizzo.value);
          }
          else{
            this.indirizzo.classList.add('input-error');
            this.indirizzo.nextSibling.classList.remove('hidden');
            errors++;
          }
          if(this.cap.value !== ''){
            this.capF.value = this.cap.value;
            form.addData('F_cap', this.cap.value);
          }
          else{
            this.cap.classList.add('input-error');
            this.cap.nextSibling.classList.remove('hidden');
            errors++;
          }
          if(this.citta.value !== ''){
            this.cittaF.value = this.citta.value;
            form.addData('F_citta', this.citta.value);
          }
          else{
            this.citta.classList.add('input-error');
            this.citta.nextSibling.classList.remove('hidden');
            errors++;
          }
          if(this.nazione.value !== ''){
            this.nazioneF.selectedIndex = this.nazione.selectedIndex;
            form.addData('F_nazione', this.nazione.value);
          }
          else{
            this.nazione.classList.add('input-error');
            this.nazione.parentNode.nextSibling.classList.remove('hidden');
            errors++;
          }
       }
       else{
         this.ragioneSocialeF.value = '';
         this.indirizzoF.value = '';
         this.capF.value = '';
         this.cittaF.value = '';
         this.nazioneF.selectedIndex = 0;
         form.addData('F_ragione_sociale', '');
         form.addData('F_indirizzo', '');
         form.addData('F_cap', '');
         form.addData('F_citta', '');
         form.addData('F_nazione','');
       }

       return errors;
    }

    saveData(event){
        event.preventDefault();
        let errors = 0;
        const data = {}
        const self = this;
        if(this.ragioneSociale.value.trim() !== ''){
          data[this.ragioneSociale.name] = this.ragioneSociale.value;
        }
        else{
         this.ragioneSociale.classList.add('input-error');
         this.ragioneSociale.nextSibling.classList.remove('hidden');
         errors++;
        }
        if(this.nomeContatto.value.trim() !== ''){
          data[this.nomeContatto.name] = this.nomeContatto.value;
        }
        else{
         this.nomeContatto.classList.add('input-error');
         this.nomeContatto.nextSibling.classList.remove('hidden');
         errors++;
        }
        if(this.indirizzo.value !== ''){
          data[this.indirizzo.name] = this.indirizzo.value;
        }
        else{
          this.indirizzo.classList.add('input-error');
          this.indirizzo.nextSibling.classList.remove('hidden');
          errors++;
        }
        if(this.cap.value !== ''){
          data[this.cap.name] = this.cap.value;
        }
        else{
          this.cap.classList.add('input-error');
          this.cap.nextSibling.classList.remove('hidden');
          errors++;
        }
        if(this.citta.value !== ''){
          data[this.citta.name] = this.citta.value;
        }
        else{
          this.citta.classList.add('input-error');
          this.citta.nextSibling.classList.remove('hidden');
          errors++;
        }
        if(this.nazione.value !== ''){
          data[this.nazione.name] = this.nazione.value;
        }
        else{
          this.nazione.classList.add('input-error');
          this.nazione.parentNode.nextSibling.classList.remove('hidden');
          errors++;
        }
        if(this.telefono.value !== ''){
          data[this.telefono.name] = this.telefono.value;
        }
        if(this.fax.value !== ''){
          data[this.fax.name] = this.fax.value;
        }
        if(this.emailPrincipale.value.trim() !== '' && 
           this.emailPrincipale.value.indexOf('@') !== -1 && 
           this.emailPrincipale.value.indexOf('.') !== -1)
        {
          data[this.emailPrincipale.name] = this.emailPrincipale.value;
        }
        else{
          this.emailPrincipale.classList.add('input-error');
          this.emailPrincipale.nextSibling.classList.remove('hidden');
          errors++;
        }
        if(this.emailPrincipale2.value.trim() !== '' &&  this.emailPrincipale.value === this.emailPrincipale2.value)
        {
          data[this.emailPrincipale2.name] = this.emailPrincipale2.value;
        }
        else{
          this.emailPrincipale2.classList.add('input-error');
          this.emailPrincipale2.nextSibling.classList.remove('hidden');
          errors++;
        }
        if(this.ragioneSocialeF.value.trim() !== ''){
          data[this.ragioneSocialeF.name] = this.ragioneSocialeF.value;
        }
        else{
         this.ragioneSocialeF.classList.add('input-error');
         this.ragioneSocialeF.nextSibling.classList.remove('hidden');
         errors++;
        }
        if(this.indirizzoF.value.trim() !== ''){
          data[this.indirizzoF.name] = this.indirizzoF.value;
        }
        else{
          this.indirizzoF.classList.add('input-error');
          this.indirizzoF.nextSibling.classList.remove('hidden');
          errors++;
        }
        if(this.capF.value.trim() !== ''){
          data[this.capF.name] = this.cap.value;
        }
        else{
          this.capF.classList.add('input-error');
          this.capF.nextSibling.classList.remove('hidden');
          errors++;
        }
        if(this.cittaF.value.trim() !== ''){
          data[this.cittaF.name] = this.cittaF.value;
        }
        else{
          this.cittaF.classList.add('input-error');
          this.cittaF.nextSibling.classList.remove('hidden');
          errors++;
        }
        if(this.nazioneF.value !== ''){
           data[this.nazioneF.name] = this.nazioneF.value;
        }
        else{
          this.nazioneF.classList.add('input-error');
          this.nazioneF.parentNode.nextSibling.classList.remove('hidden');
          errors++;
        }
        if(this.note.value.trim() !== ''){
          data[this.note.name] = this.note.value;
        }
        if(this.paymentBS.checked){
          data['payment'] = "BS";
        }
        else if(this.paymentPP.checked){
          data['payment'] = "PP";
        }
        else{
          data['payment'] = "BB";
        }
        if(this.privacyPrev.checked === false){
          this.privacyPrev.nextSibling.classList.add('input-error');
          errors++;
        }

        if(errors > 0){
           let modal = this.state.showModal;
           modal.active = true;
           this.setState({
             showModal : modal
           });
        }
        else {
          let d = new Date();
          let month = d.getMonth() < 9 ? '0'+(d.getMonth() +1) : (d.getMonth() +1);
          data['date'] = `${d.getDate()}-${month}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
          data['cart'] = this.state.cart;
          this.refs.checkoutForm.reset();
          const catalog = new IndexedDb('BancomailAuxiliars');
          catalog.storeData('checkout', data).then( (response) => {
            if(response.status === 'ok'){
               catalog.clearAll('cart').then( (response) => {
                  if(response.status === 'ok'){
                     document.querySelector('#carrello').innerHTML = 0;
                  }
               });
               self.setState({
                  formStatus : 'saved'
               });
               form.clearData('checkoutForm');
            }
          });
        }
    }

    closeModal(){
      let modal = this.state.showModal;
      modal.active = false;
      this.setState({
        showModal : modal
      });
    }

    render(){
     
        return(
          <React.Fragment>
            <section className="section mtop0 screen-blue">
             <div className="wrapper">
              <div className="flex-grid">
                <div className="flex-lg-12 flex-md-12 flex-sm-12">
                 <h1 className="text-white">{this.props.t('checkout:Concludi l\'ordine')}</h1>
                </div>
                </div>
                <div className="flex-grid page-header mtop10">
                 <div className="flex-lg-12 flex-md-12 flex-sm-12">
                    <BackBtn/>
                 </div>
                </div>
              </div>
             </section>
             <section>
              <div className="wrapper">
              {this.state.formStatus === null ?
               <div className="page-body">
                <div className="flex-grid mtop20">
                 <div className="flex-lg-12 flex-md-12 flex-sm-12">
                   <Warning/>
                 </div>
                </div>
                <form className="form form-big flex-grid checkout-form mtop20" ref="checkoutForm" onSubmit={this.saveData}>
                 <div className="flex-lg-4 flex-md-4 flex-sm-12">
                   <h3>{this.props.t('checkout:Dati anagrafici')}:</h3>
                  <Input 
                   name="ragione_sociale" 
                   placeholder={this.props.t("checkout:es. Progetti Industriali di Mario Bianchi")} 
                   label={this.props.t("checkout:Ragione sociale")}
                   required={this.props.t("checkout:Campo obbligatorio")}
                   defaultValue={this.state.formData.ragione_sociale}
                   inputRef={el => (this.ragioneSociale = el)}
                   getValue={ (element)=>{
                    form.addData('ragione_sociale', element.value);
                   }}
                   /> 
                   <Input 
                   name="nome_contatto" 
                   placeholder={this.props.t("checkout:es. Mario Bianchi")} 
                   label={this.props.t("checkout:Nome contatto")}
                   required={this.props.t("checkout:Campo obbligatorio")}
                   defaultValue={this.state.formData.nome_contatto}
                   inputRef={el => (this.nomeContatto = el)}
                   getValue={ (element)=>{
                    form.addData('nome_contatto', element.value);
                   }}
                   /> 
                   <Input 
                   name="indirizzo" 
                   placeholder={this.props.t("checkout:via, numero civico")} 
                   label={this.props.t("checkout:Indirizzo")}
                   required={this.props.t("checkout:Campo obbligatorio")}
                   defaultValue={this.state.formData.indirizzo}
                   inputRef={el => (this.indirizzo = el)}
                   getValue={ (element)=>{
                    form.addData('indirizzo', element.value);
                   }}
                   /> 
                   <Input 
                   name="cap" 
                   placeholder={this.props.t("checkout:numerico")}
                   label={this.props.t("checkout:Codice postale(CAP)")} 
                   required={this.props.t("checkout:Campo obbligatorio")}
                   defaultValue={this.state.formData.cap}
                   inputRef={el => (this.cap = el)}
                   getValue={ (element)=>{
                    form.addData('cap', element.value);
                   }}
                   /> 
                  <Input 
                   name="citta" 
                   placeholder={this.props.t("checkout:es. Genova")} 
                   label={this.props.t("checkout:Città")}
                   required={this.props.t("checkout:Campo obbligatorio")}
                   inputRef={el => (this.citta = el)}
                   defaultValue={this.state.formData.citta}
                   getValue={ (element)=>{
                    form.addData('citta', element.value);
                   }}
                   /> 
                   <Select 
                   name="nazione"
                   label={this.props.t("Seleziona la nazione")}
                   values={Nations}
                   required={this.props.t("checkout:Campo obbligatorio")} 
                   inputRef={el => (this.nazione = el)}
                   defaultValue={this.state.formData.nazione}
                   handleChange={ (value)=>{
                    form.addData('nazione', value);
                   }}
                   />
                   <Input 
                   name="telefono" 
                   placeholder={this.props.t("checkout:fisso o mobile")} 
                   label={this.props.t("checkout:Telefono")} 
                   inputRef={el => (this.telefono = el)}
                   defaultValue={this.state.formData.telefono}
                   getValue={ (element)=>{
                    form.addData('telefono', element.value);
                   }}
                   /> 
                  <Input 
                   name="fax" 
                   placeholder={this.props.t("checkout:numero di fax")} 
                   label="Fax" 
                   inputRef={el => (this.fax = el)}
                   defaultValue={this.state.formData.fax}
                   getValue={ (element)=>{
                    form.addData('fax', element.value);
                   }}
                   />
                   <Input 
                   name="email_principale" 
                   placeholder="mario.bianchi@mail.com" 
                   label={this.props.t("checkout:Indirizzo email")} 
                   required={this.props.t("checkout:Campo obbligatorio")}
                   inputRef={el => (this.emailPrincipale = el)}
                   defaultValue={this.state.formData.email_principale}
                   getValue={ (element)=>{
                    form.addData('email_principale', element.value);
                   }}
                   />
                  <Input 
                   name="email_principale2" 
                   placeholder="mario.bianchi@mail.com" 
                   label={this.props.t("checkout:Ripeti email")} 
                   required={this.props.t("checkout:Campo obbligatorio")}
                   inputRef={el => (this.emailPrincipale2 = el)}
                   defaultValue={this.state.formData.email_principale2}
                   getValue={ (element)=>{
                    form.addData('email_principale2', element.value);
                   }}
                   />
                   
                 </div>
                 <div className="flex-lg-4 flex-md-4 flex-sm-12">
                 <h3>
                    <span className="ttip-large" data-ttip={this.props.t("checkout:Risparmia tempo") + ":" + this.props.t("checkout:usa i dati anagrafici per la fatturazione")}>
                    <Switcher id="sw2" type="nblue" handleSwitcher={this.copyData}/>
                   </span>
                    &nbsp;&nbsp;{this.props.t("checkout:Dati di fatturazione")}:
                   </h3>
                  <Input 
                   name="F_ragione_sociale" 
                   placeholder={this.props.t("checkout:es. Progetti Industriali di Mario Bianchi")} 
                   label={this.props.t("checkout:Ragione sociale")}
                   required={this.props.t("checkout:Campo obbligatorio")}
                   inputRef={el => (this.ragioneSocialeF = el)}
                   defaultValue={this.state.formData.F_ragione_sociale}
                   getValue={ (element)=>{
                    form.addData('F_ragione_sociale', element.value);
                   }}
                   /> 
                  <Input 
                   name="F_indirizzo" 
                   placeholder={this.props.t("checkout:via, numero civico")} 
                   label={this.props.t("checkout:Indirizzo")}
                   required={this.props.t("checkout:Campo obbligatorio")}
                   inputRef={el => (this.indirizzoF = el)}
                   defaultValue={this.state.formData.F_indirizzo}
                   getValue={ (element)=>{
                    form.addData('F_indirizzo', element.value);
                   }}
                   /> 
                   <Input 
                   name="F_cap" 
                   placeholder={this.props.t("checkout:numerico")} 
                   label={this.props.t("checkout:Codice postale(CAP)")} 
                   required={this.props.t("checkout:Campo obbligatorio")}
                   inputRef={el => (this.capF = el)}
                   defaultValue={this.state.formData.F_cap}
                   getValue={ (element)=>{
                    form.addData('F_cap', element.value);
                   }}
                   /> 
                  <Input 
                   name="F_citta" 
                   placeholder={this.props.t("checkout:es. Genova")} 
                   label={this.props.t("checkout:Città")} 
                   required={this.props.t("checkout:Campo obbligatorio")}
                   inputRef={el => (this.cittaF = el)}
                   defaultValue={this.state.formData.F_citta}
                   getValue={ (element)=>{
                    form.addData('F_citta', element.value);
                   }}
                   /> 
                   <Select 
                   name="F_nazione"
                   label={this.props.t("Seleziona la nazione")}
                   required={this.props.t("checkout:Campo obbligatorio")}
                   values={Nations}
                   inputRef={el => (this.nazioneF = el)}
                   defaultValue={this.state.formData.F_nazione}
                   handleChange={ (value)=>{
                    form.addData('F_cap', value);
                   }}
                   />
                   <TextArea 
                   name="note"
                   label={this.props.t("checkout:Note")}
                   placeholder={this.props.t("checkout:Max. 255 cartteri")}
                   maxlength="255"
                   inputRef={el => (this.note = el)}
                   defaultValue={this.state.formData.note}
                   getValue={ (value)=>{
                    form.addData('note', value);
                   }}
                   />
                 </div>
                 <div className="flex-lg-4 flex-md-4 flex-sm-12">
                  <h3>{this.props.t('checkout:Metodo di pagamento')}:</h3>
                  <OrderSummary 
                   items={this.state.cart} 
                   invoiceCountry={this.state.invoiceCountry}
                   /> 
      
                  <div className="cont mtop10 alert alert-yellow">
                   <p className="small pad5">
                   {this.props.t('checkout:Hai un coupon o uno sconto riservato?')} 
                     {this.props.t('checkout:Potrai aggiungerlo in modalità online prima di concludere il tuo ordine.')}
                   </p>
                  </div>
                 
                   <h4 className="mtop20">{this.props.t('checkout:Seleziona modalità di pagamento')}:</h4>
                   <p className="small">{this.props.t('checkout:Potrai effettuare il pagamento una volta ripristinata la connessione.')}</p>
                   <hr/>
                   <div className="cont pad10">
                     <RadioBtn 
                      name="payment"  
                      id="pay1" 
                      label={this.props.t("checkout:Carta di credito (Banca Sella)")} 
                      inputRef={el => (this.paymentBS = el)}
                      value="BS"
                      isChecked={this.state.formData.payment === 'BS' ? true : false}
                      handleChange={(value)=>{
                          form.addData('payment', value);
                      }}
                      />
                   </div>
                   <div className="cont pad10">
                     <RadioBtn 
                      name="payment"  
                      id="pay2" 
                      label={this.props.t("checkout:PayPal (e carte accettate)")} 
                      inputRef={el => (this.paymentPP = el)}
                      value="PP"
                      isChecked={this.state.formData.payment === 'PP' ? true : false}
                      handleChange={(value)=>{
                        form.addData('payment', value);
                      }}
                      />
                   </div>
                   <div className="cont pad10">
                     <RadioBtn 
                       name="payment"  
                       id="pay3" 
                       label={this.props.t("checkout:Bonifico bancario")}
                       inputRef={el => (this.paymentBC = el)}
                       value="BB"
                       isChecked={this.state.formData.payment === 'BB' ? true : false}
                       handleChange={(value)=>{
                         form.addData('payment', value);
                       }}
                       />
                   </div>
                  <hr/>

                  <div className="cont pad10">
                   <Checkbox id="privacy-prev" inputRef={el => (this.privacyPrev = el)}>
                   {this.props.t('checkout:Accetto la')}  <a href="/" className="text-blue" onClick={(e) => {
                      e.preventDefault();
                      this.props.history.push('/about/privacy-policy');
                    }}>{this.props.t('checkout:normativa')}</a> {this.props.t('checkout:della privacy')}*
                   </Checkbox>
                  </div>
                  <div className="cont mtop20">
                    <Button type="btn-blue full center">
                    {this.props.t('checkout:SALVA')}
                    </Button>
                  </div>
                 </div>
                </form>
               </div>
               :
               <div className="page-body">
                 <div className="cont pad10 mtop20">
                  <OrderSavedMessage />
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
export default withTranslation()(Checkout);