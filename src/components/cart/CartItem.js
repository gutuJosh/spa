import React from "react";
import {NavLink} from "react-router-dom";
import { formatPrice, getDiscountedPrice } from "./../../helpers/ShoppingCart.js";
import "../../config/i18n.js";
import { withTranslation } from "react-i18next";

const CartItem = (props) => {


    const item = props.item;

    return (
       <li className="flex-grid flex-middle">
        <div className="flex-lg-1 flex-md-1 flex-sm-2">
            <div className="pack-icon">
            <div className="figure">
                <i className={"icn-"+item.ic}></i>
            </div>
            </div>
        </div>
        <div className="flex-lg-4 flex-md-4 flex-sm-8">
        <p className="mbottom0 pack-name">
            <NavLink to={"/details/"+encodeURIComponent(JSON.stringify(item))} >{item.pn}</NavLink>
            <br/>
            <span className={"flag-"+item.iso.toLowerCase()}></span>
            <span>{item.n} - {item.re}</span>
        </p>
        
        </div>
        <div className="flex-lg-3 flex-md-3 flex-sm-6 total-items">
        <p className="mbottom0">{props.t('Anagrafiche')}: {item.i}</p>
        </div>
        <div className="flex-lg-2 flex-md-2  flex-sm-6 price center">
        <p className="bottom0">
            {item.d > 0 ? (
            <React.Fragment>
            <span className="linethrough">{formatPrice(item.p)} &euro;</span>
            <br/>
            <span><b>{getDiscountedPrice(item.d, item.p)} &euro;</b></span>
            </React.Fragment>
            )
            :
            <span><b>{formatPrice(item.p)} &euro;</b></span>
            }
        </p>
        </div>
        <div className="flex-lg-2 flex-md-2 flex-sm-2 trash center">
        <a href="/" title={props.t("Rimuovi pacchetto")} onClick={ (event) => {
            event.preventDefault();
            props.removeItem(item.pi);
        }}>
            <i className="pe-7s-trash"></i>
        </a> 
      </div>
     </li>
    )
     
}
export default withTranslation()(CartItem);