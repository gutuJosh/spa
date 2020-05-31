import React  from "react";
import Menu from "./Menu.js"

function Navbar(props) {

  const sticky = () => {
      window.addEventListener('load', () => {
        window.addEventListener('scroll', () => {
        const topBar = document.querySelector('header.top-header');
        const scrollTop = window.scrollY || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        if(scrollTop > 0){
            topBar.classList.add('sticky');
        }
        else{
          topBar.classList.remove('sticky');
        }   
        },false);
    }, false);
  }

  return (
    <header className="top-header">
     <Menu history={props.history}/>
     {sticky()}
    </header>
  );
};

export default Navbar;