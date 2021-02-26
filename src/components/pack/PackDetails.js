import React from "react";
import { formatPrice, getDiscountedPrice } from "./../../helpers/ShoppingCart.js";
import "../../config/i18n.js";
import { withTranslation } from "react-i18next";

const  PackDetails = (props) => {

  const item = props.item;


    return(
    <React.Fragment>
        {item &&
         <React.Fragment>
         <div className="flex-grid">
            <div className="flex-two-third flex">
             <div className="pack-icon">
              <div className="figure">
                <i className={"icn-"+item.ic}></i> 
              </div>
             </div> 
              <div className="pack-name">
                <h3 className="mtop0">{props.t(item.pn)} | {props.t(item.n)} - {props.t(item.re)}</h3>
                <h4 className="mtop0">{item.i} {props.t('Anagrafiche')}</h4>
              </div>
            </div>
            <div className="flex-one-third text-right">
              <h3 className="mtop0">
                {Number(item.d) > 0 ?
                 <React.Fragment>
			            <q className="linethrough">{formatPrice(item.p)}&euro;</q>
                  &nbsp;{getDiscountedPrice(item.d, item.p)}&euro;
                 </React.Fragment>
                :
                <React.Fragment>{formatPrice(item.p)}&euro;</React.Fragment>
                }
              </h3>
             <a href="/" title={props.t("Clicca per acquistare")} className="btn btn-blue" onClick={(event)=>{
                event.preventDefault();
                props.handleCart(item);
               }}>
    		      <i className="pe-7s-cart"></i> {props.t('Acquista')}
             </a>
            </div>
         </div>
         <div className="flex-grid">
           <div className="flex-lg-12 flex-md-12 flex-sm-12">
            <p className="mtop20"> {props.t('Questo database contiene')} {item.i} {props.t('anagrafiche aziendali complete, uniche e sempre comprensive di indirizzo email.')}&nbsp;
             {props.t('Vengono ceduti a titolo definitivo, unitamente alle garanzie contrattuali di privacy e validità dei dati.')} 
             </p>
           </div>
         </div>
         <div className="flex-grid">
            <div className="flex-lg-12 flex-md-12 flex-sm-12">
            <table className="table table-light dettagliPaccheto mtop20">
                <tbody>
                        <tr>
                        <th><strong>{props.t('Categoria')}:</strong></th>
                         <td>{item.pn}</td>
                        </tr>
                        <tr>
                        <th><strong>{props.t('Locazione')}:</strong></th>
                        <td>
                         <span className={"flag-"+item.iso.toLowerCase()}></span>
                         <span>{item.n} - {item.re}</span>
                        </td>
                        </tr>
                        <tr>
                        <th><strong>{props.t('Prezzo listino')}:</strong></th>
                         <td>{formatPrice(item.p)}&nbsp;&euro;</td>
                        </tr>
                        {item.discount > 0 && (
                        <tr>
                        <th><strong>{props.t('Sconto')}:</strong></th>
                        <td><strong className="text-green">-{item.d}%</strong></td>
                        </tr>
                        )}
                        <tr>
                        <th><strong>{props.t('Formati distribuiti')}:</strong></th>
                        <td>{props.t('EXCEL - TAB - CSV (altri su richiesta)')}</td>
                        </tr>
                        <tr>
                        <th><strong>{props.t('Fonte')}:</strong></th>
                        <td>{props.t('Consenso conferito + Elenchi pubblici')}</td>
                        </tr>
                        <tr>
                        <th><strong>{props.t('Dati contenuti nel pacchetto')}:</strong></th>
                        <td>{props.t('E-mail - Categoria merceologica - Ragione Sociale - Indirizzo - Cap - Città - Prov. - Telefono - Fax')}</td>
                        </tr>
                        <tr>
                            <th><strong>{props.t('Risorse incluse')}:</strong></th>
                        <td>
                           
                            <span>{props.t('Email template')}</span> +
                            <span>{props.t('Ebook Smart Guide')}</span>
                            
                        </td>
                        </tr>
                        <tr>
                        <th><strong>{props.t('Ultimo aggiornamento')}:</strong></th>
                        <td>{item.u}</td>
                        </tr>
                        <tr>
                        <th><strong>{props.t('Codice pacchetto')}:</strong></th>
                        <td>{item.pi}</td>
                        </tr>
                        {item.d > 0 && (
                        <tr>
                        <th><strong>{props.t('Prezzo finale')}:</strong></th>
                        <td>
                         <strong>{getDiscountedPrice(item.d, item.p)}&nbsp;&euro;</strong>
                        </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
         </div>
         </React.Fragment>
        }    
    </React.Fragment>
    )
}
export default withTranslation()(PackDetails);