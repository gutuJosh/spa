import React from "react";
import {NavLink} from "react-router-dom";
import CartItem from "../components/cart/CartItem.js";
import CartSummary from "../components/cart/CartSummary.js";
import BackBtn from "../components/back-button/BackBtn.js";
import IndexedDb  from './../helpers/IndexedDb.js';
import "../config/i18n.js";
import { withTranslation } from "react-i18next";

class Cart extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      'checkout' : 'open'
    }
    this.deleteItem = this.deleteItem.bind(this);
  }

  async componentDidMount(){
    window.scrollTo(0,0);
    const catalog = new IndexedDb('BancomailAuxiliars');
    let cart = await catalog.requestData('cart');
    for(let i = 0; i < cart.values.length; i++){
      if(cart.values[i].pi === 1 && cart.values[i].owner !== undefined){
          cart.values.splice(i,1);
          break;
      }
    }
    this.setState({
      'items' : cart.values
    });
    const self = this;
    catalog.requestData('checkout').then( (response) => {
      if(response.values.length > 0){
        self.setState({'checkout' : 'forbidden'});
      }
    });
  }

  async deleteItem(itemId){
    //const cart = this.state.items.filter( (item) => item.pi !== itemId);
    let catalog = new IndexedDb('BancomailAuxiliars');
    let transaction = await catalog.removeData('cart', itemId);
    let cart = await catalog.requestData('cart');
    if(cart.values.length === 0){
       await catalog.clearAll('cart');
       this.setState({
        'items' : []
      });
      document.querySelector('#carrello').innerHTML = 0;   
      return;
    }
    else{
      if(transaction.status === 'ok'){
        for(let i = 0; i < cart.values.length; i++){
          if(cart.values[i].pi === 1 && cart.values[i].owner !== undefined){
              cart.values.splice(i,1);
              break;
          }
        }
        this.setState({
          'items' : cart.values
        });
        document.querySelector('#carrello').innerHTML = cart.values.length;   
      }
    }
  }



  render(){
  
    return(
      <React.Fragment>
        <section className="section mtop0 screen-blue">
         <div className="wrapper">
           <div className="flex-grid">
            <div className="flex-lg-12 flex-md-12 flex-sm-12">
              <h1 className="text-white">
                <i className="cart-icn"></i> {this.props.t('Il tuo carrello')}
              </h1>
              {(this.state.items.length > 0 && this.state.checkout === 'open') &&
              <p className="text-white">{this.props.t('Inizia ora il tuo acquisto e non appena ritornerai online otterrai uno sconto aggiuntivo del 10% (cumulabile con altre promozioni fino a un massimo del 50%)!')}</p>
               }
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
         <div className="flex-grid page-body">
          <div className="flex-lg-12 flex-md-12 flex-sm-12">
            {this.state.items.length > 0 ?
            <ul className="cart-items-holder">
             {this.state.items.map((item, i) => (
                <CartItem key={i} item={item} removeItem={this.deleteItem} />
               ))}
            </ul>
            :
            <div className="center p10">
               <p>{this.props.t('cart:Il tuo carrello è vuoto')}: {this.props.t('Inizia ora il tuo acquisto e non appena ritornerai online otterrai uno sconto aggiuntivo del 10% (cumulabile con altre promozioni fino a un massimo del 50%)!')}</p>
               <NavLink to="/liste-email" className="btn btn-yellow"><i className="pe-7s-angle-left"></i> {this.props.t('cart:Vai alla Ricerca')}</NavLink>
            </div>
            }
          </div>
         </div>
         <div className="flex-grid page-footer">
          <div className="flex-lg-12 flex-md-12 flex-sm-12 center">
           {this.state.items.length > 0 && (
            <React.Fragment>
              {this.state.checkout === 'open' ?
               <p className="small mbottom0">{this.props.t('cart:Appena concluso il ordine, il tuo database sarà pronto entro 3 giorni lavorativi, ma di solito ci bastano 24 ore.')}</p>
               :
               <p className="small alert alert-red pad5">{this.props.t('cart:Non è possibile completare l\'aquisto')}: {this.props.t('cart:hai già un ordine in attesa! Appena ritornerai online, riceverai un promemoria anche di questo carrello.')}</p>
              }
            </React.Fragment>
            )}
          </div>
         </div>
        </div>
      </section>
      {(this.state.items.length > 0 && this.state.checkout === 'open') && (
       <CartSummary items={this.state.items}/>
      )}
      <div className="mtop50">&nbsp;</div>
      </React.Fragment>
    )
  }

}
export default withTranslation()(Cart);
