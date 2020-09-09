import React from "react";
import { formatPrice, getDiscountedPrice, totalPrice, totalDiscount, finalPrice, setIva, applyIva } from "./../../helpers/ShoppingCart.js";

function OrderSummary(props) {



    return (
        <React.Fragment>
         {props.items && (
         <React.Fragment>
            <table className="table mtop30">
              <colgroup>
               <col span="1"/>
               <col style={{width:"100px"}}/>
			        </colgroup>
              <tbody>
              {props.items.map((item, i) => (
                <tr key={i}>
                    <td>{item.pn} - {item.n} {item.re}</td>
                    <td className="center relative">
                     {Number(item.d) > 0 ? 
                      <React.Fragment>
                        <div className="badge badge-green">-{item.d}%</div>
                        <span className="linethrough">{formatPrice(item.p)} &euro;</span>
                        <br/>
                        <b>{getDiscountedPrice(item.d, item.p)} &euro;</b>
                      </React.Fragment>
                      :
                      <b>{formatPrice(item.p)} &euro;</b>
                     }
                    </td>
                </tr>
               ))}
             </tbody>
            </table>
            <table className="table mtop5">
            <colgroup>
              <col span="1"/>
              <col style={{width:"100px"}}/>
            </colgroup>
            <tbody>
            <tr>
             <td>Prezzo complessivo</td>
             <td className="center">{totalPrice(props.items)} &euro;</td>
            </tr>
            <tr>
             <td>Sconti di listino</td>
             <td className="center">{totalDiscount(props.items)} &euro;</td>
            </tr>
            <tr>
             <td>Prezzo d'acquisto</td>
             <td className="center">{finalPrice(props.items)} &euro;</td>
            </tr>
            <tr className="spacer"></tr>
            {props.invoiceCountry !== false ? 
            <React.Fragment>
            <tr>
            <td>
                IVA (22%)
            </td>
            <td className="center">
               + {setIva(22, props.items)} &euro;
            </td>
            </tr>
            <tr>
             <td>
                <b>Prezzo Totale</b>
             </td>
             <td className="center">
                <b>{applyIva(22, props.items)}  &euro;</b>
             </td>
            </tr>
            </React.Fragment>
              :
              <tr>
              <td colSpan="2" className="center">
               Al momento l'IVA non è calcolabile: non appena ripristinata la connessione, l'IVA verrà verificata.
              </td>
              </tr>
              }
			  </tbody>
           </table>
           </React.Fragment>
         )}
        </React.Fragment>
    )
     
}
export default OrderSummary;