import React from "react";
import {NavLink} from "react-router-dom";
import { totalPrice, totalDiscount, finalPrice } from "./../../helpers/ShoppingCart.js";
import "../../config/i18n.js";
import { withTranslation } from "react-i18next";

const CartSummary = (props) => {

   

    return (
        <section>
        <div className="wrapper">
        <div className="flex-grid">
        <div className="flex-lg-12 flex-md-12 flex-sm-12">
          <div className="cont cart-summary">
            <h4>{props.t('Totale carrello')}:</h4>
            <hr/>
            <ul className="p10">
             <li>
               <p className="mbottom0">
               {props.t('Prezzo complessivo')}:
                <span className="f-right">{totalPrice(props.items)} &euro;</span>
               </p>
             </li>
             <li>
               <p className="mbottom0">
               {props.t('Sconto di listino')}:
                 <span className="f-right">{totalDiscount(props.items)} &euro;</span>
               </p>
             </li>
             <li>
               <p className="mbottom0">
               {props.t('Prezzo finale Iva Escl.')}:
                 <span className="f-right"><b>{finalPrice(props.items)} &euro;</b></span>
               </p>
             </li>
            </ul>
            <hr/>
            <div className="center checkout-btn-holder">
              <NavLink to="/checkout" className="btn btn-blue full">{props.t('Vai alla cassa')} <i className="pe-7s-angle-right"></i></NavLink>
            </div>
          </div>
          </div>
         </div>
        </div>
       </section>
    )
     
}
export default withTranslation()(CartSummary);