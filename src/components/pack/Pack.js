import React from 'react';
import { getDiscountedPrice } from "./../../helpers/ShoppingCart.js";

const Pack = (props) => {

      return(
        <React.Fragment>
          <div className="email-pack flex">
            <div className="pack-icon">
              <div className="figure">
                <i className={"icn-"+props.info.ic}></i>
              </div>
            </div> 
            <div className="pack-info">
            <h6>
                <strong>{props.info.pn}</strong>
			        	<span className={"flag-"+props.info.iso.toLowerCase()}></span>
                {props.info.n} - {props.info.re}			
             </h6>
             <div className="other-info">
				<p className="packInfo small">
				<span><i className="pe-7s-folder"></i></span> Anagrafiche: {props.info.i}
				<br/>
				<span><i className="pe-7s-clock"></i></span> Aggiornato il {props.info.u}
				<br/>
				<span><i className="pe-7s-wallet"></i></span> Prezzo:&nbsp;
                {Number(props.info.d) > 0 ?
                <React.Fragment>
			           <span className="linethrough">{props.info.p} &euro;</span>
                 <strong>&nbsp;{getDiscountedPrice(props.info.d, props.info.p)} &euro;</strong>
                 </React.Fragment>
                :
                <strong>{props.info.p} &euro;</strong>
                }
				</p>
                {Number(props.info.d) > 0 && (
                <div className="badge badge-green">-{props.info.d}%</div>
                )}
			</div>
            <a href="/" className="btn btn-blue btn-small" onClick={(event)=>{
              event.preventDefault();
              props.handleCart(props.info);
            }}>
              <i className="pe-7s-cart"></i> Acquista
            </a>
            <a href="/" 
             className="btn btn-light btn-small"
             onClick={ (e) => {
               e.preventDefault();
               props.handleDetails(props.info);
             }}
             >Dettagli <i className="pe-7s-angle-right"></i>
             </a>
            </div> 
          </div>
        </React.Fragment>
      );
     
  
  };

  export default Pack;
  