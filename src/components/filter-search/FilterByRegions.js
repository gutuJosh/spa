import React from "react";
export default class FilterByRegion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          regions: [],
          suggesstions: [],
          switcher : false,
          val : ''
       }
       this.manageInput = this.manageInput.bind(this);
       this.selectRegion = this.selectRegion.bind(this);
       this.resetSuggesstions = this.resetSuggesstions.bind(this);
       this.setRegions =  this.setRegions.bind(this);
       this.setSwitcher = this.setSwitcher.bind(this);
       this.setValue = this.setValue.bind(this);
    }

    componentDidMount(){
        this.setRegions();
    }

   

    componentDidUpdate(prevProps, nextProps){
        if(prevProps.regions !== nextProps.regions) {
            this.setRegions();
            this.setValue('');  
        }
    }


   
    setRegions(){
        this.setState({
            regions: this.props.regions,
            suggesstions: this.props.regions,
            defaultValue : this.props.value
        });

    }

    manageInput(event){

        event.preventDefault();
        let value = event.target.value.trim();
        let pattern = value.toLowerCase();
        const table = this.state.regions;

        
        if(pattern.length > 0){
           
           let currentFiledValues = table.filter( (item) => (pattern === item.toLowerCase().substring(0, pattern.length)));
           this.setState({
            'suggesstions' : currentFiledValues,
            'val': value
           });
          
        }
        else{
         this.setState({
              'suggesstions' : this.state.regions,
              'val': value
         })
        }
       
     }



     selectRegion(fieldValue){
        this.props.filterSearch(fieldValue); 
     }

     resetSuggesstions(){
      
        let suggestions = this.state.regions;
        this.setState({
             'suggestions' : suggestions
        });
        this.props.filterSearch(''); 
    }

    setSwitcher(status){
        this.setState({'switcher' : status});
    }

    setValue(value){
        this.setState({'val' : value});
    }





    render(){
        return(
    
          <form className="filter-search-form" method="post" action="/" ref="filterSearchForm">
              {this.state.regions.length > 1 && (
              <div className="flex-item auto">
              <span className="selector-control pointer">
                <i className={this.state.switcher === false ? "pe-7s-angle-down" : "pe-7s-angle-up"}></i>
              </span>
              <input className="custom-input" 
                     value={this.state.val}
                     name="regions"
                     id="regionsSelector"
                     placeholder="Seleziona la regione"
                     type="text" 
                     onFocus={(event) => {
                       event.target.parentNode.classList.add('focus');
                       this.setSwitcher(true);
                     }}
                     onChange={this.manageInput}
                     onBlur={(event) => {
                         const parent = event.target.parentNode;
                         setTimeout( () => {
                           parent.classList.remove('focus');
                           this.setSwitcher(false);
                        }, 300);
                       }}
                     ref="regionSelector"
                     autoComplete="off" />  
               <div className={(this.state.switcher) ? "custom-selector-holder custom-scroll-bar" : "custom-selector-holder hidden"}>
                <ul className="custom-selector">
                 {this.state.suggesstions && (
                 this.state.suggesstions.map((item, i) => {
                  return (
                   <li className="suggesstion-item" key={i} onClick={ (event) => {
                     event.preventDefault();
                     this.setValue(item);
                     this.selectRegion(item);
                    }}>
                      {item}
                   </li> 
                   )
                  }) 
                 )}  
                  <li data-value="all" onClick={ (event) => {
                     event.preventDefault();
                     this.setValue('Tutte le regioni');
                     this.resetSuggesstions();
                    }}>
                  Tutte le region
                 </li>   
                </ul>
               </div> 
             </div>
             )}
          </form>

        )
    }
}