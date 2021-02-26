import React from "react"
import SearchForm from "../components/search-form/searchForm.js";
import Paginator from "../components/paginator/Paginator.js";
import PackDetails from "../components/pack/PackDetails.js"
import Pack from "../components/pack/Pack.js";
import FilterByRegions from "../components/filter-search/FilterByRegions.js";
import Modal from "../components/modal/Modal.js";
import ModalConfirm from "../components/modal/ModalConfirm.js";
import Loader from "../components/loader/Loader.js";
import Store from "../helpers/Storage.js";
import {NavLink} from "react-router-dom";
import IndexedDb  from '../helpers/IndexedDb.js';
import "../config/i18n.js";
import { withTranslation } from "react-i18next";

class Databases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsPerPage: 20,
      totalPages: 1,
      currentPage: Store.getSession('currentPage') !== false ? Number(Store.getSession('currentPage')) : 1,
      currentPageRange: 1,
      lists: null,
      filteredResults: [],
      finalResults: [],
      regions: null,
      packDetails: null,
      showModal: {
        'active' : false,
        'message' :"Il pacchetto è stato aggiunto al carrello con successo!",
        'btn' : 'btn-blue',
        'btnTxt' : 'OK',
        'icn' : 'svg-ok'
      },
      showModalConfirm: {
        'active' : false,
        'id': 'confirmSaveCart',
        'message' :"Il pacchetto è stato aggiunto al carrello con successo! Inserisci la tua email per recuperalo da qualsiasi dispositivo",
        'btnOk' : 'btn-yellow',
        'btnOkTxt' : 'Salva email',
        'btnKo' : 'btn-blue',
        'btnKoTxt' : 'Continua senza salvare',
        'icn' : 'svg-ok'
      },
      where: '',
      what: '',
      searchFilter: '',
      preloaderStatus: 'loading'
    };
    this.getAllLists =  this.getAllLists.bind(this);
    this.handleState = this.handleState.bind(this);
    this.applySearchParameters = this.applySearchParameters.bind(this);
    this.changePage = this.changePage.bind(this);
    this.submitSearchForm = this.submitSearchForm.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.saveCartOwner = this.saveCartOwner.bind(this);
  }

  async componentDidMount(){
       //window.scrollTo(0,0);
  }
 

  getAllLists(data){//passed to searchForm component return all lists from database
    this.setState({'lists': data}, this.applySearchParameters);
  }

  handleState(stateName, stateValue){
    this.setState({[stateName] : stateValue});
  }

  handleDetails(item){
    const self = this;
    if(window.innerWidth < 992){
       this.props.history.push('/details/'+encodeURIComponent(JSON.stringify(item)));
    }
    else{
       this.detailsPreloader.classList.add('loading');
       this.refs.detailsHolder.scrollTo(0,0);
       this.setState({'packDetails':item});
       setTimeout( () => {
        self.detailsPreloader.classList.remove('loading');
       }, 1000);
   }
  }
 
  applySearchParameters(parameters = false){//perform search
     if(parameters === false){
        parameters = Store.getSession('offlineSearch');
        parameters = (parameters !== false ) ? JSON.parse(parameters) : parameters;
      } 
     let results;
     let regions;
     //apply region and category if selected
     if(parameters !== false){//filter results

        results = this.state.lists.filter( (item) => ( 
          item.n.toLowerCase().includes(parameters.nation) && 
          item.pn.toLowerCase().includes(parameters.category) && 
          item.re.toLowerCase().includes(parameters.region)
          ));

        this.setState({'where' : parameters.nation, 'what' : parameters.category, searchFilter : parameters.region});
        
     }
     else{
       results = this.state.lists;
     }

    //get all  regions
     if(parameters !== false && parameters.nation !== ''){
          regions = [];
          this.state.lists.forEach( (item) => {
              if(!regions.includes(item.re) && !item.re.includes(this.props.t('Tutte')) && item.n.toLowerCase().includes(parameters.nation) && item.pn.toLowerCase().includes(parameters.category)){
                     regions.push(item.re);
              }  
          });
         }
      else{
           regions = null;  
      }
  
   
      let totalPages = Math.ceil(results.length / this.state.resultsPerPage);
      let currentPage = this.state.currentPage;
      this.setState({
        'filteredResults' : results,
        'totalPages' : totalPages,
      });
      //update regions only if we have new values
      if(JSON.stringify(regions) !== JSON.stringify(this.state.regions)){
        this.setState({
          'regions' : regions,
        });
      }
      this.changePage(currentPage, results);
     
  }

  changePage(pageNumber, results = false){
     const self = this;
     let liste = [];
     this.detailsPreloader.classList.add('loading');
     let startIndex = (pageNumber * this.state.resultsPerPage) - this.state.resultsPerPage;
     let stopIndex = (pageNumber * this.state.resultsPerPage);
     let filteredResults = results !== false ? results : this.state.filteredResults;
     filteredResults.forEach( (item, index) => {
        if( (index +1) >= startIndex && ((index +1) < stopIndex ) ) {
              liste.push(item);
        }  
     });
      this.setState({
        'finalResults' : liste,
        'packDetails': liste[0],
        'currentPage' : pageNumber
      }, ()=>{
        setTimeout( ()=> {
          Store.setSession('currentPage', pageNumber);
          self.detailsPreloader.classList.remove('loading');
          self.setState({'preloaderStatus' : ''});
        }, 500);
      });
    
     
  }

  submitSearchForm(nation, categories){
        const self = this;
        Store.removeSession('offlineSearch');
        Store.removeSession('currentPage');
        this.setState({'preloaderStatus' : 'loading', 'currentPage' : 1});
        setTimeout( () => {
          self.applySearchParameters({
            'nation' : nation.includes(this.props.t('tutte'))  ? '' : nation,
            'category': categories.includes(this.props.t('tutte'))  ? '' : categories,
            'region' : ''
          });

          Store.setSession('offlineSearch', JSON.stringify({
            'nation' : nation.includes(this.props.t('tutte'))  ? '' : nation, 
            'category' : categories.includes(this.props.t('tutte'))  ? '' : categories, 
            'region' : ''
          }));
        }, 300);
      
  }

  filterSearch(region){
     if(Store.getSession('offlineSearch') === false){
       return false;
     }  
     Store.removeSession('currentPage');
     let parameters =  JSON.parse(Store.getSession('offlineSearch'));
     if(region !== ''){
        parameters['region'] = region.toLowerCase();
        Store.setSession('offlineSearch', JSON.stringify(parameters));
     }
     else{
        Store.setSession('offlineSearch', JSON.stringify({'nation' : parameters.nation, 'category' : parameters.category, 'region' : ''}));
     }
    
     this.setState({
      'currentPage' : 1
     }, this.applySearchParameters)
  }

  async addItemToCart(item){
    const catalog = new IndexedDb('BancomailAuxiliars');
    //const cart = Store.getLocal('cart') !== false ? JSON.parse(Store.getLocal('cart')) : [];
    const getCart = await catalog.requestData('cart').catch( response => {
        if(response.status === 'ko' && response.message === 'cart is empty'){
          let modal = {
            'active' : true,
            'message' : "Errore! Impossibile aggiungere pacchetti al carrello. Ci scusiamo per il disagio.",
            'btn' : 'btn-yellow',
            'btnTxt' : 'OK',
            'icn' : 'svg-attention'
            }
            this.setState({
              'showModal' : modal
            }); 
            return; 
        }
    });
    const cart = getCart !== undefined ? getCart.values : [];
    var cartOwner = '';
    for(let i = 0; i < cart.length; i++){
      if(cart[i].pi === 1 && cart[i].owner !== undefined){
          cartOwner = cart[i].owner;
          cart.splice(i,1);
          break;
      }
    }

    let isInCart = false;
    let modal = {
      'active' : true,
      'message' : this.props.t("Il pacchetto è stato aggiunto al carrello con successo!"),
      'btn' : 'btn-blue',
      'btnTxt' : 'OK',
      'icn' : 'svg-ok'
      };
    for(let i = 0; i < cart.length; i++){
       if(cart[i].pi === item.pi){
           modal = {
            'active' : true,
            'message' : this.props.t("Il pacchetto è gia stato aggiunto al carrello!"),
            'btn' : 'btn-yellow',
            'btnTxt' : 'OK',
            'icn' : 'svg-attention'
            }
            isInCart = true;
            break;
       }
    }
    if(isInCart === true){
      this.setState({
        'showModal' : modal
      });  
    }
    else{
      let transaction = await catalog.storeData('cart', item);
      if(transaction.status === 'ok'){
        cart.push(item);
        if(cartOwner === ''){
          var confirmModal = this.state.showModalConfirm;
            confirmModal.active = true;
            this.setState({
              'showModalConfirm' : confirmModal
            }); 
        }
        else{
          this.setState({
            'showModal' : modal
          });
        }
        document.querySelector('#carrello').innerHTML = cart.length;   
      }
    }

  }

  saveCartOwner(status, owner){
    const self = this;
       if(status === 'ok' && owner !== false  && owner.indexOf('.') !== -1 && owner.indexOf('@') !== -1){
          const catalog = new IndexedDb('BancomailAuxiliars');
          let d = new Date();
          let month = d.getMonth() < 9 ? '0'+(d.getMonth() +1) : (d.getMonth() +1);
          let data = `${d.getDate()}-${month}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
          let item = {'pi': 1, 'owner': owner, 'date': data};
          catalog.storeData('cart', item).then( response => {
            var confirmModal = this.state.showModalConfirm;
            confirmModal.active = false;
            self.setState({
              'showModalConfirm' : confirmModal
            }); 
          });
       }
       else if(status === 'ko'){
        var confirmModal = this.state.showModalConfirm;
        confirmModal.active = false;
        self.setState({
          'showModalConfirm' : confirmModal
        }); 
       }
  }


  render(){
  
    return(
      <React.Fragment>
       <section className="section mtop0 screen-blue">
         <div className="wrapper">
           <div className="flex-grid">
            <div className="flex-lg-12 flex-md-12 flex-sm-12">
              <h2 className="text-white mtop0">
                {this.props.t('Crea il tuo database email B2B')} 
              </h2>
              <p className="text-white">
              {this.props.t('Oltre')} 8.000.000 {this.props.t('aziende nel mondo.')} {this.props.t('Acquista anagrafiche aziendali sempre comprensive degli indirizzi email.')}
              </p>
              <p className="text-white">
              {this.props.t('Seleziona una categoria e/o una locazione geografica per visualizzare subito tutti i pacchetti disponibili.')} 
              </p>
              <p className="alert alert-green small pointer pad5">
                <span style={{fontSize:'20px',marginRight:'5px'}}className="close f-right pe-7s-close" onClick={ (e) => {
                e.target.parentNode.classList.add('hide');
              }}>&nbsp;
                </span>
                {this.props.t('Inizia ora il tuo acquisto e non appena ritornerai online otterrai uno sconto aggiuntivo del 10% (cumulabile con altre promozioni fino a un massimo del 50%)!')}
               </p>
            </div>
           </div>
           <div className="flex-grid">
            <div className="flex-lg-12 flex-md-12 flex-sm-12 text-center">
              <SearchForm 
               action="/shop" 
               method="get" 
               getAllLists={this.getAllLists}
               handleSubmit={this.submitSearchForm}
               />
            </div>
           </div>
           <div className="flex-grid page-header mtop50">
            <div className="flex-lg-12 flex-md-12 flex-sm-12 result-label">
            {this.state.lists !== null && (
              <React.Fragment>
              {this.state.filteredResults.length === 1 ?
                  <h3>{this.state.filteredResults.length}  {this.props.t('pacchetto trovato')} <span>{this.state.where} {this.state.what + ' ' + this.state.searchFilter}</span></h3>
                  :
                  <h3>{this.state.filteredResults.length > 0 ?  this.state.filteredResults.length +' '+this.props.t('pacchetti trovati') : ''} <span>{this.state.where} {this.state.what + ' ' + this.state.searchFilter}</span></h3>
              }
              </React.Fragment>
              )}   
            </div>
            { this.state.regions !== null && (
            <div className="flex-lg-4 flex-md-4 flex-sm-12 region-select-holder">
              <FilterByRegions 
               regions={this.state.regions} 
               filterSearch={this.filterSearch}
               />
            </div>
            )}
           </div>
         </div>
       </section>
       <section>
         <div className="wrapper">
           <div className="flex-grid page-body">
           {this.state.lists !== null && (
            <React.Fragment>
            <div className="flex-lg-4 flex-md-4 flex-sm-12">
              <ul className="packs-holder custom-scroll-bar flex wrap">
               {this.state.finalResults.map((item, i) => (
                 <li key={i}>
                  <Pack 
                  info={item} 
                  handleCart={this.addItemToCart}
                  handleDetails={this.handleDetails}
                  />
                 </li>
               ))}
              </ul>
            </div>
            <div className="flex-lg-8 flex-md-8 flex-sm-12 details-holder custom-scroll-bar" ref="detailsHolder">
              <PackDetails 
              item={this.state.packDetails} 
              handleCart={this.addItemToCart} 
              />
               <Loader loaderRef={el => (this.detailsPreloader = el)}/>
            </div>
            {this.state.filteredResults.length === 0 && (
              <div className="flex-lg-12 flex-md-12 flex-sm-12 center">
                <i className="svg svg-small svg-chi-siamo"></i>
                <br/>
                 <h4>{this.props.t('Ci dispiace. Nessun risultato trovato! Riprova con altri parametri.')}</h4>
              </div>
            )}
            </React.Fragment>
             )}
           </div>
           <div className="flex-grid page-footer">
            <div className="flex-lg-12 flex-md-12 flex-sm-12">
            <Paginator 
             totalPages={this.state.totalPages}
             resultsPerPage={this.state.resultsPerPage}
             currentPage = {this.state.currentPage}
             handlePagination={this.changePage}
             />
            </div>
           </div>
           <div className="center">
             <p>
             {this.props.t('Quotazioni dettagliate e profilazioni ancora più specifiche (es. natura giuridica, province, classi di fatturato, numero dipendenti, etc.) si possono ottenere richiedendo un preventivo personalizzato e gratuito.')} 
              </p>
              <NavLink to="/richiesta-preventivo" title={this.props.t("Preventivi")} className="btn btn-yellow">{this.props.t('Richiedi un preventivo')}</NavLink>
           </div>
           <div className="mtop50">&nbsp;</div>
         </div>
       </section>
       <Loader status={this.state.preloaderStatus} />
       <Modal 
        status={this.state.showModal} 
        handleModal={this.handleState}
        />
        <ModalConfirm
         status={this.state.showModalConfirm} 
         handleConfirm={this.saveCartOwner}
         />
      </React.Fragment>
    )}
}

export default  withTranslation()(Databases);