import React from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import Liste from "./pages/Liste"
import Garanzie from "./pages/Garanzie"
import Gdpr from "./pages/Gdpr"
import Features from "./pages/Features"
import Details from "./pages/Details"
import Contatti from "./pages/Contatti"
import Cart from "./pages/Cart"
import Quotes from "./pages/Quotes"
import Checkout from "./pages/Checkout"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Navbar from "./components/nav-bar/Navbar"
import Footer from "./components/Footer"
import NotFound from './pages/NotFound';
import Modal from "./components/modal/Modal.js";
import Store from "./helpers/Storage.js";

const  modal = {
    'active' : true,
    'message' : "Sei in modalità offline! Potrai comunque aggiungere prodotti al carrello, salvare un ordine oppure chiedere un preventivo e riprendere l'attività quando l'applicazione tornerà online.",
    'btn' : 'btn-blue',
    'btnTxt' : 'OK',
    'icn' : 'svg-info',
    'id' : 'offlineWarning',
    'closeAction' : () => {
        document.querySelector('#offlineWarning').classList.remove('mask-on');
        if(("Notification" in window)) {
            Notification.requestPermission();
        }
        Store.setSession('offlineWarning', 1);
    }
}
        
    

function App() {
    const history = useHistory();
    return (
        <React.Fragment>
            <Navbar history={history}/>
            <main>
            <Switch>
                <Route path="/" exact>
                    <Home history={history} />
                </Route>
                <Route path="/about" component={About} exact/>
                <Route path="/about/privacy-policy" component={PrivacyPolicy}/>
                <Route path="/liste-email"exact>
                    <Liste history={history}/>
                </Route>
                <Route path="/liste-email/garanzie" component={Garanzie} />
                <Route path="/liste-email/conformita-gdpr" component={Gdpr} />
                <Route path="/liste-email/caratteristiche" component={Features} />
                <Route path="/details/:item" component={Details} />
                <Route path="/cart" component={Cart} />
                <Route path="/contatti" component={Contatti} />
                <Route path="/richiesta-preventivo" component={Quotes} />
                <Route path="/checkout">
                  <Checkout history={history}/>
                </Route>
                <Route path="*" >
                    <NotFound history={history}/>
                </Route>

            </Switch>
            </main>
            <Footer />
            {Store.getSession('offlineWarning') === false &&
            <Modal status={modal} />
            }
        </React.Fragment>
    )
}

export default App;
