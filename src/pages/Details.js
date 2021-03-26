import React from "react";
import PackDetails from "../components/pack/PackDetails.js"
import Modal from "../components/modal/Modal.js";
import ModalConfirm from "../components/modal/ModalConfirm.js";
import BackBtn from "../components/back-button/BackBtn.js";
import IndexedDb  from './../helpers/IndexedDb.js';
import "../config/i18n.js";
import { withTranslation } from "react-i18next";

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: JSON.parse(decodeURIComponent(this.props.match.params.item)),
            showModal: {
                'active' : false,
                'message' : this.props.t("Il pacchetto è stato aggiunto al carrello con successo!"),
                'btn' : 'btn-blue',
                'btnTxt' : 'OK',
                'icn' : 'svg-ok'
              },
              showModalConfirm: {
                'active' : false,
                'id': 'confirmSaveCart',
                'message' : this.props.t("Il pacchetto è stato aggiunto al carrello con successo! Inserisci la tua email per recuperalo da qualsiasi dispositivo")+":",
                'btnOk' : 'btn-yellow',
                'btnOkTxt' : this.props.t('Salva email'),
                'btnKo' : 'btn-blue',
                'btnKoTxt' : this.props.t('Continua senza salvare'),
                'icn' : 'svg-ok'
              }
        }
        this.addItemToCart = this.addItemToCart.bind(this);
        this.handleState = this.handleState.bind(this);
        this.saveCartOwner = this.saveCartOwner.bind(this);
    }

    componentDidMount(){
      try{
        window.scrollTo(0,0);
       }
       catch(e){
         //console.log(e.message);
       }
    }

    handleState(stateName, stateValue){
        this.setState({[stateName] : stateValue});
      }

    async addItemToCart(item){
        const catalog = new IndexedDb('BancomailAuxiliars');
        const getCart = await catalog.requestData('cart').catch( response => {
          if(response.status === 'ko' && response.message === 'cart is empty'){
            let modal = {
              'active' : true,
              'message' : this.props.t("Errore! Impossibile aggiungere pacchetti al carrello. Ci scusiamo per il disagio."),
              'btn' : 'btn-yellow',
              'btnTxt' : 'OK',
              'icn' : 'svg-attention'
              }
              this.setState({
                'showModal' : modal
              }); 
              return; 
          }
        });
        const cart = getCart !== undefined ? getCart.values : [];
        var cartOwner = '';
        for(let i = 0; i < cart.length; i++){
          if(cart[i].pi === 1 && cart[i].owner !== undefined){
              cartOwner = cart[i].owner;
              cart.splice(i,1);
              break;
          }
        }
        let isInCart = false;
        let modal = {
          'active' : true,
          'message' : this.props.t("Il pacchetto è stato aggiunto al carrello con successo!"),
          'btn' : 'btn-blue',
          'btnTxt' : 'OK',
          'icn' : 'svg-ok'
          };
        for(let i = 0; i < cart.length; i++){
         
           if(cart[i].pi === item.pi){
               modal = {
                'active' : true,
                'message' : this.props.t("Il pacchetto è gia stato aggiunto al carrello!"),
                'btn' : 'btn-yellow',
                'btnTxt' : 'OK',
                'icn' : 'svg-attention'
                }
                isInCart = true;
                break;
           }
        }
        if(isInCart === true){
          this.setState({
            'showModal' : modal
          });  
        }
        else{
          let transaction = await catalog.storeData('cart', item);
          if(transaction.status === 'ok'){
            cart.push(item);
            if(cartOwner === ''){
              var confirmModal = this.state.showModalConfirm;
                confirmModal.active = true;
                this.setState({
                  'showModalConfirm' : confirmModal
                }); 
            }
            else{
              this.setState({
                'showModal' : modal
              });
            }
            document.querySelector('#carrello').innerHTML = cart.length;   
          }
        }
    
      }

      saveCartOwner(status, owner){
        const self = this;
           if(status === 'ok' && owner !== false  && owner.indexOf('.') !== -1 && owner.indexOf('@') !== -1){
              const catalog = new IndexedDb('BancomailAuxiliars');
              let d = new Date();
              let month = d.getMonth() < 9 ? '0'+(d.getMonth() +1) : (d.getMonth() +1);
              let data = `${d.getDate()}-${month}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
              let item = {'pi': 1, 'owner': owner, 'date': data};
              catalog.storeData('cart', item).then( response => {
                var confirmModal = this.state.showModalConfirm;
                confirmModal.active = false;
                self.setState({
                  'showModalConfirm' : confirmModal
                }); 
              });
           }
           else if(status === 'ko'){
            var confirmModal = this.state.showModalConfirm;
            confirmModal.active = false;
            self.setState({
              'showModalConfirm' : confirmModal
            }); 
           }
      }

    render(){
        const item = this.state.item;
        return(
          <React.Fragment>
           <section className="section mtop0 screen-blue">
            <div className="wrapper">
             <div className="flex-grid">
              <div className="flex-lg-12 flex-md-12 flex-sm-12">
               
              </div>
             </div>
             <div className="flex-grid page-header mtop50">
                <BackBtn/>
             </div>
            </div>
           </section>
           <section>
            <div className="wrapper">
             <div className="page-body details-container">
             <PackDetails 
              item={item} 
              handleCart={this.addItemToCart} 
              />
             </div>
             <div className="page-footer text-center">
              <a href="/liste" title={this.props.t("Clicca per acquistare")} className="btn btn-blue" onClick={(event)=>{
                event.preventDefault();
                this.addItemToCart(item);
               }}>
    		   <i className="pe-7s-cart"></i> {this.props.t('Acquista ora')}
              </a>
             </div>
            </div>
           </section>
           <Modal 
            status={this.state.showModal} 
            handleModal={this.handleState}
          />
          <ModalConfirm
            status={this.state.showModalConfirm} 
            handleConfirm={this.saveCartOwner}
          />
          </React.Fragment>
        )
    }
}
export default withTranslation()(Details);