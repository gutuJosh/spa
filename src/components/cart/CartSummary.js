import React from "react";
import {NavLink} from "react-router-dom";
import { totalPrice, totalDiscount, finalPrice } from "./../../helpers/ShoppingCart.js";

function CartSummary(props) {

   

    return (
        <section>
        <div className="wrapper">
        <div className="flex-grid">
        <div className="flex-lg-12 flex-md-12 flex-sm-12">
          <div className="cont cart-summary">
            <h4>Totale carrello:</h4>
            <hr/>
            <ul className="p10">
             <li>
               <p className="mbottom0">
                 Prezzo complessivo:
                <span className="f-right">{totalPrice(props.items)} &euro;</span>
               </p>
             </li>
             <li>
               <p className="mbottom0">
                 Sconto di listino:
                 <span className="f-right">{totalDiscount(props.items)} &euro;</span>
               </p>
             </li>
             <li>
               <p className="mbottom0">
                Prezzo finale Iva Escl.:
                 <span className="f-right"><b>{finalPrice(props.items)} &euro;</b></span>
               </p>
             </li>
            </ul>
            <hr/>
            <div className="center checkout-btn-holder">
              <NavLink to="/checkout" className="btn btn-blue full">Vai alla cassa <i className="pe-7s-angle-right"></i></NavLink>
            </div>
          </div>
          </div>
         </div>
        </div>
       </section>
    )
     
}
export default CartSummary;