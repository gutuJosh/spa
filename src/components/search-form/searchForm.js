import React from "react";
import InputField from "./inputField.js";
import Button from "../form/button.js";
import IndexedDb  from './../../helpers/IndexedDb.js';

export default class SearchForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        lists: [],
        nations: [],
        categories: [],
        suggesstions:{
          nations: [],
          categories: []
        }
     }
     this.manageInput = this.manageInput.bind(this);
     this.manageSuggestions = this.manageSuggestions.bind(this);
     this.resetSuggesstions = this.resetSuggesstions.bind(this);
     this.submitForm = this.submitForm.bind(this);
    }

    async componentDidMount(){
        var catalog = new IndexedDb('Bancomail');
        var data= await catalog.getData('liste').catch( (response) => {
          data = response;
        });
        if(data !== undefined && data.status === 'ok'){
            this.setState({
                lists: data.liste,
                nations: data.nations,
                categories: data.categories,
                suggesstions: {
                  nations: data.nations.sort(),
                  categories: data.categories.sort()
                }
            });
            if(this.props.getAllLists){//pass data to parents
              this.props.getAllLists(data.liste);
            }
        }
        else{
            //hide search form
            this.refs.searchFormHolder.classList.add('hidden');
            //hide link /liste-email
            document.querySelector('li.dropdown ul > li').classList.add('hidden');
            document.querySelector('.request-quote-btn').classList.add('focus', 'btn', 'btn-yellow');
            if(this.props.getAllLists){//pass data to parents
              this.props.getAllLists([]);
            }
            
        }

        //set form position always on top
        window.addEventListener('scroll', this.setSticky.bind(this), false);
        
    }

    componentWillUnmount(){
      //remove form position handler
      window.removeEventListener('scroll', this.setSticky, false);
    }


    setSticky(){
      const element = document.querySelector('.search-form-holder');
      if(element !== null){
        let formPosTop = element.offsetTop;
        let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        if((scrollTop - (formPosTop - 60)) > 0){
          element.classList.add('sticky');
        }
        else{
          element.classList.remove('sticky');
        }
      }
    }

    manageInput(name, value){
     
       let otherSuggesstions = [];
       let currentFiled = name;
       let pattern = value.toLowerCase();
       const table = (currentFiled === 'nations') ?  this.state.suggesstions.nations :  this.state.suggesstions.categories;
       if(pattern.length > 0){
          let currentFiledValues = table.filter( (item) => (pattern === item.toLowerCase().substring(0, pattern.length)));

          let filedName = currentFiled === 'nations' ? 'n' : 'pn';
          this.state.lists.forEach( item => {
            var currentItem = item[filedName];
            let match = currentItem.toLowerCase().substring(0, pattern.length);
            if(filedName === 'n'){
              if(pattern === match && otherSuggesstions.includes(item.pn) === false){
                otherSuggesstions.push(item.pn);
              } 
            }
            else{
              if(pattern === match && otherSuggesstions.includes(item.n) === false){
                otherSuggesstions.push(item.n);
             } 
            } 
         });
        
         this.setState({
          'nations' :  currentFiled === 'nations' ? currentFiledValues : otherSuggesstions,
          'categories' : currentFiled === 'categories' ? currentFiledValues : otherSuggesstions
         });

       }
       else{
        let nations = this.state.suggesstions.nations;
        let categories = this.state.suggesstions.categories;
        this.setState({
             'nations' : nations,
             'categories' : categories
        })
       }
      
    }

    manageSuggestions(filedName, fieldValue){
          const suggesstions = [];
          let currentFiled = (filedName === 'nations') ? 'n' : 'pn';
          this.state.lists.forEach( item => {
            var currentItem = item[currentFiled].toLowerCase();
            fieldValue = fieldValue.toLowerCase();
            if(currentFiled === 'n'){
              if(fieldValue === currentItem && suggesstions.includes(item.pn) === false){
                suggesstions.push(item.pn);
              } 
            }
            else{
              if(fieldValue === currentItem && suggesstions.includes(item.n) === false){
                suggesstions.push(item.n);
             } 
            } 
         });
         if(filedName === 'nations'){
           this.setState({'categories' : suggesstions});
         }
         else{
          this.setState({'nations' : suggesstions});
         }
    }

    resetSuggesstions(filedName){
      
        if(filedName === 'nations'){
           this.setState({'categories' : this.state.suggesstions.categories});
        }
        else{
          this.setState({'nations' : this.state.suggesstions.nations});
        }
      
    }

    submitForm(event){
      event.preventDefault();
      this.nationsInput.value =  this.nationsInput.value.trim().toLowerCase();
      this.categoriesInput.value =  this.categoriesInput.value.trim().toLowerCase();
      //form submision is controlled by the parent component
      if(this.props.handleSubmit){
        //pass input values
         this.props.handleSubmit( this.nationsInput.value, this.categoriesInput.value);
         return;
      }
      this.refs.searchForm.submit();
    }

    render(){
        return(
          <React.Fragment>
           <div className="search-form-holder mtop20" ref="searchFormHolder">
            <form 
             name="search" 
             action={this.props.action} 
             method={this.props.method} 
             className="search-form flex wrap" 
             onSubmit={this.submitForm}
             ref="searchForm">
             <div className="flex-item auto">
              <InputField 
                name="nations" 
                id="nationsSelector" 
                placeholder="Seleziona la nazione"
                suggesstions={this.state.nations}
                label="Tutte le nazioni"
                handleInput = {this.manageInput}
                handleSelect = {this.manageSuggestions}
                reset={this.resetSuggesstions}
                inputRef={el => (this.nationsInput = el)}
                value=""
                /> 
             </div>
             <div className="flex-item auto">
               <InputField 
                name="categories" 
                id="categoriesSelector" 
                placeholder="Seleziona una categoria"
                suggesstions={this.state.categories}
                label="Tutte le categorie"
                handleInput = {this.manageInput}
                handleSelect = {this.manageSuggestions}
                reset={this.resetSuggesstions}
                inputRef={el => (this.categoriesInput = el)}
                value=""
                /> 
             </div>
             <Button type="btn-yellow center">
                 <span><i className="pe-7s-search"></i> Cerca</span>
             </Button>
            </form>
           </div> 
          </React.Fragment>
        )
       }
    
}