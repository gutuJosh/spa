import React, { useState }from "react";
import {Link, NavLink} from "react-router-dom";
import IndexedDb  from './../../helpers/IndexedDb.js';


function Menu(props) {
  
  const [switcher, setSwitcher] = useState(false);
  const [open, toggleMenu] = useState(false);
  const [itemsInCart, getCart] = useState(0);


  const catalog = new IndexedDb('BancomailAuxiliars');
  catalog.requestData('cart').then( (response) => {
    var cart = response.values;
    for(let i = 0; i < cart.length; i++){
      if(cart[i].pi === 1 && cart[i].owner !== undefined){
          cart.splice(i,1);
          break;
      }
    }
    getCart(cart.length);
  }).catch( (response) => {
    //console.log(response)
  });
    

  const scrollToTop = () => {
    try{
      window.scrollTo(0,0);
    }
    catch(e){
      console.log(e);
    }
  }

    return (
      <nav className="top-menu">
        <div className="logo-container">  
         <Link to="/">
          <span className={ switcher === false ? "menu-icon" : "menu-icon active"} onClick={ (event) => {
            event.preventDefault();
            if(switcher){
              setSwitcher(false);
              toggleMenu(false);
            }
            else{
              setSwitcher(true);
            }
          }}>
            <span>&nbsp;</span>
          </span>
        	<span title="Bancomail logo" className="logo">&nbsp;</span>
         </Link>
        </div>
        <ul className={ switcher === false ? "navigation custom-scroll-bar" : "navigation custom-scroll-bar active"} onMouseLeave={ () => {
             toggleMenu(false);
         }}>
         <li>
           <Link to="/" onClick={()=>setSwitcher(false)}>Home </Link>
          </li>
         <li>
           <Link to="/about" onClick={()=>setSwitcher(false)}>About</Link>
         </li>
         <li className={open === true ? "dropdown open" : "dropdown"}>
           <Link to="/liste-email" onClick={(event) => {
              event.preventDefault();
              const element = event.target.parentNode;
              if(!element.classList.contains('open')){
               toggleMenu(true);
              }
              else{
                toggleMenu(false);
              }
           }}>Liste email</Link>
           <ul>
             <li>
               <Link to="/liste-email" 
               onClick={()=>{
                 toggleMenu(false);
                 setSwitcher(false);
                 scrollToTop();
                }}>Ricerca elenchi</Link>
              </li>
             <li>
               <Link to="/liste-email/caratteristiche" onClick={()=>{
                 toggleMenu(false);
                 setSwitcher(false);
                 scrollToTop();
               }}>Caratteristiche</Link>
              </li>
             <li>
               <Link to="/liste-email/garanzie" 
                onClick={()=>{
                  toggleMenu(false);
                  setSwitcher(false);
                  scrollToTop();
                }}>Garanzie</Link>
              </li>
             <li>
               <Link to="/liste-email/conformita-gdpr" 
                onClick={()=>{
                  toggleMenu(false);
                  setSwitcher(false);
                  scrollToTop();
                }}>Conformità GDPR</Link>
              </li>
           </ul>
         </li>
         <li>
           <Link to="/richiesta-preventivo" onClick={()=>setSwitcher(false)}>Preventivi</Link>
        </li>
         <li>
           <Link to="/contatti" 
           onClick={()=>{
             setSwitcher(false);
             scrollToTop();
           }}>Contatti</Link>
         </li>
        </ul>
        <div className="cart-container center">  
         <div  className="cart">
           <div id="carrello" className="badge badge-green ">{itemsInCart}</div>
           <NavLink 
            to="/cart" 
            title="Carrello" 
            className="carrello"
            onClick={ (event)=> {
              event.preventDefault();
              props.history.push('/cart');
            }}
            >&nbsp;</NavLink>
         </div>
        </div>
      </nav>
    );
  };
  
  export default Menu;