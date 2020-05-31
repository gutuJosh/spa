import React from "react";
import OfflineBadge from "./offline-mode-badge/OfflineBadge.js";

function Footer() {

 const  date = new Date();

  return (
    <React.Fragment>
     <OfflineBadge />
    <footer className="footer">
      <div className="footer-logo">
          <div className="flogo">
            <div></div>
            <div></div>
          </div>
      </div>
      <div className="wrapper">
       <div className="copy center">
		  <div id="contact-numbers-mobile" className="center mtop30">
			<p>
				<a href="/" className="text-light-grey" onClick={ (event) => {
          event.preventDefault();
          window.location='tel:390108681372';
        }}>+39 0108681372</a> |&nbsp;
				<a href="/" className="text-light-grey" onClick={ (event) => {
          event.preventDefault();
          window.location='tel:390108446402';
          }}>+39 0108446402</a> |&nbsp;
           <a href="mailto:info@bancomail.it" className="text-light-grey">info@bancomail.it</a>
			</p>
		   </div>
           &copy; Copyright {date.getFullYear()} Neosoft Srl - Bancomail<sup>®</sup> - P.IVA: 01288440991  
       </div>
       <div className="mtop5">&nbsp;</div>
      </div>
    </footer>
  </React.Fragment>
  );
};

export default Footer;