//Responsive Components: a Solution to the Container Queries Problem

class ResizeComponent{

    constructor(props) {
    
      this.options = {
        breakpoints: {
           "xs" : 576,
           "sm" : 768,
           "md" : 992,
           "lg" : 1200
        },
        items: null,
        itemClass: null
  
      };
  
      
        //update options
        if (typeof props === "object") {
          for (var property in props) {
            if (props.hasOwnProperty(property)) {
              this.options[property] = props[property];
            }
          }
        }
        if(this.options.items === null){
          console.log('Missing html object');
          return;
        }
        //load images if get into view
        if ('ResizeObserver' in window) {
          const observer = new ResizeObserver(
            this.handleResize.bind(this),
            this.options
          );
          document.querySelectorAll(this.options.items).forEach( item => {
            observer.observe(item);
          });
        } else {
          console.log('ResizeObserver not supported!');
        }
    
    }
  
  
    handleResize(entries, observer) {
      const self = this;
      entries.forEach(entry => {
         if (entry.contentRect.width <= 576) {
              entry.target.classList.remove('sm', 'md', 'lg');
              entry.target.classList.add('xs');
         }
         else if(entry.contentRect.width > 576 && entry.contentRect.width <= 768) {
          entry.target.classList.remove('xs', 'md', 'lg');
          entry.target.classList.add('sm');
         }
         else if(entry.contentRect.width > 768 && entry.contentRect.width <= 992) {
          entry.target.classList.remove('xs', 'sm', 'lg');
          entry.target.classList.add('md');
         }
         else if(entry.contentRect.width > 1200) {
          entry.target.classList.remove('xs', 'sm', 'md');
          entry.target.classList.add('lg');
         }
         /*Object.keys(this.options.breakpoints).forEach( (breakpoint) => {
           let minWidth = this.options.breakpoints[breakpoint];
           if (entry.contentRect.width >= minWidth) {
               entry.target.className = `${this.options.itemClass} ${breakpoint}`
           } else {
              //entry.target.classList.remove(breakpoint);
           }
         });*/
      });
    }
  }
  
  export default ResizeComponent;
  